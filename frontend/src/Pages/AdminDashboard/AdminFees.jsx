import React, { useState } from "react";
import { ColorRing } from 'react-loader-spinner'
import { Search, Trash2 } from 'lucide-react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";


const AdminFees = () => {
    const [studentTodo, setStudentTodo] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [filteredStudents, setFilteredStudents] = useState([]);
    const [searchQuery, setSearchQuery] = useState("");

    const navigate = useNavigate();
    const handleView = (student) => {
        navigate("/admin/students", {
            state: {
                showStudentData: student,
                subjectData: { text: { sessions: 10, subName: "Subject Name" } },
            },
        });
    };

    const deleteStudent = async (id) => {
        try {
            await axios.delete(`https://college-management-system-s6xa.onrender.com/Student/Student/${id}`);
            setStudentTodo((prev) => prev.filter((student) => student._id !== id));
            setFilteredStudents((prev) => prev.filter((student) => student._id !== id));
            toast.success("Student deleted successfully");
        } catch (error) {
            console.error(error);
            toast.error("An error occurred while deleting the student.");
        }
    };

    return (

        <>
            <div>
                <h1 className="tracking-wide mt-10 text-center text-5xl mb-10 font-semibold text-gray-800 dark:text-gray-200"><u>Fees Detail and Payment Status</u></h1>
                <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">Heads</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">I Sem.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">II Sem.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">III Sem.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">IV Sem.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">IV Sem.</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">VI Sem.</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="text-center">
                                        <div className="flex justify-center items-center h-96">
                                            <ColorRing visible={true} height="80" width="80" ariaLabel="loading" colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']} />
                                        </div>
                                    </td>
                                </tr>
                            ) :
                                error ? (
                                    <tr>
                                        <td colSpan="5" className="text-center text-red-500">{error}</td>
                                    </tr>
                                ) :
                                    (
                                        filteredStudents.map((student, index) => (
                                            <tr className="hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200" key={student._id}>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{index + 1 || "N/A"}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{student.name}</td>
                                                <td className="px-6 py-4 text-sm text-gray-900 dark:text-gray-200">{student.rollNum}</td>
                                                <td className="px-6 py-4">
                                                    <div className="flex items-center space-x-4">
                                                        <button
                                                            className="bg-cyan-500 hover:bg-cyan-600 text-white font-semibold px-4 py-2 rounded-lg transition duration-300"
                                                            onClick={() => handleView(student)}
                                                        >
                                                            View
                                                        </button>
                                                        <button
                                                            className="bg-red-600 hover:bg-red-500 text-white py-2 px-3 rounded-lg"
                                                            onClick={() => deleteStudent(student._id)}
                                                        >
                                                            <Trash2 className="w-5 h-5" />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))
                                    )}
                        </tbody>
                    </table>
                </div>
                <div className="mt-5">
                    <span className="text-3xl mb-4 font-extrabold"><u>Note: </u></span>
                    <ul className="fees-note mt-4 py-4 text-gray-300">
                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>1. </strong></span>
                            Cheques will not be accepted. Fees to be paid through Draft / Cash / NEFT / IMPS* in favour of <strong>"Dayanand Academy Of Management Studies"</strong> Indian Bank Saket Nagar Kanpur A/c No. <strong>744583315</strong>, <strong>IFS Code: IDIB000S150* .</strong> Kindly submit NEFT/IMPS transaction ID with fee booklet in the office.
                        </li>

                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>2. </strong></span>
                            If there is a holiday on the last day the next working day will be considered as the last day.
                        </li>

                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>3. </strong></span>
                            Annual University Examination or any other fee of CSJMU will be directly submitted by the student to the university or to the institute as per directions of the CSJMU before the commencement of University Semester Examination. The examination fee is decided by the CSJMU from time to time and is not inclusive in above semester fees.
                        </li>

                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>4. </strong></span>
                            The students who are in the category of UFM / Year Back / Carry Over will be required to contact the office regarding there status for depositing there extra university fees.
                        </li>

                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>5. </strong></span>
                            The security amount will be deposited will be refunded to passed out students of that particular year only from <u><strong>1 Jan. to 31 March</strong></u> of that particular succeeding year. The security of the drop out / fail students will be forfeited.
                        </li>

                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>6. </strong></span>
                            <u><strong>Late fee / Fine charges Rs. 20 as per day after due date.</strong></u> (Fine will be paid at admission office).
                        </li>

                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>7. </strong></span>
                            Fees of any nature once deposite will not be refunded.
                        </li>

                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>8. </strong></span>
                            As per CSJM University norms <u><strong>University Registration By The Candidate is mandatory </strong></u>for taking admission, without Registration Admission stand cancelled.
                        </li>

                        <li className="border-2 border-gray-300 p-4 bg-gray-800 mb-2">
                            <span className="text-gray-200"><strong>9. </strong></span>
                            If the candidate is interested to avail the <u><strong>SCHOLARSHIP</strong></u> which is for the weaker section of the society, provided by the <u><strong>SAMAJ-KALYAN DEPARTMENT</strong></u> of U.P. candidate has to follow the process of admission as defined by the <strong>State Government / Concerned University. (CSJM University, Kanpur for B.B.A / B.C.A)</strong>
                            <br />
                            <span className="text-gray-200 mx-10 pt-10"><strong>1. </strong></span>
                            MBA / MCA ------------------ UPCET affiliated from <strong>AKTU University, Lucknow</strong>
                            <br /><span className="text-gray-200 mx-10 pt-10"><strong>2. </strong></span>
                            MBA / MCA ------------------ <strong>CSJM University, Kanpur</strong>
                        </li>

                    </ul>
                </div>
            </div>
        </>
    )

}

export default AdminFees