require('dotenv').config();
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
} = require('apollo-server');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
const User = require('./models/user');
const jwt = require('jsonwebtoken');

const MONGOB_URI = process.env.MONGOB_URI;
const JWT_SECRET = process.env.JWT_SECRET;

mongoose
  .connect(MONGOB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB @', MONGOB_URI);
  })
  .catch(err => {
    console.log('error connecting to MongoDB', err.message);
  });

const typeDefs = gql`
  type Author {
    name: String!
    born: Int
    books: [Book!]!
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]
    id: ID!
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }
`;

const resolvers = {
  Query: {
    bookCount: async () => {
      const res = await Book.find({});
      return res.length;
    },
    authorCount: async () => {
      const res = await Author.find({});
      return res.length;
    },
    allBooks: async (root, args) => {
      let books = [];
      if (args.author && !args.genre) {
        const author = await Author.findOne({ name: args.author });
        books = await Book.find({ author: { $in: [author._id] } }).populate(
          'author',
          { name: 1 }
        );
        return books;
      }
      if (args.genre && !args.author) {
        books = await Book.find({ genres: { $in: [args.genre] } }).populate(
          'author',
          { name: 1 }
        );
        return books;
      }
      if (args.author && args.genre) {
        const author = await Author.findOne({ name: args.author });
        books = await Book.find({
          genres: { $in: [args.genre] },
          author: { $in: [author._id] },
        }).populate('author', { name: 1 });
      }
      return books;
    },
    allAuthors: async () => {
      const authors = await Author.find({}).populate('books', {
        title: 1,
        published: 1,
        genres: 1,
      });

      return authors;
    },
    me: (root, args, context) => context.currentUser,
  },
  Mutation: {
    addBook: async (root, args, context) => {
      const currentUser = context.currentUser;

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      let author = await Author.findOne({ name: args.author });

      if (!author) {
        author = new Author({ name: args.author });
        try {
          await author.save();
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          });
        }
      }

      const book = new Book({
        ...args,
        author,
      });

      try {
        const savedBook = await book.save();
        author.books.concat(savedBook);
        await author.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book;
    },
    editAuthor: async (root, args, context) => {
      const { currentUser } = context;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      const author = await Author.findOneAndUpdate(
        { name: args.name },
        { born: args.setBornTo },
        { new: true }
      );
      if (!author)
        throw new UserInputError(
          'Invalid author name, how did you manage to do that?'
        );
      return author;
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre,
      });
      try {
        await user.save();
      } catch (err) {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      }
      return user;
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username });
      if (!user || args.password !== 'secret') {
        throw new UserInputError('wrong credentials');
      }
      const userForToken = {
        username: user.username,
        id: user._id,
      };

      return { value: jwt.sign(userForToken, JWT_SECRET) };
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLocaleLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findByID(decodedToken.id);
      return { currentUser };
    }
  },
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
