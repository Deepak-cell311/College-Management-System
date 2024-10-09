import React, { useEffect, useState } from 'react'
import "./admin.css"
import courseModel from "./courseModel.png"
import { Trash2, Plus, X } from 'lucide-react';
import { Outlet, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';


const AdminCourses = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const [courseTodo, setCourseTodo] = useState([])

  const [createCourse, setCreateCourse] = useState(false)
  const navigate = useNavigate()

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors }
  } = useForm()

  const onError = (errors) => {
    Object.values(errors).forEach(error => (
      toast.error(error.message)
    ))
  }

  const handleCourseButton = () => {
    setIsModalOpen(!isModalOpen)
  }

  const handleInformationRoute = (course) => {
    navigate("/admin/courses/information", {
      state: {
        courseId: course.id,
        courseName: course.text,
      }
    });
  }


  // Create course
  const handleOnSubmitCourse = async (data) => {
    try {
      const response = await axios.post('http://localhost:5000/Sclass/SclassCreate', {
        sclassName: data.courseName,
      })
      console.log("response: ", response)
      if (response.data) {
        const { sclassName, _id } = response.data
        const courseTodoData = [...courseTodo, { _id: _id, text: sclassName }]
        setCourseTodo(courseTodoData)
        localStorage.setItem("courseTodo", JSON.stringify(courseTodoData))
        reset()
        toast.success("Course Added Successfully")
      } else {
        toast.error(response.data.message)
      }
    } catch (error) {
      toast.error(error)
    }
  }
  console.log(courseTodo)

  // Show the List of courses
  const fetchCourses = async () => {
    try {
      const response = await axios.get("http://localhost:5000/Sclass/SclassList")
      if (Array.isArray(response.data)) {
        console.log("response.data: ", response.data)
        const formattedCourse = response.data.map((course) => ({
          _id: course._id,
          text: course.sclassName
        }))
        setCourseTodo(formattedCourse)
        localStorage.setItem("courseTodo", JSON.stringify(formattedCourse))
      }
    } catch (error) {
      toast.error(error)
    }
  }

  // Delete course from the queue
  const deleteTodo = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/Sclass/Sclass/${id}`)
      if (response.status === 200) {
        const updateCourseTodo = setCourseTodo(courses => courses.filter(course => course._id !== id))
        localStorage.setItem("courseTodo", JSON.stringify(updateCourseTodo));
        return updateCourseTodo;
      }
      toast.success("Course deleted successfully")
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to delete course"}`)
      } else if (error.response) {
        toast.error("An unexpected error occurred")
      }
    }
  }

  useEffect(() => {
    const savedCourses = localStorage.getItem('courseTodo');
    if (savedCourses) {
      try {
        const parsedCourses = JSON.parse(savedCourses);
        setCourseTodo(parsedCourses);
      } catch (error) {
        console.error('Error parsing saved courses:', error);
        setCourseTodo([]);  // Set to empty array if parsing fails
      }
    } else {
      setCourseTodo([]);  // Set to empty array if no saved courses
    }
    fetchCourses()
  }, []);

  return (
    <>
      <div className='bg-zinc-800 w-full text-black'>
        <div className="courses">
          {isModalOpen && (
            <div className={`addCoursesData ${createCourse ? "hidden" : ""} absolute backdrop-blur-3xl w-full text-black flex flex-col justify-around border-2 border-black-900 shadow-2xl shadow-black-900 px-10 md:px-0`}>
              <img className=' mx-auto h-1/2' src={courseModel} alt="add course data" />

              <form onSubmit={handleSubmit(handleOnSubmitCourse, onError)} className='flex flex-col'>
                <label htmlFor="courseName" className='float-left -ml-52 mt-4 mb-4 text-xl text-white'>Course Name</label>
                <input
                  {...register("courseName", {
                    required: "Course Name is Required",
                    minLength: { value: 2, message: "Minimum Two Character is required" }
                  })}
                  type="text"
                  name='courseName'
                  id='courseName'
                  placeholder='Create Course *' Welcome
                  className='mb-5 outline-none border-2 border-gray-500 py-5 px-4' />
                <button className='bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mb-2 '>Create Course</button>
                <span className='cursor-pointer absolute right-0 top-0' onClick={() => { handleCourseButton(false) }}><X /></span>
                <button onClick={handleCourseButton} className='bg-red-400 hover:bg-red-500 p-3 rounded-lg'>Go Back</button>
              </form>

            </div>)}

          <div className={`courseTodo  ${isModalOpen ? "hidden" : "block"}`}>
            <h1 className='text-5xl py-10 text-white text-center font-extrabold'><u>Courses</u></h1>
            <ul className='p-10'>
              {courseTodo.map((todo) => (

                <li key={todo.id} className='p-5 list-decimal flex justify-between items-center bg-zinc-500 border-2 border-black-900 shadow-2xl shadow-black-900 md:px-0 text-3xl mb-2 rounded-2xl border-zinc-900'>
                  {console.log(todo)}
                  <span className="mx-4">{todo.text}</span>
                  <div>
                    <button className='bg-yellow-500 hover:bg-yellow-400 text-black py-1 px-3 mx-3 rounded-lg' onClick={() => handleInformationRoute(todo)}> View </button>
                    <button ><Plus className="h-9 w-9 text-red -my-1 mx-4" /></button>
                    <button ><Trash2 color="white" className="h-9 w-9 text-red -my-1 mx-4" onClick={() => deleteTodo(todo._id)} /></button>
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