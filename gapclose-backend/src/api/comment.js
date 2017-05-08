import resource from 'resource-router-middleware';
import mongoose from 'mongoose';
import '../models/comment';
import '../models/comment';

const Comment = mongoose.model("comment")

export default ({ config, db }) => resource({

	/** Property name to store preloaded entity on `request`. */
	id : 'comment',

	/** For requests with an `id`, you can auto-load the entity.
	 *  Errors terminate the request, success sets `req[id] = data`.
	 */
	load(req, id, callback) {
		let comment = Comment.find({_id: id}, (err, lcomment) =>{
      if(!lcomment){
        res.status(404)
        res.json({message: "Not found"})
      } else {
        callback(err, lcomment)
      }
    }).populate({"path": 'arguments'});
	},

	/** POST / - Create a new entity */
	create({ body }, res) {

    const comment = new Comment(body);
    comment.update_at = new Date();
    comment.save((err, scomment)=>{
      if(err){
        res.status(400)
        res.json({err: err.toString()})
      } else {
        res.json({comment: scomment});
      }
    })
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
