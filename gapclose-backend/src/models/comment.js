import mongoose from 'mongoose';

const Schema = mongoose.Schema
var tree = require('mongoose-path-tree');

const CommentSchema = new Schema({
	content: String,
	updated_at: Date,
	topic: { type: Number, ref: "Topic", required: true },
  inFavor: Boolean,
  commentRelationshipType: { type: String, enum: {
    values: ["addition", "reply"],
  }}
})

CommentSchema.plugin(tree);
const Comment = mongoose.model('Comment', CommentSchema);