import mongoose from 'mongoose';

export default callback => {
	// connect to a database if needed, then pass it to `callback`:

	const username= process.env.MONGO_USER
	const password= process.env.MONGO_PASSWORD

	const uri = `mongodb://${username}:${password}@cluster0-shard-00-00-b2doy.mongodb.net:27017,cluster0-shard-00-01-b2doy.mongodb.net:27017,cluster0-shard-00-02-b2doy.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin`
	console.log("MongoURI" ,uri)
	var connection = mongoose.connect(uri);

	callback();
}
