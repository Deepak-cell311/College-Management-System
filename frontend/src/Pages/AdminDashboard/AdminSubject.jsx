import React, { useEffect, useState } from 'react'
import courseModel from "./courseModel.png"
import { Trash2 } from 'lucide-react'

const AdminSubject = () => {
  const [subjectName, setSubjectName] = useState("")
  const [subjectCode, setSubjectCode] = useState("")
  const [subjectTodo, setSubjectTodo] = useState([])

  console.log("subjectTodo: ", subjectTodo);

  
  // take student data from the local storage 
  useEffect(() => {
    const subjectTodoData = localStorage.getItem("subjectTodo")
    if (subjectTodoData) {
      const parsedData = JSON.parse(subjectTodoData)
      console.log("parsedData admin subject data: ", parsedData);
      if(Array.isArray(parsedData)){
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
      

        <div className='w-full text-black mt-10 mx-10'>
          <h1 className='text-5xl text-center mb-10'>Add Subject</h1>
          <div className='bg-black text-white py-4 px-4 flex justify-between '>
            <span>Subject Name</span>
            <span>Subject Code</span>
            <span>Session</span>
            <span>Department</span>
            <span>Action</span>
          </div>
          <ul className={`text-black`}>
            {
              subjectTodo.map((subject) => (
                <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={subject.id}>
                  <span className=''>{subject.text.subjectName}</span>
                  <span className='w-52'>{subject.text.subjectCode}</span>
                  <span className='w-52'>{subject.text.subjectSessions}</span>
                  <span className='w-52'>{subject.text.department}</span>
                  <div className='flex'>
                    <button onClick={() => deleteSubjectTodo(subject.id)}><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" /></button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>

        
    </>
  )
}
export default AdminSubject



