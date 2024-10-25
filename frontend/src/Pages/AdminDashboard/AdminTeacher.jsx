import React, { useEffect, useState } from 'react'
import { Trash2 } from 'lucide-react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import axios from 'axios'
import courseModel from "./courseModel.png"

const AdminTeacher = () => {

  const [isModalOpen, setIsModalOpen] = useState(false)
  const navigate = useNavigate()
  const location = useLocation();
  const { courseId, courseName } = location.state || {};
  const { handleSubmit, register, reset } = useForm()
  const onError = (errors) => {
    Object.values(errors).forEach(
      error => { toast.error(error.message) }
    )
  }
  const [subjectTodos, setSubjectTodos] = useState([])

  const addSubjectData = async (data) => {
    try {
      const response = await axios.post(`http://192.168.149.125:5000/Subject/SubjectCreate/${courseId}`, {
        ...data,
        courseId, // Pass courseId here if necessary
      });
      const { _id, subName, subCode, sessions } = response.data;
      setSubjectTodos(previous => [
        ...previous,
        { _id, courseId, text: { subName, subCode, sessions } },
      ]);
      reset();
      toast.success("Subject added successfully");
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while adding the subject");
    }
  };

  const handleSubjectRoute = (subjectTodo) => {
    navigate('/admin/courses/information/subjectInformation', { state: { courseId, courseName, subjectTodo } })
    console.log("subjectTodo idnndnnz: ", subjectTodo)
  }

  // Fetch data from the database
  const fetchSubjectData = async () => {
    try {
      const response = await axios.get('http://192.168.149.125:5000/Subject/AllSubjects');
      console.log("Response data: ", response.data);
      if (Array.isArray(response.data)) {
        const formattedSubjects = response.data.map((subject) => ({
          _id: subject._id,
          courseId: subject.sclassName,
          text: {
            subName: subject.subName,
            subCode: subject.subCode,
            sessions: subject.sessions,
          },
        }));
        setSubjectTodos(formattedSubjects);
      } else {
        toast.info(response.data.message);
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while fetching subjects");
    }
  };

  // Log subjects to check course ID
  subjectTodos.forEach(subject => {
    console.log("Subject ID:", subject._id, "Course ID:", subject.courseId);
  });

  // Filter subjects according to the course 
  const filterSubject = subjectTodos.filter((subject) => subject.courseId === courseId);

  // Delete Subject Data
  const deleteSubjectTodo = async (id) => {
    try {
      const response = await axios.delete(`http://192.168.149.125:5000/Subject/Subject/${id}`);
      if (response.status === 200) {
        setSubjectTodos(prev => prev.filter(subject => subject._id !== id));
        toast.success("Subject deleted successfully");
      }
    } catch (error) {
      if (error.response) {
        toast.error(`Error: ${error.response.data.message || "Failed to delete subject"}`);
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  const handleFormToggle = () => {
    setIsModalOpen(!isModalOpen)
  }

  return (
    <>
      <div className={`modal bg-zinc-900 backdrop-blur-3xl text-black flex flex-col py-20 shadow-2xl shadow-black-900 mx-auto md:px-0 w-full`}>
        <div className='mx-96 bg-white'>
          <form onSubmit={handleSubmit(addSubjectData, onError)} className={`${isModalOpen ? "hidden" : "block"}  border-2  border-gray-300 flex flex-col justify-center mx-auto `}>
            <img className={`mx-auto h-full object-cover`} src={courseModel} alt="add course data" />
            <input {...register("subName", { required: "Subject Name is required", minLength: { value: 2, message: "Minimum 2 character is required" } })} type="text" placeholder='Teacher Name*' className={`rounded-lg font-5xl mt-5 mb-5 outline-none border-2 border-gray-900 py-3 px-4 mx-4  ${isModalOpen ? "hidden" : "block"}`} />
            <input {...register("subCode", { required: "Subject Code is required", minLength: { value: 2, message: "Minimum 2 character is required" } })} type="text" placeholder='Teacher Code*' className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4  mx-4 ${isModalOpen ? "hidden" : "block"}`} />
            <input {...register("sessions", { required: "Subject Session is required", minLength: { value: 1, message: "Minimum 2 character is required" } })} type="text" placeholder='Teacher Sessions*' className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 mx-4   ${isModalOpen ? "hidden" : "block"}`} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-96 top-20 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer mx-4`}  >Create Subject</button>
          </form>
        </div>

        <div className={` ${isModalOpen ? "block" : "hidden"}  mx-5 px-10 `}>
          <h1 className='text-3xl mb-2 text-white'>Teacher List :</h1>
          <table className={`w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400`}>
            <thead className='text-xl text-gray-900  bg-gray-50 dark:bg-gray-700 dark:text-gray-400'>
              <tr>
                <th scope="col" className='px-6 py-3'>Teacher Name</th>
                <th scope="col" className='px-6 py-3'>Teacher Code</th>
                <th scope="col" className='px-6 py-3'>Sessions</th>
                <th scope="col" className='px-6 py-3'>Action</th>
              </tr>
            </thead>
            <tbody>
              {
                filterSubject.map((subjectTodo) => (
                  <tr className={`odd:bg-white odd:dark:bg-gray-400 even:bg-gray-50 even:dark:bg-gray-500 border-b dark:border-gray-700`} key={subjectTodo._id}>
                    <td className='px-6 py-4 text-black font-bold'>{subjectTodo.text.subName}</td>
                    <td className='px-6 py-4 text-black font-bold'>{subjectTodo.text.subCode}</td>
                    <td className='px-6 py-4 text-black font-bold'>{subjectTodo.text.sessions}</td>
                    <td className='px-6 py-4 text-black font-bold flex'>
                      <button className='bg-zinc-900 hover:bg-zinc-800 text-white py-1 px-4 mx-3 rounded-lg' onClick={() => handleSubjectRoute(subjectTodo)}> View </button>
                      <Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4 cursor-pointer" onClick={() => deleteSubjectTodo(subjectTodo._id)} />
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
          <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 absolute bottom-0 mx-96`} onClick={handleFormToggle}>Add Subject</button>
        </div >
      </div>
    </>
  )
}
export default AdminTeacher



