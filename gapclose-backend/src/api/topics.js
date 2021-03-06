import resource from 'resource-router-middleware';
import mongoose from 'mongoose';
import '../models/topic';
import '../models/comment';

const Topic = mongoose.model("Topic")

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'topic',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let topic = Topic.findOne({_id: id}, (err, ltopic) =>{
      callback(err, ltopic)
    }).populate({"path": 'comments', populate: [
      {path: "children", populate: { path: "user" }},
      {path: "user"}
    ]});
	},

	/** GET / - List all entities */
	index({ params }, res)   {
    const topics = Topic.find({},(err, topics)=>{
      res.json({topics: topics});
    }).sort({_id: -1})
	},

	/** POST / - Create a new entity */
	create({params,  body }, res) {

    const topic = new Topic(body);
    topic.update_at = new Date();
    topic.save((err, stopic)=>{
      if(err){
        res.status(400)
        res.json({err: err.toString()})
      } else {
        res.json({topic: stopic});
      }
    })
	},

	/** GET /:id - Return a given entity */
	read({ topic }, res) {
    res.json({topic: topic})
	},

});
