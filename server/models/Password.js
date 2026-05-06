import mongoose from 'mongoose';

const passwordSchema = new mongoose.Schema({
  website: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  password: {
    type: String, // This will be stored encrypted
    required: true
  },
  category: {
    type: String,
    enum: ['Social', 'Banking', 'Work', 'Entertainment', 'Education', 'Other'],
    default: 'Other'
  },
  notes: {
    type: String
  },
  favorite: {
    type: Boolean,
    default: false
  },
  createdBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }
}, {
  timestamps: true
});

const Password = mongoose.model('Password', passwordSchema);
export default Password;
