import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const StudentSubject = () => {
  const [subjectTodo, setSubjectTodo] = useState([])


  const fetchSubjectData = async () => {
    // Retrieve student data from localStorage
    const studentData = localStorage.getItem("Student");
    if (!studentData) {
      toast.error("No student data found. Please log in.");
      return;
    }

    const student = JSON.parse(studentData);
    const sclassName = student.sclassName?._id;

    try {
      const response = await axios.get(`http://localhost:5000/Subject/ClassSubjects/${sclassName}`);
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((subject) => ({
          id: subject._id,
          text: {
            subjectName: subject.subName,
            subjectCode: subject.subCode,
            subjectSessions: subject.sessions,
          },
        }));
        setSubjectTodo(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while fetching subjects");
    }
  };


  useEffect(() => {
    fetchSubjectData()
  })

  console.log(subjectTodo)
  return (
    <>


      <div className='w-full bg-zinc-800 '>
        <div className='mx-10'>
          <h1 className='text-5xl text-center mb-10 mt-10'><u>All Subject</u></h1>
          <table className={`w-full text-sm text-left  rtl:text-right text-gray-500 dark:text-gray-400`}>
            <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope="col" className='px-6 py-3'>Subject Name</th>
                <th scope="col" className='px-6 py-3'>Subject Code</th>
                <th scope="col" className='px-6 py-3'>Session</th>
              </tr>
            </thead>
            <tbody>
              {
                subjectTodo.map((subject) => (
                  <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={subject.id}>
                    <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectName}</th>
                    <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectCode}</th>
                    <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectSessions}</th>
                  </tr>
                ))
              }
            </tbody>
          </table >
        </div >
      </div>


    </>
  )
}

export default StudentSubject