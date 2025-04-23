const express = require('express');
const FeeSchema = require('../models/feesSchema');
const sclassSchema = require('../models/sclassSchema');


const FeeDataCreation = async (req, res) => {
    try {
        const { courseName, rows } = req.body; // Extract courseName and rows array

        if (!courseName || !rows || rows.length === 0) {
            return res.status(400).json({ message: "Course name and fee rows are required" });
        }

        // Find the course ID from sclassSchema
        const sclass = await sclassSchema.findOne({ sclassName: new RegExp(`^${courseName}$`, "i") });
        if (!sclass) {
            return res.status(404).json({ message: "Course not found" });
        }

        const courseId = sclass._id;

        // Validate each row
        for (const row of rows) {
            if (!row.heads || !row.semester1 || !row.semester2 || !row.semester3 || !row.semester4 || !row.semester5 || !row.semester6) {
                return res.status(400).json({ message: "All fields in each row are required" });
            }
        }

        // Insert multiple rows into the database
        const newFees = await FeeSchema.insertMany(
            rows.map(row => ({
                courseName: courseId,
                heads: row.heads,
                semester1: row.semester1,
                semester2: row.semester2,
                semester3: row.semester3,
                semester4: row.semester4,
                semester5: row.semester5,
                semester6: row.semester6
            }))
        );

        return res.status(201).json({ message: "Fee data saved successfully!", newFees });
    } catch (error) {
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

const ShowFees = async (req, res) => {
    try {
        const { courseId } = req.params;
        if (!courseId) {
            return res.status(400).json({ message: "Course ID is required" });
        }
        const fees = await FeeSchema.find({ courseName: courseId }).populate("courseName");
        if (fees.length === 0) {
            return res.status(404).json({ message: "No fee data found for this course" });
        }
        return res.status(200).json(fees);
    } catch (error) {
        console.error("Error fetching fee data:", error);
        res.status(500).json({ message: "Something went wrong", error: error.message });
    }
};

module.exports = { FeeDataCreation, ShowFees };