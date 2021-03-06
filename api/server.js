const fs = require('fs');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { GraphQLScalarType } = require('graphql');
const { Kind } = require('graphql/language');
const { MongoClient } = require('mongodb');

const url = "mongodb://localhost/research_colab";
const url_proj = "mongodb://localhost/projectDB";

let db;

async function connecttoDB() {
    const client = new MongoClient(url, { useNewUrlParser: true });
    const client_proj = new MongoClient(url_proj, { useNewUrlParser: true });
    await client.connect();
    await client_proj.connect();
    db = client.db();
    console.log("connected to research_colab")
    db_proj = client_proj.db();
    console.log("connected to projectdb");
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
        getAllOrganization,
        getProjectDetails,
        getProjectDetailsFromProjectID,
        getProjectDetailsInner,
        getProjectMembers
    },
    Mutation: {
        addOrganization,
        addNewUser,
        addProjectDetails,
        addNewRequests,
        updateActiveTabList,
        updateLitSurvey,
        updateProblemStatement,
        updateExperimentation,
        updateComments,
        UpdatePendingProject,
        UpdatePendingProjectReject,
        updateSourceCode,
        updateSubmissions,
        updateSheet,
        updateSchedule
    },
    GraphQLDate
};


// get functions
async function getOrganization(_, { org_short_name }) {
    console.log(org_short_name);
    const orgs = await db.collection('organizations').find({ org_short_name: org_short_name }).toArray();
    console.log(orgs);
    return orgs;
}

async function getAllOrganization(_, { org }) {
    console.log(org);
    const orgs = await db.collection('organizations').find({}).toArray();
    console.log(orgs);
    return orgs;
}

async function getExistingUsers(_, { username }) {
    console.log(username);
    const users = await db.collection('users').find({ username: username }).toArray();
    console.log(users);
    return users;
}
async function getProjectDetails(_, { username }) {
    const lis = await db_proj.collection('projectDB').find({ owner: username }).toArray();
    console.log("list acquired");
    return lis;
}

async function getProjectDetailsFromProjectID(_, { projectID }) {
    // console.log(projectID);
    const project_from_id = await db_proj.collection('projectDB').find({ projectID: projectID }).toArray();
    console.log("got the project details from project ID");
    return project_from_id;
}

async function getProjectDetailsInner(_, { projectID }) {
    const starttime = Date.now();
    const project_details_from_id = await db_proj.collection('projectDetails').find({ projectID: projectID }).toArray();
    const endtime = Date.now();
    console.log("DB fetch time");
    console.log(endtime - starttime);
    console.log(project_details_from_id[0]);
    if (project_details_from_id.length > 0) {
        return project_details_from_id[0];
    }
}

//get project members

async function getProjectMembers(_, { projectID }) {
    const res = await db_proj.collection('projectDB').find({ projectID: projectID }).toArray();
    const f = { projectID: res[0].projectID, owner: res[0].owner, pending: res[0].pending, accepted: res[0].accepted };
    console.log("members");
    console.log(f);
    return f
}

// Project specific updates
// Project Status update
async function updateActiveTabList(_, { projectID, activeTabList }) {
    const df = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $set: { "activeTabList": activeTabList } });
    const res = await db_proj.collection('projectDetails').findOne({ _id: df.insertedId });
    return res;
}
// Lit surve updates
async function updateLitSurvey(_, { projectID, litsurveyarray }) {
    const df = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $set: { "litsurveyarray": litsurveyarray } });
    const res = await db_proj.collection('projectDetails').findOne({ _id: df.insertedId });
    return res;
}
// problem statement updates
async function updateProblemStatement(_, { projectID, problemstatement }) {
    const df = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $set: { "problemstatement": problemstatement } });
    const res = await db_proj.collection('projectDetails').findOne({ _id: df.insertedId });
    return res;
}
// experimentation updates
async function updateExperimentation(_, { projectID, experimentation }) {
    const df = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $set: { "experimentation": experimentation } });
    const res = await db_proj.collection('projectDetails').findOne({ _id: df.insertedId });
    return res;
}

