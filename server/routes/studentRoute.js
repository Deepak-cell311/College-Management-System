const router = require('express').Router();
const { studentRegister, studentLogIn, uploadStudentProfile, getStudents, getStudentDetail, deleteStudents, classStudents, deleteStudent, updateStudent, studentAttendance, studentAttendances, deleteStudentsByClass, updateExamResult, clearAllStudentsAttendanceBySubject, clearAllStudentsAttendance, removeStudentAttendanceBySubject, removeStudentAttendance } = require('../controllers/student-controller.js');

router.post('/StudentReg', studentRegister);                                                        //done
router.post('/StudentLogin', studentLogIn);                                                         //done
router.post('/StudentProfile', uploadStudentProfile)                                                //done
router.get("/Students/", getStudents);                                                              //done
router.get("/Student/:id", getStudentDetail);                                                       //done
router.get("/ClassStudents/:id", classStudents);                                                    //done
router.delete("/Students/", deleteStudents);        
router.delete("/StudentsClass/:id", deleteStudentsByClass);
router.delete("/Student/:id", deleteStudent);                                                       // done
router.put("/Student/:id", updateStudent);
router.put('/UpdateExamResult/:id', updateExamResult);
router.put('/StudentAttendances/', studentAttendances);
router.put('/StudentAttendance/:id', studentAttendance);
router.put('/RemoveAllStudentsSubAtten/:id', clearAllStudentsAttendanceBySubject);
router.put('/RemoveAllStudentsAtten/', clearAllStudentsAttendance);
router.put('/RemoveStudentSubAtten/:id', removeStudentAttendanceBySubject);
router.put('/RemoveStudentAtten/:id', removeStudentAttendance);

module.exports = router;
