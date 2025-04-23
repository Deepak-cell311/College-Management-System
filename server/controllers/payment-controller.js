const express = require("express");
const Razorpay = require("razorpay");
require("dotenv").config();

// Initialize Razorpay instance
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// Create Razorpay order
const createOrder =  async (req, res) => {
  try {
    const { amount, currency } = req.body;

    const options = {
      amount: amount * 100, // Amount in paisa (smallest currency unit)
      currency,
      receipt: `receipt_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);
    res.status(200).json(order);
  } catch (error) {
    res.status(500).json({ message: "Error creating Razorpay order", error: error.message });
  }
};

// Verify Payment (Webhook)
const verifyPayment = async (req, res) => {
  try {
    console.log("Payment Successful:", req.body);
    res.status(200).json({ message: "Payment verified successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Payment verification failed", error: error.message });
  }
};

module.exports = {createOrder, verifyPayment};
