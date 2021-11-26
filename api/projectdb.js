const { MongoClient } = require('mongodb');

const url = 'mongodb://localhost/projectDB';
const url_user = "mongodb://localhost/research_colab";
async function testWithAsync() {

    const client = new MongoClient(url, { useNewUrlParser: true });
    const client_user = new MongoClient(url_user, { useNewUrlParser: true });

    try {
        await client.connect();
        await client_user.connect();


        console.log("Connected to Project Database");
        const db = client.db();
        const db_user = client_user.db();

        const collection = db.collection('projectDB');
        const collection_user = db_user.collection('users');

        const final_del = await collection.deleteMany({});

        const final_del_user = await collection_user.deleteMany({});

        const data =
        {
            projectID: 'abcd', name: 'Deep Learning', owner: 'Srinivasan', desc: "abcd"
            // collaborators: { user_name: 'Aishwarya', role: 'Lead Developer' },
            // pending: {}
        };

        const data1 = {
            projectID: '2345', name: 'Computer Vision', owner: 'Srinivasan', desc: "abcd"
            // collaborators: { user_name: 'Aishwarya', role: 'Lead_Developer' },
            // pending: {}
        }

        const result = await collection.insertOne(data);
        console.log('record inserted data');

        const result1 = await collection.insertOne(data1);
        console.log('record inserted data1');

        const final_del1 = await collection.deleteMany({});

    }


    catch (err) {
        console.log(err);
    }
    finally {
        client.close();
    }
}


testWithAsync();