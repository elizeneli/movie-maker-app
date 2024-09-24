const express = require('express');
const app = express();
const mongoose = require('mongoose');
const { graphqlHTTP } = require('express-graphql');
const movieResolvers = require('./resolvers/resolvers');
const movieSchema = require('./schema/schema');
const cors = require('cors');

// Connect to MongoDB
mongoose.connect('mongodb+srv://movie-maker-app:lAOBuWJrRlF43GaI@movie-maker-app.ochy1.mongodb.net/', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
    console.log('Database connected');
})
.catch((err) => {
    console.log('Error connecting to database', err);
});

// Use CORS middleware
app.use(cors({
  origin: '*', // Allow requests from any origin
  methods: ['GET', 'POST'], // Allow specific methods
  allowedHeaders: ['Content-Type'], // Allow specific headers
}));

// Set up GraphQL endpoint
app.use('/graphql', graphqlHTTP({
  schema: movieSchema,
  rootValue: movieResolvers,
  graphiql: true
}));

// Test route
app.get('/hi', (req, res) => {
  res.send('Hello from the other side');
});

// Start the server
app.listen(4000, () => {
  console.log('Server is running on port 4000');
});
