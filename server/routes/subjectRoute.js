const router = require('express').Router();
const { subjectCreate, classSubjects, deleteSubjectsByClass, getSubjectDetail, deleteSubject, freeSubjectList, allSubjects } = require('../controllers/subject-controller.js');

router.post('/SubjectCreate/:id', subjectCreate);           // done
router.get('/AllSubjects', allSubjects);                    // done
router.get('/ClassSubjects/:id', classSubjects);            //done
router.get('/FreeSubjectList/:id', freeSubjectList);
router.get("/Subject/:id", getSubjectDetail);               // done
router.delete("/Subject/:id", deleteSubject);               // done
router.delete("/SubjectsClass/:id", deleteSubjectsByClass);

module.exports = router;