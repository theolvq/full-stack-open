const { ApolloServer, gql, UserInputError } = require('apollo-server');
let { authors, books } = require('./data');
const { v1: uuid } = require('uuid');

/*

 * English:
 * It might make more sense to associate a book with its author by storing the author's name in the context of the book instead of the author's id
 * However, for simplicity, we will store the author's name in connection with the book
 */

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
    author: String!
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
      author: String!
      genres: [String!]!
    ): Book
    editAuthor(name: String!, setBornTo: Int): Author
  }
`;

const resolvers = {
  Query: {
    bookCount: () => books.length,
    authorCount: () => authors.length,
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
    addBook: (root, args) => {
      if (books.find(book => book.title === args.title)) {
        throw new UserInputError('Book Title must be unique', {
          invalidArgs: args.title,
        });
      }
      if (authors.some(author => author.name !== args.author)) {
        const newAuthor = {
          name: args.author,
          id: uuid(),
        };
        authors = authors.concat(newAuthor);
      }
      const book = { ...args, id: uuid() };
      books = books.concat(book);
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
