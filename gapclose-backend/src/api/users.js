import resource from 'resource-router-middleware';
import mongoose from 'mongoose';
import '../models/user';

const User = mongoose.model("User")

export default ({ config, db }) => resource({

  /** Property name to store preloaded entity on `request`. */
  id : 'user',

  /** For requests with an `id`, you can auto-load the entity.
   *  Errors terminate the request, success sets `req[id] = data`.
   */
  load(req, id, callback) {
  },

  /** POST / - Create a new entity */
  async create({ body }, res) {

    let {email, password, username} = body;
    if(!email || !password || !username) {
      res.status(400)
      return res.json({err: "Missing pass, email or username"})
    }
    let user = new User({email, password, username})
    try {
      let saved = await user.save();
      return res.json({user: saved.username})
    } catch(err){
      res.status(400)
      return res.json({err: "Error creating user: " + err.toString()})
    }
  },

});
