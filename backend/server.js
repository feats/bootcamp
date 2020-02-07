const { GraphQLServer, MockList } = require('graphql-yoga')
const casual = require('casual')

const typeDefs = `
  type Query {
    user(id: ID): User
  }

  type User {
    id: ID!
    name: String
    lists: [List]
  }

  type List {
    id: ID!
    name: String
    owner: User
    incomplete_count: Int
    tasks(completed: Boolean): [Task]
  }

  type Task {
    id: ID!
    text: String
    completed: Boolean
    list: List
  }
`

const mocks = {
  Query: () => ({
    user: (_, { id }) => ({ id }),
  }),
  User: () => ({ name: casual.name }),
  List: () => ({
    name: () => casual.word,
    tasks: () => new MockList(4, (_, { completed }) => ({ completed })),
  }),
  Task: () => ({ text: casual.words(10) }),
}

const server = new GraphQLServer({ typeDefs, resolvers: {}, mocks })
server.start(() => console.log('Server is running on localhost:4000'))
