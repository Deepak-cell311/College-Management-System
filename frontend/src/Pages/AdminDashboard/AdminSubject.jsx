import React, { useEffect, useState } from 'react'
import courseModel from "./courseModel.png"
import { Trash2 } from 'lucide-react'

const AdminSubject = () => {
  const [isModalOpen, setIsModalOpen] = useState(false)
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

  const addSubjectData = () => {
    const newSubject = {
      id: Date.now(),
      text: { subjectName: subjectName, subjectCode: subjectCode }
    };

    const updatedSubjectTodo = [...subjectTodo, newSubject];
    setSubjectTodo(updatedSubjectTodo);
    localStorage.setItem("subjectTodo", JSON.stringify(updatedSubjectTodo));
    
    // Clear the input fields
    setSubjectName("");
    setSubjectCode("");
  };

  const deleteSubjectTodo = (id) => {
    const updatedSubjectTodo = subjectTodo.filter(subject => subject.id !== id);
    setSubjectTodo(updatedSubjectTodo);
    localStorage.setItem("subjectTodo", JSON.stringify(updatedSubjectTodo));
  };

  return (
    <>
      <div className='text-black mx-auto'>
        <form className={`modal backdrop-blur-3xl text-black flex flex-col justify-around  border-black-900 shadow-2xl shadow-black-900 mx-auto w-96 mt-6  md:px-0 `}>
          <div className={`${isModalOpen ? "hidden" : "block"} px-10 mt-10 border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
            <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
            <label htmlFor="noticeTitle" className='text-xl'>Subject Name</label>
            <input required type="text" name='subjectTitle' id='subjectTitle' placeholder='Subject Name*' value={subjectName} onChange={(e) => setSubjectName(e.target.value)} className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
            <label htmlFor="subjectCode" className='text-xl'>Subject Code</label>
            <input required type="text" name='subjectCode' id='subjectCode' placeholder='Subject Code*' value={subjectCode} onChange={(e) => setSubjectCode(e.target.value)} className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-12 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
              <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
            </svg>
            <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer`} onClick={(e) => { if (subjectName && subjectCode) { e.preventDefault(); addSubjectData(); } else { alert("First enter the Notice title, Notice detail, Notice date") } }} disabled={!subjectName || !subjectCode} >Create Subject</button>
          </div>
        </form>

        {isModalOpen && (<div>
          <h1 className='text-5xl text-center mb-10'>Add Subject</h1>
          <div className='bg-black text-white py-4 px-4 w-full flex justify-between '>
            <span>Subject Name</span>
            <span>Subject Code</span>
            <span>Action</span>
          </div>
          <ul className={`text-black`}>
            {
              subjectTodo.map((subject) => (
                <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={subject.id}>
                  <span className=''>{subject.text.subjectName}</span>
                  <span className='w-52'>{subject.text.subjectCode}</span>
                  <div className='flex'>
                    <button onClick={() => deleteSubjectTodo(subject.id)}><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" /></button>
                  </div>
                </li>
              ))
            }
          </ul>
        </div>)}

        
      </div>
    </>
  )
}
export default AdminSubject



