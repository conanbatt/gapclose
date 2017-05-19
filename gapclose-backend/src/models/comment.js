import mongoose from 'mongoose';

const Schema = mongoose.Schema
const Topic = mongoose.model("Topic")

const CommentSchema = new Schema({
	content:        { type: String, required: true, minlength: 2, maxlength: 1000 },
	updated_at:     { type: Date, default: Date.now },
  topic:          { type: Schema.Types.ObjectId, ref: "Topic", required: true },
  children:       [{ type: Schema.Types.ObjectId, ref: "Comment" }],
  parent:         { type: Schema.Types.ObjectId, ref: "Comment"},
  inFavor:        { type: Boolean, required: true }
})

CommentSchema.statics.create = async ({topicId, parentId, ...rest},)=>{

  const topic = await Topic.findOne({ _id: topicId})
  let parentComment;
  if(parentId){
    parentComment = await Comment.findOne({ _id: parentId})
  }

  let newComment = new Comment(rest);
  newComment.topic = topic;
  newComment.parent = parentComment;

  let savedComment = await newComment.save()

  topic.comments.push(savedComment)
  await topic.save()

  if(parentComment){
    parentComment.children.push(newComment)
    await parentComment.save()
  }
  return savedComment;
}

const Comment = mongoose.model('Comment', CommentSchema);