var config = require('./dbConfig.js');
var MongoClient = require('mongodb').MongoClient;
var url = 'mongodb://' + config.host + ':' + config.port + '/' + config.db_name;
var dbConnection = {};
var connection = module.exports;


/*
 * Initialize and establish connection with mongodb.
 */
connection.init = function init(callback) {
	console.log(url);
	MongoClient.connect(url, { useUnifiedTopology: true }, function(err, db) {
		if (err) {
			console.log('Database connection Failed!!');
			callback(err);
		} else {
			callback(null);
			createColl(db);
			dbConnection.db = db;
			console.log('Database connection Established!!');
		}
	});
};

/*
 * Get the database instance.
 */
connection.getDb = function getDb(){
	// if(dbConnection){
		return dbConnection.db;
	// }
};

/*
 * Close the database connection
 */
connection.close_db = function close_db(){
	if(dbConnection.db){
		dbConnection.db.close();
	}
};

/*
 * Create a collection in the db which we have connected.
 */
function createColl(db) {
	db.db(config.db_name).createCollection('products');
}
