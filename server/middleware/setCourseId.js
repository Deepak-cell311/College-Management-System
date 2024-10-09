
const setCourseId = (req, res, next) => {
  const storedCourseId = localStorage.getItem("courseTodo"); 
  req.courseId = storedCourseId ? JSON.parse(storedCourseId) : null; 
  next();
}

module.exports = setCourseId;