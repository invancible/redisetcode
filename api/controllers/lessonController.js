const Lesson = require('../models/lesson');

const catchAsync = require('../middleware/catchAsync');
const AppError = require('../utils/appError');

exports.getAllLessons = catchAsync(async (req, res, next) => {
  const lessons = await Lesson.find();

  res.status(200).json({
    status: 'success',
    result: lessons.length,
    data: {
      lessons,
    },
  });
});

exports.getLesson = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await Lesson.findById(id);

  if (!lesson) {
    return next(new AppError(`No lesson with ID: ${id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      lesson,
    },
  });
});

exports.createLesson = catchAsync(async (req, res, next) => {
  const lesson = await Lesson.create(req.body);

  res.status(200).json({
    status: 'success',
    data: {
      lesson,
    },
  });
});

exports.updateLesson = catchAsync(async (req, res, next) => {
  const { id } = req.params;

  const lesson = await Lesson.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!lesson) {
    return next(new AppError(`No lesson with ID: ${id}`, 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      lesson,
    },
  });
});

exports.deleteLesson = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const lesson = await Lesson.findByIdAndDelete(id);

  if (!lesson) {
    return next(new AppError(`No lesson with ID: ${id}`, 404));
  }

  res.status(204).json({
    status: 'success',
    data: {},
  });
});
