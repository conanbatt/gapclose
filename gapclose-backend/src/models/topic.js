import mongoose from 'mongoose';

const Schema = mongoose.Schema

const TopicSchema = new Schema({
	title: {type: String, index: true, unique: true, required: true, minlength: 10, maxlength: 150},
	updated_at: Date,
	comments: [{ type: Schema.Types.ObjectId, ref: "Comment"}]
})

const Topic = mongoose.model('Topic', TopicSchema);
