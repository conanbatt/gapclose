import mongoose from 'mongoose';
import bcrypt from 'bcrypt-node';

const Schema = mongoose.Schema

const UserSchema = new Schema({
  username:      { type: String, required: true, minlength: 5, maxlength: 50, index: true, unique: true },
  password:      { type: String, required: true },
  email:         { type: String, required: true },
  isAdmin:       { type: Boolean, default: false }
})


UserSchema.pre("save", function(next){
  const user = this;
  if (!user.isModified('password')) return next();

  bcrypt.genSalt(10, (err, salt)=>{
    if (err) return next(err);

    bcrypt.hash(user.password, salt, (err, hash)=> {
        if (err) return next(err);
        user.password = hash;
        next();
    });
  })
})


UserSchema.methods.comparePassword = function(cpass, cb) {
  bcrypt.compare(cpass, this.password, (err, isMatch)=> {
    console.log("calling this piece of shit")
    if (err) return cb(err);
    cb(null, isMatch);
  });
};

const User = mongoose.model('User', UserSchema);
export default User