const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose")
const dotenv = require("dotenv")
const bodyParser = require("body-parser");
const app = express()
const adminRoute = require("./routes/adminRoute.js")
const complainRoute = require("./routes/complainRoute.js")
const noticeRoute = require("./routes/noticeRoute.js")
const sclassRoute = require("./routes/sclassRoute.js")
const studentRoute = require("./routes/studentRoute.js")
const subjectRoute = require("./routes/subjectRoute.js")
const teacherRoute = require("./routes/teacherRoute.js")
const feesRoute = require("./routes/feesRoute.js")
const paymentRoute = require("./routes/paymentRoute.js")
const fileUpload = require("express-fileupload")
const cloudinary = require('cloudinary');
const PORT = process.env.PORT || 5000
const job = require("./lib/cron.js")

dotenv.config();

app.use(bodyParser.json({extended: true }))
app.use(bodyParser.urlencoded({extended: true, limit: "50mb"}))
app.use(express.json({limit: "50mb"}))
app.use(fileUpload({ useTempFiles: true, tempFileDir: "/tmp/" }));


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});

// app.use(cors())
app.use(cors({
    origin: ["http://localhost:3000", "https://college-management-system-nine.vercel.app"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}))

mongoose
    .connect(process.env.MONGO_URL)
    .then(() => console.log("Connected to MongoDB"))
    .catch((err) => console.log("NOT CONNECTED TO NETWORK", err))

app.get('/',(req,res)=>{
    res.send(`API is running...`)
});

app.use('/Admin', adminRoute);
app.use('/Complain', complainRoute);
app.use('/Notice', noticeRoute);
app.use('/Sclass', sclassRoute);
app.use('/Student', studentRoute);
app.use('/Subject', subjectRoute);
app.use('/Teacher', teacherRoute);
app.use('/Fees', feesRoute);
app.use("/payment", paymentRoute);


app.listen(PORT, () => {
    console.log(`Server started at port no. ${PORT}`)
})