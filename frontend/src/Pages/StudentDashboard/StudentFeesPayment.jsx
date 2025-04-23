import React, { useEffect, useState } from "react"
import axios from 'axios'
import { toast } from "react-toastify"


const StudentFeesPayment = () => {


    const coursesData = [
        {
            id: 1,
            code: "CS101",
            name: "Introduction to Computer Science",
            credits: 3,
            fee: 1200,
            status: "Paid",
            dueDate: "2023-09-15",
            paymentDate: "2023-09-10",
        },
        {
            id: 2,
            code: "MATH201",
            name: "Calculus II",
            credits: 4,
            fee: 1500,
            status: "Pending",
            dueDate: "2023-09-20",
            paymentDate: null,
        },
        {
            id: 3,
            code: "ENG102",
            name: "English Composition",
            credits: 3,
            fee: 1000,
            status: "Paid",
            dueDate: "2023-09-10",
            paymentDate: "2023-09-05",
        },
        {
            id: 4,
            code: "PHYS101",
            name: "Physics I",
            credits: 4,
            fee: 1500,
            status: "Overdue",
            dueDate: "2023-09-01",
            paymentDate: null,
        },
        {
            id: 5,
            code: "CHEM101",
            name: "Chemistry I",
            credits: 4,
            fee: 1500,
            status: "Pending",
            dueDate: "2023-09-25",
            paymentDate: null,
        },
    ]
    /*====================================================[Fees Payment]======================================================*/

    const [selectedCourse, setSelectedCourse] = useState(null)
    const [searchTerm, setSearchTerm] = useState("")
    const [fetchedCourseData, setFetchedCourseData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [feesData, setFeesData] = useState([])
    // const [activeTab, setActiveTab] = useState("all")

    const ShowFeesData = async () => {
        const studentData = localStorage.getItem("Student");
        if (!studentData) {
            toast.error("No student data found. Please log in.");
            return;
        }
        const student = JSON.parse(studentData);
        const sclassName = student?.sclassName?._id;
        console.log("sclassName: ", sclassName)
        setLoading(true)
        try {
            const fetchFeesData = await axios.get(`https://college-management-system-s6xa.onrender.com/Fees/get-fees/${sclassName}`);
            console.log("Fetch fees data: ", fetchFeesData)
            if (fetchFeesData.status === 200 || fetchFeesData.status === 201) {
                setFeesData(fetchFeesData.data);
            }
        } catch (error) {
            toast.error(error || "An error occured while fetching fees data");
        } finally {
            setLoading(false)
        }
    }

    const courseDataShow = async () => {
        try {
            const fetchCourseData = await axios.get(`https://college-management-system-s6xa.onrender.com/Sclass/SclassList`);
            console.log("Response data: ", fetchCourseData);
            if (fetchCourseData.status === 200 || fetchCourseData.status === 201) {
                setFetchedCourseData(fetchCourseData.data);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || 'Failed to fetch courses');
            console.log("Error: ", error)
        }
    }

    /*======================================================[RazorPay Implementation]====================================================== */

    const [amount, setAmount] = useState("");
    // Load Razorpay script before using it
    const loadRazorpayScript = () => {
        return new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "https://checkout.razorpay.com/v1/checkout.js";
            script.async = true;
            script.onload = () => resolve(true);
            script.onerror = () => resolve(false);
            document.body.appendChild(script);
        });
    };

    const payNow = async (amount) => {
        try {
            const isLoaded = await loadRazorpayScript(); // Ensure Razorpay SDK is loaded
            if (!isLoaded) {
                toast.warning("Failed to load Razorpay. Check your internet connection.");
                return;
            }

            // Call backend API to create order
            const response = await axios.post("https://college-management-system-s6xa.onrender.com/payment/create-order", {
                amount: amount, // Convert to paisa
                currency: "INR",
            });

            const order = response.data;

            // Initialize Razorpay Checkout
            const options = {
                key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Use React env variable
                amount: order.amount, // Already in paisa
                currency: order.currency,
                name: "DAMS ERP",
                description: "Test Transaction",
                order_id: order.id, // Order ID from backend
                handler: function (response) {
                    console.log("Payment Success", response);
                    alert("Payment Successful!");
                },
                prefill: {
                    name: "John Doe",
                    email: "johndoe@example.com",
                    contact: "9999999999",
                },
                theme: {
                    color: "#3399cc",
                },
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (error) {
            console.error("Error processing payment:", error);
            alert("Error processing payment.");
        }
    };

    console.log("fees data: ", feesData)

    // UseEffect for the subject data and student data
    useEffect(() => {
        ShowFeesData()
        courseDataShow()

    }, [])
    return (
        <>

            <main className="container mx-auto py-8 px-4">
                <div className="space-y-6">
                    <div className="flex flex-col space-y-2">
                        <h1 className="text-3xl font-bold tracking-tight">Fee Submission</h1>
                        <p className="text-gray-500">View and manage your course fee submissions</p>
                    </div>

                    {/* Search Input */}
                    <div className="relative mb-6">
                        <div className="absolute left-3 top-3 text-gray-400">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="16"
                                height="16"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            >
                                <circle cx="11" cy="11" r="8"></circle>
                                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
                            </svg>
                        </div>
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none text-black focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>

                    {/* Courses Table */}
                    <div className="overflow-x-auto rounded-md border border-gray-200">
                        <table className="min-w-full divide-y divide-gray-900">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Semester
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Course Name
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Fee Amount
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Amount to Be Paid
                                    </th>
                                    <th
                                        scope="col"
                                        className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                                    >
                                        Actions
                                    </th>
                                </tr>
                            </thead>
                            <tbody className="bg-gray-900 divide-y divide-gray-100">
                                {feesData.length === 0 ? (
                                    <tr>
                                        <td colSpan={7} className="px-6 py-8 text-center text-sm text-white">
                                            No courses found
                                        </td>
                                    </tr>
                                ) :
                                    // (
                                    //     feesData.length > 0 && (<>
                                    //         <tr key={feesData.length - 1} className="hover:bg-gray-50 text-black">
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Semester1</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].courseName.sclassName}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].semester1}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> Admission</td>
                                    //             <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className='mt-5 text-center outline-none' />
                                    //             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    //                 <button onClick={payNow} className="text-white p-2 rounded-lg bg-blue-600 hover:text-blue-900 focus:outline-none">
                                    //                     Pay Now
                                    //                 </button>
                                    //             </td>
                                    //         </tr>

                                    //         <tr key={feesData.length - 1} className="hover:bg-gray-50 text-black">
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Semester2</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].courseName.sclassName}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].semester2}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> 01 to 31 Jan, 2025</td>
                                    //             <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className='mt-5 text-center outline-none' />
                                    //             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    //                 <button onClick={payNow} className="text-white p-2 rounded-lg bg-blue-600 hover:text-gray-200 focus:outline-none">
                                    //                     Pay Now
                                    //                 </button>
                                    //             </td>
                                    //         </tr>
                                    //         <tr key={feesData.length - 1} className="hover:bg-gray-50 text-black">
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Semester3</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].courseName.sclassName}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].semester3}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> 01 to 31 July, 2025</td>
                                    //             <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className='mt-5 text-center outline-none' />
                                    //             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    //                 <button onClick={() => setSelectedCourse(feesData)} className="text-white p-2 rounded-lg bg-blue-600 hover:text-blue-900 focus:outline-none">
                                    //                     Pay Now
                                    //                 </button>
                                    //             </td>
                                    //         </tr>
                                    //         <tr key={feesData.length - 1} className="hover:bg-gray-50 text-black">
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Semester4</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].courseName.sclassName}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].semester4}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> 01 to 31 Jan, 2026</td>
                                    //             <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className='mt-5 text-center outline-none' />
                                    //             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    //                 <button onClick={() => setSelectedCourse(feesData)} className="text-white p-2 rounded-lg bg-blue-600 hover:text-blue-900 focus:outline-none">
                                    //                     Pay Now
                                    //                 </button>
                                    //             </td>
                                    //         </tr>
                                    //         <tr key={feesData.length - 1} className="hover:bg-gray-50 text-black">
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Semester5</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].courseName.sclassName}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].semester5}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> 01 to 31 July, 2026</td>
                                    //             <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className='mt-5 text-center outline-none' />
                                    //             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    //                 <button onClick={() => setSelectedCourse(feesData)} className="text-white p-2 rounded-lg bg-blue-600 hover:text-blue-900 focus:outline-none">
                                    //                     Pay Now
                                    //                 </button>
                                    //             </td>
                                    //         </tr>
                                    //         <tr key={feesData.length - 1} className="hover:bg-gray-50 text-black">
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Semester6</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].courseName.sclassName}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{feesData[feesData.length - 1].semester2}</td>
                                    //             <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800"> 01 to 31 Jan, 2027</td>
                                    //             <input type="text" value={amount} onChange={(e) => setAmount(e.target.value)} className='mt-5 text-center outline-none' />
                                    //             <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                    //                 <button onClick={() => setSelectedCourse(feesData)} className="text-white p-2 rounded-lg bg-blue-600 hover:text-blue-900 focus:outline-none">
                                    //                     Pay Now
                                    //                 </button>
                                    //             </td>
                                    //         </tr>

                                    //     </>))

                                    (
                                        feesData.length > 0 && (
                                            <>
                                              {Object.keys(feesData[feesData.length - 1])
                                                .filter((key) => key.startsWith("semester"))
                                                .map((semesterKey, index) => (
                                                  <tr key={index} className="hover:bg-gray-700 text-white">
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100 font-bold">
                                                      Semester {index + 1}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                                                      {feesData[feesData.length - 1].courseName.sclassName}
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-100">
                                                      {feesData[feesData.length - 1][semesterKey]}
                                                    </td>
                                                   
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm text-gray-100">
                                                      <input
                                                        type="text"
                                                        value={feesData[feesData.length - 1][semesterKey]}
                                                        onChange={(e) => setAmount(e.target.value)}
                                                        className="text-center outline-none bg-gray-800 text-white p-2 rounded"
                                                        readOnly={true}
                                                      />
                                                    </td>
                                                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                                      <button
                                                         onClick={() => payNow(feesData[feesData.length - 1][semesterKey])}
                                                        className="text-white p-2 rounded-lg bg-blue-600 hover:bg-blue-800 focus:outline-none"
                                                      >
                                                        Pay Now
                                                      </button>
                                                    </td>
                                                  </tr>
                                                ))}
                                            </>
                                    ))


                                }
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>
        </>
    )
}

export default StudentFeesPayment