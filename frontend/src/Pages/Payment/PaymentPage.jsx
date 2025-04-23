import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from 'react-hot-toast';

const PaymentPage = () => {
  const [fetchedCourseData, setFetchedCourseData] = useState([]);
  
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

  const payNow = async () => {
    try {
      const isLoaded = await loadRazorpayScript(); // Ensure Razorpay SDK is loaded
      if (!isLoaded) {
        toast.error("Failed to load Razorpay. Check your internet connection.");
        return;
      }

      // Call backend API to create order
      const response = await axios.post("https://college-management-system-s6xa.onrender.com/payment/create-order", {
        amount: amount , // Convert to paisa
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
          toast.success("Payment Successful!");
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
      toast.error("Error processing payment.");
    }
  };






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

  const [selectedCourse, setSelectedCourse] = useState(null)
  const [searchTerm, setSearchTerm] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter courses based on search term and active tab

  const courseDataShow = async() => {
    try {
      const fetchCourseData = await axios.get(`https://college-management-system-s6xa.onrender.com/Sclass/SclassList`);
      console.log("Response data: ", fetchCourseData);
      if(fetchCourseData.status === 200 || fetchCourseData.status === 201 ){
        setFetchedCourseData(fetchCourseData.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch courses');
      console.log("Error: ", error)
    }
  }

  const showFeesDetail = async () => {
    try {
      const fetchFeesData = await axios.get(`https://college-management-system-s6xa.onrender.com/Fees/get-fees/`);
      console.log("Response data: ", fetchFeesData);
      if(fetchFeesData.status === 200 || fetchFeesData.status === 201 ){
        setFetchedCourseData(fetchFeesData.data);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch fees detail');
      console.log("Error: ", error)
    }
  }
  const filteredCourses = coursesData
    .filter(
      (course) =>
        course.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        course.code.toLowerCase().includes(searchTerm.toLowerCase()),
    )
    .filter((course) => {
      if (activeTab === "all") return true
      if (activeTab === "pending") return course.status === "Pending" || course.status === "Overdue"
      if (activeTab === "paid") return course.status === "Paid"
      return true
    })

  // Get status color for badges
  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-800"
      case "Pending":
        return "bg-yellow-100 text-yellow-800"
      case "Overdue":
        return "bg-red-100 text-red-800"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }
  
  useEffect(() => {
    courseDataShow();
    // showFeesDetail();
  })

  console.log("fetched Courses: ", fetchedCourseData)
  return (
    <main className="container mx-auto py-8 px-4">
      <div className="space-y-6">
        <div className="flex flex-col space-y-2">
          <h1 className="text-3xl font-bold tracking-tight">Fee Submission</h1>
          <p className="text-gray-500">View and manage your course fee submissions</p>
        </div>

        {/* Custom Tabs */}
        <div className="border-b border-gray-200">
          <div className="flex -mb-px">
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "all" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("all")}
            >
              All Courses
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "pending"
                  ? "border-b-2 border-blue-500 text-blue-600"
                  : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("pending")}
            >
              Pending
            </button>
            <button
              className={`py-2 px-4 font-medium text-sm ${
                activeTab === "paid" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
              }`}
              onClick={() => setActiveTab("paid")}
            >
              Paid
            </button>
          </div>
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
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Courses Table */}
        <div className="overflow-x-auto rounded-md border border-gray-200">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Course Code
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Course Name
                </th>
                {/* <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Credits
                </th> */}
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Fee Amount
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Due Date
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {fetchedCourseData.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-6 py-8 text-center text-sm text-gray-500">
                    No courses found
                  </td>
                </tr>
              ) : (
                fetchedCourseData.map((course, index) => (
                  <tr key={index} className="hover:bg-gray-50 text-black">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{course.sclassCode}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{course.sclassName}</td>
                    {/* <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">{course.sclassName}</td> */}
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {/* ${course.fee.toLocaleString()} */}{course.sclassName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-800">
                      {/* {new Date(course.dueDate).toLocaleDateString()} */}{course.sclassName}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        // className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(course.status)}`}
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full `}
                      >
                        {/* {course.status} */}{course.sclassName}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setSelectedCourse(course.id)}
                        className="text-blue-600 hover:text-blue-900 focus:outline-none"
                      >
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                        <span className="sr-only">View details</span>
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Fee Details Modal */}
        {selectedCourse && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg max-w-md w-full overflow-hidden shadow-xl">
              <div className="px-6 py-4 border-b border-gray-200">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-medium text-gray-900">
                    Fee Details - {coursesData.find((c) => c.id === selectedCourse).code}
                  </h3>
                  <button onClick={() => setSelectedCourse(null)} className="text-gray-400 hover:text-gray-500">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
                <p className="mt-1 text-sm text-gray-500">
                  {coursesData.find((c) => c.id === selectedCourse).name} (
                  {coursesData.find((c) => c.id === selectedCourse).credits} credits)
                </p>
              </div>

              <div className="px-6 py-4 space-y-4">
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex justify-between items-center">
                    <div className="font-semibold">Total Fee</div>
                    <div className="text-xl font-bold">
                      ${coursesData.find((c) => c.id === selectedCourse).fee.toLocaleString()}
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <div className="flex items-center gap-2">
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
                      className="text-gray-400"
                    >
                      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
                      <line x1="16" y1="2" x2="16" y2="6"></line>
                      <line x1="8" y1="2" x2="8" y2="6"></line>
                      <line x1="3" y1="10" x2="21" y2="10"></line>
                    </svg>
                    <span className="text-sm">
                      Due Date:{" "}
                      {new Date(coursesData.find((c) => c.id === selectedCourse).dueDate).toLocaleDateString()}
                    </span>
                  </div>

                  {coursesData.find((c) => c.id === selectedCourse).status === "Paid" && (
                    <div className="flex items-center gap-2">
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
                        className="text-green-600"
                      >
                        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                        <polyline points="22 4 12 14.01 9 11.01"></polyline>
                      </svg>
                      <span className="text-sm">
                        Paid on:{" "}
                        {new Date(coursesData.find((c) => c.id === selectedCourse).paymentDate).toLocaleDateString()}
                      </span>
                    </div>
                  )}

                  {coursesData.find((c) => c.id === selectedCourse).status === "Overdue" && (
                    <div className="flex items-center gap-2">
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
                        className="text-red-600"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <line x1="12" y1="8" x2="12" y2="12"></line>
                        <line x1="12" y1="16" x2="12.01" y2="16"></line>
                      </svg>
                      <span className="text-sm text-red-600">
                        Payment overdue by{" "}
                        {Math.floor(
                          (new Date().getTime() -
                            new Date(coursesData.find((c) => c.id === selectedCourse).dueDate).getTime()) /
                            (1000 * 60 * 60 * 24),
                        )}{" "}
                        days
                      </span>
                    </div>
                  )}
                </div>

                <hr className="my-4" />

                <div className="space-y-3">
                  <h4 className="font-medium">Payment Methods</h4>
                  <div className="grid grid-cols-2 gap-2">
                    <button
                      className={`flex items-center justify-start px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                        coursesData.find((c) => c.id === selectedCourse).status === "Paid"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "hover:bg-gray-50"
                      }`}
                      disabled={coursesData.find((c) => c.id === selectedCourse).status === "Paid"}
                    >
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
                        className="mr-2"
                      >
                        <rect x="1" y="4" width="22" height="16" rx="2" ry="2"></rect>
                        <line x1="1" y1="10" x2="23" y2="10"></line>
                      </svg>
                      Credit Card
                    </button>
                    <button
                      className={`flex items-center justify-start px-4 py-2 border border-gray-300 rounded-md text-sm font-medium ${
                        coursesData.find((c) => c.id === selectedCourse).status === "Paid"
                          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                          : "hover:bg-gray-50"
                      }`}
                      disabled={coursesData.find((c) => c.id === selectedCourse).status === "Paid"}
                    >
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
                        className="mr-2"
                      >
                        <circle cx="12" cy="12" r="10"></circle>
                        <polyline points="12 6 12 12 16 14"></polyline>
                      </svg>
                      Bank Transfer
                    </button>
                  </div>
                </div>
              </div>

              <div className="px-6 py-4 bg-gray-50 border-t border-gray-200 flex flex-col sm:flex-row gap-2">
                {coursesData.find((c) => c.id === selectedCourse).status !== "Paid" && (
                  <button onClick={payNow} className="w-full sm:w-auto px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    Pay Now
                  </button>
                )}
                <button
                  className="w-full sm:w-auto px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  onClick={() => setSelectedCourse(null)}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </main>   
    )
  }
export default PaymentPage;
