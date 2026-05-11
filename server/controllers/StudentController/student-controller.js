const dotenv = require("dotenv")
dotenv.config()
const bcrypt = require('bcryptjs');
const Student = require('../../models/StudentModel/studentSchema.js');
const Subject = require('../../models/TeacherModel/subjectSchema.js');
const Sclass = require('../../models/StudentModel/sclassSchema.js');
const cloudinary = require('cloudinary').v2
const NodeCache = require("node-cache")
const jwt = require("jsonwebtoken")

const myCache = new NodeCache({stdTTL: 3000})

const studentRegister = async (req, res) => {
    try {
        const sclassobj = await Sclass.findOne({ sclassName: req.body.course });
        if (!sclassobj) {
            return res.status(400).json({ message: 'Class not exists' });
        }
        const existingStudent = await Student.findOne({
            rollNum: req.body.rollNum,
            sclassName: sclassobj._id,
        });
        if (existingStudent) {
            return res.status(400).send({ message: 'Roll Number already exists' });
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        const student = new Student({
            ...req.body,
            password: hashedPass,
            sclassName: sclassobj._id,
        });
        let result = await student.save();
        // result.password = undefined;
        res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const studentLogIn = async (req, res) => {
    try {
        let student = await Student.findOne({ rollNum: req.body.rollNum, name: req.body.name });
        if (student) {
            const validated = await bcrypt.compare(req.body.password, student.password);
            if (validated) {
                student = await student.populate("sclassName", "sclassName")

                const safeStudent = student.toObject();
                delete safeStudent.password;
                delete safeStudent.examResult
                delete safeStudent.attendance
                const token = jwt.sign(
                    {name: req.body.name, rollNum: req.body.rollNum, role: "student"},
                    process.env.JWT_SECRET,
                    {expiresIn: "1h"}
                )
                return res.status(201).json({message: "Login successful", student: safeStudent, token});
            } else {
                return res.send({ message: "Invalid password" });
            }
        } else {
            return res.send({ message: "Student not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getStudents = async (req, res) => {
    try {
        // 1. Setup Pagination
        const page = parseInt(req.query.page) || 1
        const limit = parseInt(req.query.limit) || 10

        // Implement cacheing
        const cacheKey = `student_page_${page}_limit_to_${limit}`

        // 1. If cache data is present
        if (myCache.has(cacheKey)) {
            console.log("Cache data is serving")
            return res.json(myCache.get(cacheKey))
        }

        // Skip pages
        const skipPage = (page - 1) * limit

        // 2. If cache data is not present
        const [students, total] = await Promise.all([
            Student.find().populate("sclassName", "sclassName").skip(skipPage).limit(limit),
            Student.countDocuments()
        ])

        if (students.length > 0) {
            let modifiedStudents = students.map((student) => {
                return { ...student._doc, password: undefined };
            });
            const responseData = {
                modifiedStudents,
                page,
                total,
                totalPage: Math.ceil(total / limit)
            }

            // 3. Save in cache to use next time
            myCache.set(cacheKey, responseData)
            return res.send(responseData);
        } else {
            return res.send({ message: "No students found" });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

const getStudentDetail = async (req, res) => {
    try {
        let student = await Student.findById(req.params.id)
            .populate("sclassName", "sclassName");
        if (student) {
            student.password = undefined;
            res.send(student);
        }
        else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const classStudents = async (req, res) => {
    try {
        let student = await Student.find({ sclassName: req.params.id })
        if (student.length > 0) {
            res.send(student)
        } else {
            res.send({ message: "No student found" });
        }
    } catch (err) {
        res.status(500).json({ message: "An error occured", err: err.message });
    }
};

const deleteStudent = async (req, res) => {
    try {
        const result = await Student.findByIdAndDelete(req.params.id)
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteStudents = async (req, res) => {
    try {
        const result = await Student.deleteMany({})
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteStudentsByClass = async (req, res) => {
    try {
        const result = await Student.deleteMany({ sclassName: req.params.id })
        if (result.deletedCount === 0) {
            res.send({ message: "No students found to delete" })
        } else {
            res.send(result)
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateStudent = async (req, res) => {
    try {
        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        let result = await Student.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        result.password = undefined;
        res.send(result)
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateExamResult = async (req, res) => {
    const { subName, marksObtained } = req.body;
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.send({ message: 'Student not found' });
        }
        const existingResult = student.examResult.find(
            (result) => result.subName.toString() === subName
        );
        if (existingResult) {
            existingResult.marksObtained = marksObtained;
        } else {
            student.examResult.push({ subName, marksObtained });
        }
        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const studentAttendance = async (req, res) => {
    const { subName, status, date } = req.body;
    try {
        const student = await Student.findById(req.params.id);
        if (!student) {
            return res.send({ message: 'Student not found' });
        }
        const subject = await Subject.findOne({ subName: subName });
        const existingAttendance = student.attendance.find(
            (a) => a.date.toDateString() === new Date(date).toDateString() && a.subName.toString() === subName
        );
        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            const attendedSessions = student.attendance.filter(
                (a) => a.subName.toString() === subName
            ).length;
            if (attendedSessions >= subject.sessions) {
                return res.send({ message: 'Maximum attendance limit reached' });
            }
            student.attendance.push({ date, status, subName });
        }
        const result = await student.save();
        return res.send(result);
    } catch (error) {
        res.status(500).json(error);
    }
};

const studentAttendances = async (req, res) => {
    try {
        const subject = await Subject.findById(req.body.subjectId);
        if (!subject) {
            return res.send({ message: 'Subject Not Exists' });
        }

        const attendances = req.body.attendanceData.map((singledata) => ({
            subName: subject.subName,
            status: singledata.status,
            date: singledata.date,
            student: singledata.studentId,
        }));

        for (let attendance of attendances) {
            const student = await Student.findById(attendance.student);
            if (!student) continue;

            student.attendance.push({
                date: attendance.date,
                status: attendance.status,
                subName: attendance.subName
            });

            await student.save();
        }

        return res.send("Attendance Marked Successfully!!");
    } catch (error) {
        console.error("Error in studentAttendance:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const clearAllStudentsAttendanceBySubject = async (req, res) => {
    const sub = await Subject.findById(req.params.id);
    try {
        const subName = sub.subName;
        const result = await Student.updateMany(
            { 'attendance.subName': subName },
            { $pull: { attendance: { subName } } }
        );
        return res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const clearAllStudentsAttendance = async (req, res) => {
    try {
        const result = await Student.updateMany(
            { $set: { attendance: [] } }
        );
        return res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const removeStudentAttendanceBySubject = async (req, res) => {
    const studentId = req.params.id;
    try {
        const subName = req.body.subName;
        const result = await Student.updateOne(
            { _id: studentId },
            { $pull: { attendance: { subName: subName } } }
        );
        return res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const removeStudentAttendance = async (req, res) => {
    const studentId = req.params.id;
    try {
        const result = await Student.updateOne(
            { _id: studentId },
            { $set: { attendance: [] } }
        );
        return res.send(result);
    } catch (err) {
        res.status(500).json(err);
    }
};

const uploadStudentProfile = async (req, res) => {
    try {
        // console.log("Response data : ", localStorage.getItem('Student'))

        //  Extracting the id of an student --------> use local storage
        const { studentId } = req.body;
        if (!studentId) {
            return res.status(400).json({ message: "Student ID is required" })
        }

        // Check file uploaded or not
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'File is not uploaded yet' })
        }

        const file = req.files.image;

        // Uploading image in cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "studentProfile"         // Make this on cloudinary
        })

        // Save image details to MongoDB
        const updatingStudent = await Student.findByIdAndUpdate(
            studentId,
            { $push: { images: { public_id: result.public_id, url: result.secure_url } } },
            { new: true }
        )

        if (!updatingStudent) { return res.status(400).json({ message: "Student not found" }) }

        res.status(200).json({
            message: "Image upload successfully",
            imageUrl: result.secure_url,
            student: updatingStudent
        })

    } catch (error) {
        console.error("Image upload failed", error)
        res.status(500).json({ message: "Image upload failed", error: error.message })
    }
}
module.exports = { studentRegister, studentLogIn, getStudents, getStudentDetail, deleteStudents, classStudents, deleteStudent, updateStudent, studentAttendance, studentAttendances, deleteStudentsByClass, updateExamResult, clearAllStudentsAttendanceBySubject, clearAllStudentsAttendance, removeStudentAttendanceBySubject, removeStudentAttendance, uploadStudentProfile };
