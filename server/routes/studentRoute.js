const router = require('express').Router();
const { studentRegister, studentLogIn, getStudents, classStudents, getStudentDetail, deleteStudents, deleteStudent, updateStudent, studentAttendance, deleteStudentsByClass, updateExamResult, clearAllStudentsAttendanceBySubject, clearAllStudentsAttendance, removeStudentAttendanceBySubject, removeStudentAttendance } = require('../controllers/student-controller.js');

router.post('/StudentReg', studentRegister);            //Done
router.post('/StudentLogin', studentLogIn);             //Done
router.get("/Students/", getStudents);                   
router.get("/Student/:id", getStudentDetail);           //Done
router.get("/ClassStudents/:id", classStudents);
router.delete("/Students/", deleteStudents);
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);
router.put("/Student/:id", updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

module.exports = router;
