import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { toast } from 'react-toastify';
import axios from 'axios';

const AdminSubject = () => {

  const [subjectTodo, setSubjectTodo] = useState([])

  const fetchSubjectData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/Subject/AllSubjects');
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((subject) => ({
          id: subject._id, 
          text: {
            subjectName: subject.subName,
            subjectCode: subject.subCode,
            subjectSessions: subject.sessions,
            department: subject.department 
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

  const deleteSubjectTodo = (id) => {
    const updatedSubjectTodo = subjectTodo.filter(subject => subject.id !== id);
    setSubjectTodo(updatedSubjectTodo);
    toast.success("Subject deleted successfully!");
  };

  useEffect(() => {
    fetchSubjectData()
  })
  console.log("subjectTodo", subjectTodo)

  return (
    <>


      <div className='w-full bg-zinc-800 '>
        <div className='mx-5'>
        <h1 className='text-5xl text-center mb-10 mt-10'>All Subject</h1>
        <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400 `}>
          <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <tr>
              <th scope="col" className='px-6 py-3'>Subject Name</th>
              <th scope="col" className='px-6 py-3'>Subject Code</th>
              <th scope="col" className='px-6 py-3'>Session</th>
              <th scope="col" className='px-6 py-3'>Action</th>
            </tr>
          </thead>
          <tbody>
            {
              subjectTodo.map((subject) => (
                <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={subject.id}>
                  <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectName}</th>
                  <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectCode}</th>
                  <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectSessions}</th>
                  <th className='px-6 py-4 text-black font-bold'><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" onClick={() => deleteSubjectTodo(subject.id)} /></th>
                </tr>
              ))
            }
          </tbody>
        </table >
        </div>
      </div >


    </>
  )
}
export default AdminSubject



