import mongoose from 'mongoose';

const Schema = mongoose.Schema

const TopicSchema = new Schema({
	title: {type: String, index: { unique: true }},
	updated_at: Date,
	arguments: [{ type: Schema.Types.ObjectId, ref: "Comment"}]
})

const Topic = mongoose.model('Topic', TopicSchema);
