const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const { GraphQLDateTime } = require('graphql-iso-date');
const mongoose = require("mongoose");

const app = express();
const userRouter = require('./user');
const empRouter = require('./emp');
const SERVER_PORT = process.env.PORT || 3000;


const DB_CONNECTION_STRING = "mongodb+srv://hamedhaghani:0K7EhdYK1otXaZyQ@clusterone.jbgqy.mongodb.net/?retryWrites=true&w=majority&appName=ClusterOne";

mongoose.connect(DB_CONNECTION_STRING, {
  // useNewUrlParser: true,
  // useUnifiedTopology: true
})
.then(() => {
  console.log("Connected to MongoDB");
})
.catch((err) => {
  console.log("Error", err);
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use("/api/v1/emp", empRouter);
app.use("/api/v1/user", userRouter);


const User = require('./models/users');
const Employee = require('./models/employees');


const typeDefs = gql`
  scalar DateTime

  enum Gender {
    Male
    Female
    Other
  }

  type User {
    _id: ID!
    username: String!
    email: String!
    created_at: DateTime
    updated_at: DateTime
  }

  type Employee {
    _id: ID!
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender
    designation: String
    salary: Float!
    date_of_joining: DateTime
    department: String
    employee_photo: String
    created_at: DateTime
    updated_at: DateTime
  }

  input SignupInput {
    username: String!
    email: String!
    password: String!
  }

  input LoginInput {
    username: String!
    password: String!
  }

  input EmployeeInput {
    first_name: String!
    last_name: String!
    email: String!
    gender: Gender
    designation: String
    salary: Float!
    date_of_joining: DateTime
    department: String
    employee_photo: String
  }

  type AuthPayload {
    message: String!
    user: User
  }

  type EmployeePayload {
    message: String!
    employee: Employee
  }

  type DeletePayload {
    message: String!
  }

  type Query {
    getAllEmployees: [Employee]
    getEmployeeById(eid: ID!): Employee
    searchEmployees(designation: String, department: String): [Employee]
  }

  type Mutation {
    signup(input: SignupInput!): AuthPayload!
    login(input: LoginInput!): AuthPayload!
    addEmployee(input: EmployeeInput!): EmployeePayload!
    updateEmployee(eid: ID!, input: EmployeeInput!): EmployeePayload!
    deleteEmployee(eid: ID!): DeletePayload!
  }
`;


const resolvers = {
  DateTime: GraphQLDateTime,
  Query: {
    getAllEmployees: async () => {
      try {
        return await Employee.find();
      } catch (err) {
        throw new Error('Failed to fetch employees');
      }
    },
    getEmployeeById: async (_, { eid }) => {
      try {
        const employee = await Employee.findById(eid);
        if (!employee) throw new Error("Employee not found");
        return employee;
      } catch (err) {
        throw new Error('Failed to fetch employee: ' + err.message);
      }
    },
    searchEmployees: async (_, { designation, department }) => {
      try {
        let filter = {};
        if (designation) filter.designation = designation;
        if (department) filter.department = department;
        return await Employee.find(filter);
      } catch (err) {
        throw new Error('Failed to search employees');
      }
    }
  },
  Mutation: {
    signup: async (_, { input }) => {
      try {
        const existingUser = await User.findOne({ username: input.username });
        if (existingUser) {
          throw new Error('Username already exists');
        }
        const newUser = new User(input);
        await newUser.save();
        return { message: "User registered successfully", user: newUser };
      } catch (err) {
        throw new Error('Signup failed: ' + err.message);
      }
    },
    login: async (_, { input }) => {
      try {
        const user = await User.findOne({ username: input.username, password: input.password });
        if (!user) {
          throw new Error("Invalid credentials");
        }
        return { message: "Login successful", user };
      } catch (err) {
        throw new Error('Login failed: ' + err.message);
      }
    },
    addEmployee: async (_, { input }) => {
      try {
        const existingEmployee = await Employee.findOne({ email: input.email });
        if (existingEmployee) {
          throw new Error('Employee with that email already exists');
        }
        const newEmployee = new Employee(input);
        await newEmployee.save();
        return { message: "Employee added successfully", employee: newEmployee };
      } catch (err) {
        throw new Error('Add Employee failed: ' + err.message);
      }
    },
    updateEmployee: async (_, { eid, input }) => {
      try {
        const updatedEmployee = await Employee.findByIdAndUpdate(eid, input, { new: true });
        if (!updatedEmployee) {
          throw new Error('Employee not found');
        }
        return { message: "Employee updated successfully", employee: updatedEmployee };
      } catch (err) {
        throw new Error('Update Employee failed: ' + err.message);
      }
    },
    deleteEmployee: async (_, { eid }) => {
      try {
        const deletedEmployee = await Employee.findByIdAndDelete(eid);
        if (!deletedEmployee) {
          throw new Error('Employee not found');
        }
        return { message: "Employee deleted successfully" };
      } catch (err) {
        throw new Error('Delete Employee failed: ' + err.message);
      }
    }
  }
};

async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
    console.log(`GraphQL endpoint available at http://localhost:${SERVER_PORT}${server.graphqlPath}`);
  });
}

startApolloServer();
