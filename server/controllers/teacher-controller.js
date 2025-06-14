const bcrypt = require('bcrypt');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Sclass = require("../models/sclassSchema.js")
const cloudinary = require("cloudinary").v2

const teacherRegister = async (req, res) => {
    const { name, email, password, role, teacherSubject, teacherSclass } = req.body;

    try {
        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(password, salt);
        const subject = await Subject.findOne({ subName: teacherSubject });
        const sclass = await Sclass.findOne({ sclassName: teacherSclass });
        const teachsubject = subject?._id;
        const teachsclass = sclass._id;
        const teacher = new Teacher({ name, email, password: hashedPass, role, teachSubject: teachsubject, teachSclass: teachsclass });
        const existingTeacherByEmail = await Teacher.findOne({ email });

        if (existingTeacherByEmail) {
            res.send({ message: 'Email already exists' });
        }
        else {
            let result = await teacher.save();
            await Subject.findByIdAndUpdate(teachsubject, { teacher: teacher._id });
            result.password = undefined;
            res.send(result);
        }
    } catch (error) {
        console.error("Error in studentAttendance:", error);
        res.status(500).json({ message: 'Internal Server Error', error: error.message });
    }
};

const teacherLogIn = async (req, res) => {
    try {
        let teacher = await Teacher.findOne({ email: req.body.email });
        if (teacher) {
            const validated = await bcrypt.compare(req.body.password, teacher.password);
            if (validated) {
                teacher = await teacher.populate("teachSubject", "subName sessions")
                teacher = await teacher.populate("teachSclass", "sclassName")
                teacher.password = undefined;
                res.send(teacher);
            } else {
                res.send({ message: "Invalid password" });
            }
        } else {
            res.send({ message: "Teacher not found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTeachers = async (req, res) => {
    try {
        let teachers = await Teacher.find({})
            .populate("teachSubject", "subName")
            .populate("teachSclass", "sclassName");
        if (teachers.length > 0) {
            let modifiedTeachers = teachers.map((teacher) => {
                return { ...teacher._doc, password: undefined };
            });
            res.send(modifiedTeachers);
        } else {
            res.send({ message: "No teachers found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const getTeacherDetail = async (req, res) => {
    try {
        let teacher = await Teacher.findById(req.params.id)
            .populate("teachSubject", "subName sessions")
            .populate("teachSclass", "sclassName")
        if (teacher) {
            teacher.password = undefined;
            res.send(teacher);
        }
        else {
            res.send({ message: "No teacher found" });
        }
    } catch (err) {
        res.status(500).json(err);
    }
};

const updateTeacherSubject = async (req, res) => {
    const { teacherId, teachSubject } = req.body;
    try {
        const updatedTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { teachSubject },
            { new: true }
        );
        await Subject.findByIdAndUpdate(teachSubject, { teacher: updatedTeacher._id });
        res.send(updatedTeacher);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteTeacher = async (req, res) => {
    try {
        const deletedTeacher = await Teacher.findByIdAndDelete(req.params.id);
        await Subject.updateOne(
            { teacher: deletedTeacher._id, teacher: { $exists: true } },
            { $unset: { teacher: 1 } }
        );
        res.send(deletedTeacher);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteTeachers = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({});
        const deletedCount = deletionResult.deletedCount || 0;
        if (deletedCount === 0) {
            res.send({ message: "No teachers found to delete" });
            return;
        }
        const deletedTeachers = await Teacher.find({ college: req.params.id });
        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } },
            { $unset: { teacher: "" }, $unset: { teacher: null } }
        );
        res.send(deletionResult);
    } catch (err) {
        res.status(500).json(err);
    }
};

const deleteTeachersByClass = async (req, res) => {
    try {
        const deletionResult = await Teacher.deleteMany({ teachSclass: req.params.id });
        const deletedCount = deletionResult.deletedCount || 0;
        if (deletedCount === 0) {
            res.send({ message: "No teachers found to delete" });
            return;
        }
        const deletedTeachers = await Teacher.find({ teachSclass: req.params.id });
        await Subject.updateMany(
            { teacher: { $in: deletedTeachers.map(teacher => teacher._id) }, teacher: { $exists: true } },
            { $unset: { teacher: "" }, $unset: { teacher: null } }
        );
        res.send(deletionResult);
    } catch (err) {
        res.status(500).json(err);
    }
};

const teacherAttendance = async (req, res) => {
    const { status, date } = req.body;
    try {
        const teacher = await Teacher.findById(req.params.id);
        if (!teacher) {
            return res.send({ message: 'Teacher not found' });
        }
        const existingAttendance = teacher.attendance.find(
            (a) =>
                a.date.toDateString() === new Date(date).toDateString()
        );
        if (existingAttendance) {
            existingAttendance.status = status;
        } else {
            teacher.attendance.push({ date, status });
        }
        const result = await teacher.save();
        return res.send(result);
    } catch (err) {
        res.status(500).json(err)
    }
};


const uploadTeacherProfile = async (req, res) => {
    try {
        // console.log("Response data : ", localStorage.getItem('Student'))

        //  Extracting the id of an student --------> use local storage
        const { teacherId } = req.body;
        console.log("Teacher Id: ", teacherId)
        if (!teacherId) {
            return res.status(400).json({ message: "Teacher ID is required" })
        }

        // Check file uploaded or not
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: 'File is not uploaded yet' })
        }

        const file = req.files.image;

        // Uploading image in cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "teacherProfile"         // Make this on cloudinary
        })

        // Save image details to MongoDB
        const updatingTeacher = await Teacher.findByIdAndUpdate(
            teacherId,
            { $push: { images: { public_id: result.public_id, url: result.secure_url } } },
            { new: true }
        )

        console.log("Updating teacher: ", updatingTeacher)
        if (!updatingTeacher) { return res.status(400).json({ message: "Teacher not found" }) }

        res.status(200).json({
            message: "Image upload successfully",
            imageUrl: result.secure_url,
            teacher: updatingTeacher
        })

    } catch (error) {
        console.error("Image upload failed", error)
        res.status(500).json({ message: "Image upload failed", error: error.message })
    }
}

module.exports = { teacherRegister, uploadTeacherProfile, teacherLogIn, getTeachers, getTeacherDetail, updateTeacherSubject, deleteTeacher, deleteTeachers, deleteTeachersByClass, teacherAttendance };