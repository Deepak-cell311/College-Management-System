const dotenv = require('dotenv');
dotenv.config();
const bcrypt = require('bcrypt');
const Admin = require('../models/adminSchema.js');
const Sclass = require('../models/sclassSchema.js');
const Student = require('../models/studentSchema.js');
const Teacher = require('../models/teacherSchema.js');
const Subject = require('../models/subjectSchema.js');
const Notice = require('../models/noticeSchema.js');
const Complain = require('../models/complainSchema.js');
const cloudinary = require('cloudinary').v2;

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const adminLogIn = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: "Email and password are required" });
        }
        const admin = await Admin.find({ email });
        if (!admin) {
            return res.status(404).json({ message: "Admin not found" });
        }
        const isMatch = await bcrypt.compare(password, admin[0].password); // Compare the password with the hashed password
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid password" });   // 401 is for unauthorize access
        }
        admin[0].password = undefined; // Remove password from the response
        return res.status(200).json(admin[0]); // Send the admin details without the password
    } catch (error) {
        return res.status(500).json({ message: "Server error", error: error.message });
    }
}
const getAdminDetail = async (req, res) => {
    try {
        const admin = await Admin.findById(req.params.id);
        if (admin) {
            admin.password = undefined;
            return res.send(admin);
        }
        else {
            return res.send({ message: "No admin found" });
        }
    } catch (err) {
        return res.status(500).json(err);
    }
};

const deleteAdmin = async (req, res) => {
    try {
        const adminId = req.params.id;
        const [admin] = await Promise.all([
            Admin.findByIdAndDelete(adminId),
            Sclass.deleteMany({ college: adminId }),
            Student.deleteMany({ college: adminId }),
            Teacher.deleteMany({ college: adminId }),
            Subject.deleteMany({ college: adminId }),
            Notice.deleteMany({ college: adminId }),
            Complain.deleteMany({ college: adminId }),
        ])
        return res.send(admin)
    } catch (err) {
        return res.status(500).json(err);
    }
};

const updateAdmin = async (req, res) => {
    try {
        let result = await Admin.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true })
        result.password = undefined;
        return res.send(result)
    } catch (err) {
        return res.status(500).json(err);
    }
};

const uploadProfileImage = async (req, res) => {
    try {
        // Ensure admin ID is provided
        const { adminId } = req.body;
        if (!adminId) {
            return res.status(400).json({ message: "Admin ID is required" });
        }

        // Ensure file is uploaded
        if (!req.files || !req.files.image) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.files.image;

        // Upload file to Cloudinary
        const result = await cloudinary.uploader.upload(file.tempFilePath, {
            folder: "profileImages"
        });

        // Save image details to MongoDB
        const updatedAdmin = await Admin.findByIdAndUpdate(
            adminId,
            {
                $push: { images: { public_id: result.public_id, url: result.secure_url } }
            },
            { new: true }
        );

        if (!updatedAdmin) {
            return res.status(404).json({ message: "Admin not found" });
        }

        return res.status(200).json({
            message: "Image uploaded successfully",
            imageUrl: result.secure_url,
            admin: updatedAdmin
        });

    } catch (error) {
        console.error("Image Upload Error:", error);
        return res.status(500).json({ message: "Image upload failed", error: error.message });
    }
};



module.exports = { adminLogIn, getAdminDetail, deleteAdmin, updateAdmin, uploadProfileImage };