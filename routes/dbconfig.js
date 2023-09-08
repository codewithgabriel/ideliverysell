
import { MongoClient, ServerApiVersion } from  'mongodb';
const uri = "mongodb+srv://webzargab:zKnEH0BGeBXLjDgA@gabriel.brv3c.mongodb.net/?retryWrites=true&w=majority";

let client  = new MongoClient(uri)

try {
    let db = await client.connect();
    console.log('Database Connected.');
    db = db;
}catch(err){
    console.log(err.message);
}


export default  client.db('idelivery');



