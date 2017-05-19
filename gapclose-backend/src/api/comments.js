import resource from 'resource-router-middleware';
import mongoose from 'mongoose';
import '../models/comment';
import '../models/topic';

const Comment = mongoose.model("Comment")
const Topic = mongoose.model("Topic")

export default ({ config, db }) => resource({

  mergeParams: true,
	/** Property name to store preloaded entity on `request`. */
	id : 'comment',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
    console.log("Request has topic?", req, Object.keys(req), req.topic)
		let comment = Comment.find({_id: id}, (err, lcomment) =>{
      if(!lcomment){
        res.status(404)
        res.json({message: "Not found"})
      } else {
        callback(err, lcomment)
      }
    }).populate({"path": 'arguments'});
	},

  /** GET / - List all entities */
  index({ params }, res) {
    const topics = Topic.findOne({ _id: params.topicId},(err, topic)=>{
      res.json({comments: topic.comments});
    }).populate({ path: "comments", populate: { path: "children"}})
  },

	/** POST / - Create a new entity */
	async create({params, body }, res) {

    try{
      let comment = await Comment.create(Object.assign({}, params, body))
      return res.json({comment: comment });
    } catch(err){
      res.status(400)
      return res.json({err: err.toString()})
    }
	},

  /** PUT /:id - Update a given entity */
  update({ comment, body }, res) {
    for (let key in body) {
      if (key!=='id') {
        comment[key] = body[key];
      }
      comment.update_at = new Date();
      comment.save((err, lcomment)=>{
        if(err){
          res.status(400)
          res.json({err: err.toString()})
        } else {
          res.json({comment: lcomment})
        }
      })
    }
  },

	/** GET /:id - Return a given entity */
	read({ comment }, res) {
    res.json({comment: comment})
	},

});
