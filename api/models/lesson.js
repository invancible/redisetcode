const mongoose = require('mongoose');

const { Schema } = mongoose;

const lessonSchema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Title field is required.'],
      unique: true,
    },
    content: {
      type: String,
      required: [true, 'Content field is required.'],
    },
    category: {
      type: String,
      required: [true, 'Category field is required.'],
      enum: {
        values: ['Introduction To Programming', 'Basics of C++', 'Advance C++'],
        message: '{VALUE} is not supported',
      },
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Lesson', lessonSchema);