// comments update
async function updateComments(_, { projectID, comments }) {
    const df = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $set: { "comments": comments } });
    const res = await db_proj.collection('projectDetails').findOne({ _id: df.insertedId });
    return res;
}
// source code upate
async function updateSourceCode(_, { projectID, field }) {
    const addsource = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $push: { sourcecode: field } });
    const res = await db_proj.collection('projectDetails').find({ projectID: projectID });
    return res
}
//submission update
async function updateSubmissions(_, { projectID, field }) {
    const addsource = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $push: { submission: field } });
    const res = await db_proj.collection('projectDetails').find({ projectID: projectID });
    return res

}
//sheet update
async function updateSheet(_, { projectID, field }) {
    const addsource = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $set: { PaperDraft: field } });
    const res = await db_proj.collection('projectDetails').find({ projectID: projectID });
    return res
}

// schedule update
async function updateSchedule(_, { projectID, field }) {
    const addsource = await db_proj.collection('projectDetails').updateOne({ projectID: projectID }, { $push: { schedule: field } });
    const res = await db_proj.collection('projectDetails').find({ projectID: projectID });
    return res
}
// Main info on the project
async function addProjectDetails(_, { field }) {
    console.log(field);
    try {
        await db_proj.collection('projectDB').insertOne(field);
        console.log("New Project Added");
    }
    catch (err) {
        alert("Key Taken");
    }
    const f = { name: field.name, owner: field.owner, projectID: field.projectID, desc: field.desc };


    // add the new project to the user who created the project under accepted list
    const users = await db.collection('users').find({ username: field.owner }).toArray();
    console.log("Owner is");
    //console.log(users);
    const df_temp = await db.collection('users').updateOne({ username: field.owner }, { $push: { "accepted": f } });
    const addprojectdetails = await db_proj.collection('projectDetails').insertOne({
        projectID: field.projectID,
        activeTabList: [false, false, false, false, false, false],
        // litsurveyarray: [{ paper_title: "", publisher_name: "", doi: "" }],
        litsurveyarray: [],
        problemstatement: "",
        experimentation: "",
        comments: [],
        PaperDraft: "",
        sourcecode: [],
        submission: [],
        schedule: []
    });
    return f
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
async function addOrganization(_, { org }) {
    // org._id = await getNextSequence('customers');
    const res = await db.collection('organizations').insertOne(org);
    const savedorg = await db.collection('organizations').findOne({ _id: res.insertedId });
    return savedorg;
}

async function addNewUser(_, { user }) {

    console.log("New User Added");
    const res = await db.collection('users').insertOne(user);
    const saveduser = await db.collection('users').findOne({ _id: res.insertedId });
    return saveduser;
}


async function addNewRequests(_, { field }) {
    const ID = field.projectID;
    const user_name = field.name;
    // const f = await db.collection('projectDB').find({ projectID: ID });
    // console.log(f);
    //console.log(ID);
    console.log("New User Request Added");
    // console.log(field);
    const df = await db_proj.collection('projectDB').updateOne({ projectID: ID }, { $push: { "pending": field } });
    const df_temp = await db.collection('users').updateOne({ username: user_name }, { $push: { "pending": field } });
    // console.log("Field inserted");
    return field
}


async function UpdatePendingProject(_, { field }) {

    console.log(field);
    await db.collection('users').updateOne({ username: field.name }, { $pull: { pending: field } });
    await db.collection('users').updateOne({ username: field.name }, { $push: { accepted: field } });

    await db_proj.collection('projectDB').updateOne({ projectID: field.projectID }, { $pull: { pending: field } });
    await db_proj.collection('projectDB').updateOne({ projectID: field.projectID }, { $push: { accepted: field } });

    const df_users = await db.collection('users').find({ username: field.name }).toArray();
    const df_p = await db_proj.collection('projectDB').find({ projectID: field.projectID }).toArray();

    //console.log(df_users[0]);
    //console.log("Proj DB");
    //console.log(df_p[0]);

    return field
}

async function UpdatePendingProjectReject(_, { field }) {
    await db.collection('users').updateOne({ username: field.name }, { $pull: { pending: field } });
    await db_proj.collection('projectDB').updateOne({ projectID: field.projectID }, { $pull: { pending: field } });
    return field
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
server.applyMiddleware({ app, path: '/graphql' });

connecttoDB();
app.listen(5000, function () {
    console.log("API started on port 5000");
});