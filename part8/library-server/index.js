require('dotenv').config();
const { ApolloServer, gql, UserInputError } = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Author = require('./models/author');
const Book = require('./models/book');
let { authors, books } = require('./data');

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
    bookCount: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
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
      author: String
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => Book.find({}).length,
    authorCount: () => Author.find({}).length,
    allBooks: (root, args) => {
      if (args.author) {
        return books.filter(book => book.author === args.author);
      }
      if (args.genre) {
        return books.filter(book =>
          book.genres.some(genre => genre === args.genre)
        );
      }
      return books;
    },
    allAuthors: () => {
      return authors.map(author => ({
        ...author,
        bookCount: books.filter(book => book.author === author.name).length,
      }));
    },
  },
  Mutation: {
    addBook: async (root, args) => {
      const authorObj = Author.findOne({ name: args.author });
      console.log(authorObj);
      const book = new Book({ ...args }).populate('author', {
        name: 1,
        born: 1,
      });
      try {
        await book.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      return book;
    },
    editAuthor: (root, args) => {
      const author = authors.find(author => author.name === args.name);
      if (!author) return null;
      const updatedAuthor = { ...author, born: args.setBornTo };
      authors = authors.map(author =>
        author.name === args.name ? updatedAuthor : author
      );
      return updatedAuthor;
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
