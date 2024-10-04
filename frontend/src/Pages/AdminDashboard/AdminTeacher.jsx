import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'

const AdminTeacher = () => {

  const [teacherTodo, setTeacherTodo] = useState([])


  
  // take student data from the local storage 
  useEffect(() => {
    const teacherTodoData = localStorage.getItem("teacherTodo")
    if (teacherTodoData) {
      const parsedData = JSON.parse(teacherTodoData)
      console.log("parsedData admin subject data: ", parsedData);
      if(Array.isArray(parsedData)){
        setTeacherTodo(parsedData)
      }
    }
  }, [])

 
  const deleteTeacherTodo = (id) => {
    const updatedTeacherTodo = teacherTodo.filter(teacher => teacher.id !== id);
    setTeacherTodo(updatedTeacherTodo);
    localStorage.setItem("studentTodo", JSON.stringify(updatedTeacherTodo));
  };

  return (
    <>
      

        <div className='w-full text-black mt-10 mx-10'>
          <h1 className='text-5xl text-center mb-10'>Add Student</h1>
          <div className='bg-black text-white py-4 px-4 flex justify-between '>
            <span>Teacher Name</span>
            <span>Teacher Subject</span>
            <span>Teacher Email</span>
            <span>Department</span>
            <span>Action</span>
          </div>
          <ul className={`text-black`}>
            {
              teacherTodo.map((teacher) => (
                <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={teacher.id}>
                  <span className=''>{teacher.text.teacherName}</span>
                  <span className='w-52'>{teacher.text.teacherSubject}</span>
                  <span className='w-52'>{teacher.text.teacherEmail}</span>
                  <span className='w-52'>{teacher.text.teacherDepartment}</span>
                  <div className='flex'>
                    <button onClick={() => deleteTeacherTodo(teacher.id)}><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" /></button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>
    </>
  )
}
export default AdminTeacher



