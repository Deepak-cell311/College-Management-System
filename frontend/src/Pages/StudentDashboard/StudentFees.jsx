import axios from 'axios'
import { format } from 'date-fns'
import React, { useEffect, useState } from 'react'
import { ColorRing } from 'react-loader-spinner'
import { toast } from 'react-toastify'

const StudentFees = () => {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [feesData, setFeesData] = useState([])

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

    useEffect(() => {
        ShowFeesData()
    }, [])

    return (
        <>
            <div>
                <h1 className="tracking-wide mt-10 text-center text-5xl mb-10 font-semibold text-gray-800 dark:text-gray-200"><u>Fees Detail and Payment Status</u></h1>
                <form className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700 overflow-y-scroll">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                            <tr>
                                {["heads", "I Sem", "II Sem", "III Sem", "IV Sem", "V Sem", "VI Sem"].map((row, index) => (
                                    <th key={index} scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>{row}</th>

                                ))}
                            </tr>
                            <tr>
                                {["Time to pay", "Admission", "01 t0 31 Jan, 2025", "01 t0 31 July, 2025", "01 t0 31 Jan, 2026", "01 t0 31 Jan, 2026", "01 t0 31 Jan, 2027"].map((row, index) => (
                                    <th key={index} scope="col" className='px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider'>{row}</th>

                                ))}
                            </tr>
                        </thead>


                        <tbody className="bg-white divide-y divide-gray-200 dark:divide-gray-700 dark:bg-gray-800">
                            {loading ? (
                                <tr>
                                    <td colSpan="5" className="">
                                        <div className="flex justify-center items-center mx-20 h-96">
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

                                        feesData.map((fee, index) => (
                                            <tr key={index} className="border-t hover:bg-gray-100 dark:hover:bg-gray-700 transition duration-200">
                                                <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.heads}</td>
                                                <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester1}/-</td>
                                                <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester2}/-</td>
                                                <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester3}/-</td>
                                                <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester4}/-</td>
                                                <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester5}/-</td>
                                                <td className='px-6 py-4 whitespace-nowrap text-left text-sm text-gray-900 dark:text-gray-200'>{fee.semester6}/-</td>
                                            </tr>
                                        ))
                                    )}
                        </tbody>
                    </table>
                </form>
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

export default StudentFees