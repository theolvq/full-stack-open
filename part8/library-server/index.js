require('dotenv').config();
const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');

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

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
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
  },
  Mutation: {
    addBook: async (root, args) => {
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
    editAuthor: async (root, args) => {
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
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});

// Add Book
//  if (books.find(book => book.title === args.title)) {
//    throw new UserInputError('Book Title must be unique', {
//      invalidArgs: args.title,
//    });
//  }
//  if (authors.some(author => author.name !== args.author)) {
//    const newAuthor = {
//      name: args.author,
//      id: uuid(),
//    };
//    authors = authors.concat(newAuthor);
//  }
//  const book = { ...args, id: uuid() };
//  books = books.concat(book);
