import React, { useEffect, useState } from 'react'
import "./admin.css"
import courseModel from "./courseModel.png"
import { Trash2, Plus, X } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';

const AdminCourses = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [courseTodo, setCourseTodo] = useState([])

  const [input, setInput] = useState("")

  const [createCourse, setCreateCourse] = useState(false)
  const navigate = useNavigate()


  const handleCourseButton = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleInformationRoute = (course) => {
    navigate("/admin/courses/information", { state: { 
      courseId: course.id, 
      courseName: course.text,
    } });
  }

  const handleCreateCourses = (e) => {
    e.preventDefault();
    if (input.trim()) {
      const newCourse = {
        id: Date.now(),
        text: input,
      };
      const updatedCourses = [...courseTodo, newCourse]
      setCourseTodo(updatedCourses);
      localStorage.setItem('courseTodo', JSON.stringify(updatedCourses));
      setInput(""); // Clear input
    }
  };

  const deleteTodo = (id) => {
    const updatedTodos = courseTodo.filter((todo) => todo.id !== id);
    setCourseTodo(updatedTodos)
    localStorage.setItem('courseTodo', JSON.stringify(updatedTodos));
  }

  useEffect(() => {
    const savedCourses = localStorage.getItem('courseTodo');
    if (savedCourses) {
      setCourseTodo(JSON.parse(savedCourses));
    }
  }, []);

  return (
    <>
      <div className='bg-white w-full text-black'>
        <div className="courses">
          {isModalOpen && (
            <div className={`addCoursesData ${createCourse ? "hidden" : ""} absolute backdrop-blur-3xl w-full text-black flex flex-col justify-around border-2 border-black-900 shadow-2xl shadow-black-900 px-10 md:px-0`}>
              <img className=' mx-auto h-1/2' src={courseModel} alt="add course data" />
              <form onSubmit={handleCreateCourses} className='flex flex-col'>
                <input required type="text" value={input} onChange={(e) => setInput(e.target.value)} placeholder='Create Course *' className=' mt-10 mb-5 outline-none border-2 border-gray-500-500 py-5 px-4' />
                <button type='submit' className='bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mb-2'>Create Course</button>
                <span className='cursor-pointer absolute right-0 top-0' onClick={() => { handleCourseButton(false) }}><X /></span>
                <button onClick={handleCourseButton} className='bg-red-400 hover:bg-red-500 p-3 rounded-lg'>Go Back</button>
              </form>
            </div>)}

          <div className={`courseTodo ${isModalOpen ? "hidden" : "block"}`}>
            <h1 className='text-5xl py-10 text-zinc-900 text-center font-extrabold'>Courses</h1>
            <ul className='p-10'>
              {courseTodo.map((todo) => (

                <li key={todo.id} className='p-5 list-decimal flex justify-between items-center bg-white border-2 border-black-900 shadow-2xl shadow-black-900 md:px-0 text-3xl mb-2'>
                  {console.log(todo)}
                  <span className="mx-4">{todo.text}</span>
                  <div>
                    <button className='bg-zinc-900 hover:bg-zinc-800 text-white py-1 px-2 mx-3 rounded-lg' onClick={() => handleInformationRoute(todo)}> View </button>
                    <button ><Plus className="h-9 w-9 text-red -my-1 mx-4" /></button>
                    <button onClick={() => deleteTodo(todo.id)}><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" /></button>
                  </div>
                </li>
              ))}
            </ul>
            <button onClick={handleCourseButton} className='bg-purple-600 flex mx-auto hover:bg-purple-700 text-white py-3 px-5 rounded-lg'>Add Course</button>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  )
}

export default AdminCourses