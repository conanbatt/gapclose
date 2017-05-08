import mongoose from 'mongoose';

const Schema = mongoose.Schema

const CommentSchema = new Schema({
	content: String,
	updated_at: Date,
	topic: { type: Number, ref: "Topic"}
})

const Comment = mongoose.model('Comment', CommentSchema);