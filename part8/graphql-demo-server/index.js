const {
  ApolloServer,
  UserInputError,
  gql,
  AuthenticationError,
} = require('apollo-server');
const { v1: uuid } = require('uuid');
const mongoose = require('mongoose');
const Person = require('./models/person');
const User = require('./models/user');
const jwt = require('jsonwebtoken');
const { PubSub } = require('apollo-server');
require('dotenv').config();

const pubsub = new PubSub();
const MONGOB_URI = process.env.MONGOB_URI;
const JWT_SECRET = process.env.JWT_SECRET;
console.log('connecting to', MONGOB_URI);

mongoose
  .connect(MONGOB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => {
    console.log('connected to MongoDB');
  })
  .catch(error => {
    console.log('error connection to MongoDB:', error.message);
  });

const typeDefs = gql`
  type User {
    username: String!
    friends: [Person!]!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Address {
    street: String!
    city: String!
  }

  type Person {
    name: String!
    phone: String
    address: Address!
    id: ID!
  }

  enum YesNo {
    YES
    NO
  }

  type Query {
    personCount: Int!
    allPersons(phone: YesNo): [Person!]!
    findPerson(name: String!): Person
    me: User
  }

  type Mutation {
    addPerson(
      name: String!
      phone: String
      street: String!
      city: String!
    ): Person
    editNumber(name: String!, phone: String!): Person
    createUser(username: String!): User
    login(username: String!, password: String!): Token
    addAsFriend(name: String!): User
  }

  type Subscription {
    personAdded: Person!
  }
`;

const resolvers = {
  Query: {
    personCount: () => persons.length,
    allPersons: (root, args) => {
      if (!args.phone) {
        return Person.find({});
      }
      return Person.find({ Phone: { $exists: args.phone === 'YES' } });
    },
    findPerson: (root, args) => Person.findOne({ name: args.name }),
    me: (root, args, context) => context.currentUser,
  },
  Person: {
    address: root => ({
      street: root.street,
      city: root.city,
    }),
  },
  Mutation: {
    addPerson: async (root, args, context) => {
      const person = new Person({ ...args });
      const currentUser = context.currentUser;
      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }
      try {
        await person.save();
        currentUser.friends = currentUser.friends.concat(person);
        await currentUser.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }

      pubsub.publish('PERSON_ADDED', { personAdded: person });
      return person;
    },
    editNumber: async (root, args) => {
      const person = await Person.findOne({ name: args.name });
      person.phone = args.phone;
      try {
        await person.save();
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args,
        });
      }
      return person;
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username });
      return user.save().catch(err => {
        throw new UserInputError(err.message, {
          invalidArgs: args,
        });
      });
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
    addAsFriend: async (root, args, { currentUser }) => {
      const nonFriendAlready = person =>
        !currentUser.friends.map(f => f._id).includes(person._id);

      if (!currentUser) {
        throw new AuthenticationError('not authenticated');
      }

      const person = await Person.findOne({ name: args.name });
      if (nonFriendAlready(person)) {
        currentUser.friends = currentUser.friends.concat(person);
      }

      await currentUser.save();
      return currentUser;
    },
  },
  Subscription: {
    personAdded: {
      subscribe: () => pubsub.asyncIterator(['PERSON_ADDED']),
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null;
    if (auth && auth.toLowerCase().startsWith('bearer')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET);
      const currentUser = await User.findById(decodedToken.id).populate(
        'friends'
      );
      return { currentUser };
    }
  },
});

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`);
  console.log(`Subscription ready at ${subscriptionsUrl}`);
});

// let persons = [
//   {
//     name: 'Arto Hellas',
//     phone: '040-123543',
//     street: 'Tapiolankatu 5 A',
//     city: 'Espoo',
//     id: '3d594650-3436-11e9-bc57-8b80ba54c431',
//   },
//   {
//     name: 'Matti Luukkainen',
//     phone: '040-432342',
//     street: 'Malminkaari 10 A',
//     city: 'Helsinki',
//     id: '3d599470-3436-11e9-bc57-8b80ba54c431',
//   },
//   {
//     name: 'Venla Ruuska',
//     street: 'Nallemäentie 22 C',
//     city: 'Helsinki',
//     id: '3d599471-3436-11e9-bc57-8b80ba54c431',
//   },
// ];
