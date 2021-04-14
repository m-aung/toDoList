// v-- REPLACE THE EMPTY STRING WITH YOUR LOCAL/MLAB/ELEPHANTSQL URI
//import Pool for query from database
const { Pool } = require('pg');
require('dotenv').config();
// const myURI = process.env.myURI;
const myURI =
  'postgres://';
const pool = new Pool({
  connectionString: myURI,
  max: 4,
});
const myDatabase = {
  query: (text, params, callback) => {
    return pool.query(text, params, callback);
  },
};
// UNCOMMENT THE LINE BELOW IF USING MONGO
// const URI = process.env.MONGO_URI || myURI;

// UNCOMMENT THE LINE BELOW IF USING POSTGRESQL
const URI = process.env.PG_URI || myURI;

module.exports = myDatabase; // <-- export your model
