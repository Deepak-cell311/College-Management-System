const router = require('express').Router();
const { teacherRegister, uploadTeacherProfile, teacherLogIn, getTeachers, getTeacherDetail, deleteTeachers, deleteTeachersByClass, deleteTeacher, updateTeacherSubject, teacherAttendance } = require('../../controllers/TeacherController/teacher-controller.js');
const verifyToken = require("../../lib/middleware-tokenVerify.js");
const checkRole = require('../../lib/middleware-role.js');

router.post('/TeacherReg', teacherRegister);                            //done
router.post('/TeacherLogin', teacherLogIn);                //done
router.post('/TeacherProfile', uploadTeacherProfile);                   //done
router.get("/Teachers/", getTeachers);                                  //done
router.get("/Teacher/:id", getTeacherDetail);
router.delete("/Teachers/", deleteTeachers);                            //done
router.delete("/TeachersClass/:id", deleteTeachersByClass);
router.delete("/Teacher/:id", deleteTeacher);                           //done
router.put("/TeacherSubject", updateTeacherSubject);
router.post('/TeacherAttendance/:id', teacherAttendance);               //done

module.exports = router;