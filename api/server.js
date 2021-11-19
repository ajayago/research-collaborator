const fs = require('fs');
const express = require('express');
const {ApolloServer} = require('apollo-server-express');
const {GraphQLScalarType} = require('graphql');
const {Kind} = require('graphql/language');
const {MongoClient} = require('mongodb');

const url = "mongodb://localhost/research_colab"
let db;

async function connecttoDB(){
    const client = new MongoClient(url, { useNewUrlParser: true });
    await client.connect();
    db = client.db();    
}

const GraphQLDate = new GraphQLScalarType({
    name: 'GraphQLDate',
    description: 'A Date() type in GraphQL as a scalar',
    serialize(value) {
      return value.toISOString();
    },
    parseValue(value) {
      return new Date(value);
    },
    parseLiteral(ast) {
      return (ast.kind == Kind.STRING) ? new Date(ast.value) : undefined;
    },
});

const resolvers = {
    Query: {
        getOrganization,
        getExistingUsers,
        getAllOrganization
    },
    Mutation: {
        addOrganization,
        addNewUser
    },
    GraphQLDate
};

// get functions
async function getOrganization(_, {org_short_name}){
    console.log(org_short_name);
    const orgs = await db.collection('organizations').find({org_short_name: org_short_name}).toArray();
    console.log(orgs);
    return orgs;
}

async function getAllOrganization(_, { org }){
    console.log(org);
    const orgs = await db.collection('organizations').find({}).toArray();
    console.log(orgs);
    return orgs;
}

async function getExistingUsers(_, { username }){
    console.log(username);
    const users = await db.collection('users').find({username: username}).toArray();
    console.log(users);
    return users;
}
// async function getNextSequence(name) {
//     // const result = await db.collection('counters').findOneAndUpdate(
//     //   { _id: name },
//     //   { $inc: { current: 1 } },
//     //   { returnOriginal: false },
//     // );
//     const result = await db.collection('customers').count() + 1;
//     return result;
// }

// add functions
async function addOrganization(_, { org }){
    // org._id = await getNextSequence('customers');
    const res = await db.collection('organizations').insertOne(org);
    const savedorg = await db.collection('organizations').findOne({_id: res.insertedId});
    return savedorg;
}

async function addNewUser(_, { user }){
    const res = await db.collection('users').insertOne(user);
    const saveduser = await db.collection('users').findOne({_id: res.insertedId});
    return saveduser;
}
// async function deleteCustomer(_, { _id }){
//     const customers = await db.collection('customers').find({}).toArray();
//     for(var c = 0; c < customers.length; c++){
//         customers[c].serial_no = c + 1;
//         console.log(customers[c]._id);
//         const upd_cust = await db.collection('customers').updateOne({_id: customers[c]._id}, {$set:{"serial_no": customers[c].serial_no}});
//     }
//     const cust_to_delete = await db.collection('customers').findOne({serial_no: _id});
//     console.log(cust_to_delete.customer_name);
//     const res = await db.collection('customers').deleteOne({serial_no: _id});
//     return cust_to_delete;
// }
const server = new ApolloServer({
    typeDefs: fs.readFileSync('schema.graphql', 'utf-8'), 
    resolvers
});

const app = express();

// app.use(express.static('public'));
server.applyMiddleware({app, path: '/graphql'});

connecttoDB();
app.listen(5000, function(){
    console.log("API started on port 5000");
});