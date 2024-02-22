// User.js
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const { Schema } = mongoose;

const UserSchema = new Schema({
  name: String,
  email: { type: String, unique: true },
  password: String,
});

// Hash the password before saving the user
UserSchema.pre('save', async function (next) {
  const user = this;

  // Only hash the password if it has been modified (or is new)
  if (!user.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(user.password, salt);
    user.password = hashedPassword;
    next();
  } catch (error) {
    return next(error);
  }
});

// Login function to check email and password
UserSchema.statics.login = async function (email, password) {
  const user = await this.findOne({ email });

  if (user) {
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      return user; // Return the user data if login is successful
    } else {
      throw new Error('Invalid password');
    }
  } else {
    throw new Error('User not found');
  }
};

const UserModel = mongoose.model('User', UserSchema);

export { UserModel };
