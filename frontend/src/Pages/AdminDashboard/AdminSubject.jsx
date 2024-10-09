import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

const AdminSubject = () => {

  const [subjectTodo, setSubjectTodo] = useState([])

  console.log("subjectTodo: ", subjectTodo);


  // take student data from the local storage 
  useEffect(() => {
    const subjectTodoData = localStorage.getItem("subjectTodo")
    if (subjectTodoData) {
      const parsedData = JSON.parse(subjectTodoData)
      console.log("parsedData admin subject data: ", parsedData);
      if (Array.isArray(parsedData)) {
        setSubjectTodo(parsedData)
      }
    }
  }, [])


  const deleteSubjectTodo = (id) => {
    const updatedSubjectTodo = subjectTodo.filter(subject => subject.id !== id);
    setSubjectTodo(updatedSubjectTodo);
    localStorage.setItem("subjectTodo", JSON.stringify(updatedSubjectTodo));
  };

  return (
    <>


      <div className='w-full bg-zinc-800'>
        <h1 className='text-5xl text-center mb-10 mt-10'>Add Subject</h1>
        <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
          <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
            <th scope="col" className='px-6 py-3'>Subject Name</th>
            <th scope="col" className='px-6 py-3'>Subject Code</th>
            <th scope="col" className='px-6 py-3'>Session</th>
            <th scope="col" className='px-6 py-3'>Department</th>
            <th scope="col" className='px-6 py-3'>Action</th>
          </thead>

          <tbody>
            {
              subjectTodo.map((subject) => (
                <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={subject.id}>
                  <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectName}</th>
                  <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectCode}</th>
                  <th className='px-6 py-4 text-black font-bold'>{subject.text.subjectSessions}</th>
                  <th className='px-6 py-4 text-black font-bold'>{subject.text.department}</th>
                  <th className='px-6 py-4 text-black font-bold'><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" onClick={() => deleteSubjectTodo(subject.id)}/></th>
                </tr>
              ))
            }
          </tbody>
        </table >
      </div >


    </>
  )
}
export default AdminSubject



