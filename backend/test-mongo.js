const mongoose = require('mongoose');

const uri = "mongodb://behzadrehan3_db_user:Kv4qQhYgtabwuDUJ@ac-sa51oyi-shard-00-00.f8o4bpg.mongodb.net:27017,ac-sa51oyi-shard-00-01.f8o4bpg.mongodb.net:27017,ac-sa51oyi-shard-00-02.f8o4bpg.mongodb.net:27017/?ssl=true&replicaSet=atlas-11k9bz-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(uri)
  .then(() => {
    console.log("Connected successfully!");
    process.exit(0);
  })
  .catch(err => {
    console.error("Connection failed:", err.message);
    process.exit(1);
  });
