import React, { useEffect, useState } from 'react'
import courseModel from "./courseModel.png"
import { Trash2 } from 'lucide-react'



const Notice = () => {
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [noticeTitle, setNoticeTitle] = useState("")
    const [noticeDetail, setNoticeDetail] = useState("")
    const [noticeDate, setNoticeDate] = useState("")
    const [noticeTodo, setNoticeTodo] = useState([])



    const addNoticeData = () => {
        const addNoticeData = [...noticeTodo, { id: Date.now(), text: { noticeTitle: noticeTitle, noticeDetail: noticeDetail, noticeDate: noticeDate } }]
        setNoticeTodo(addNoticeData)
        localStorage.setItem("noticeTodo", JSON.stringify(addNoticeData))
        setNoticeTitle("")
        setNoticeDetail("")
        setNoticeDate("")
    }

    const deleteSubjectTodo = (id) => {
        const updatedTodo = noticeTodo.filter(notice => notice.id !== id);
        setNoticeTodo(updatedTodo);
        localStorage.setItem("noticeTodo", JSON.stringify(updatedTodo));
    };

    useEffect(() => {
        const savedTodos = localStorage.getItem("noticeTodo");
        if (savedTodos) {
            setNoticeTodo(JSON.parse(savedTodos));
        }
    }, []);

    return (
        <>
            <div className='text-black mx-20 w-full '>
                <form className={`modal backdrop-blur-3xl text-black flex flex-col justify-around  border-black-900 shadow-2xl shadow-black-900 mx-auto w-96 mt-6  md:px-0 `}>
                    <div className={`${isModalOpen ? "hidden" : "block"} px-10 mt-10 border-2 border-gray-300 flex flex-col justify-center mx-auto `}>
                        <img className={`mx-auto h-full object-cover `} src={courseModel} alt="add course data" />
                        <label htmlFor="noticeTitle" className='text-xl'>Title</label>
                        <input required type="text" name='noticeTitle' id='noticeTitle' placeholder='Notice title*' value={noticeTitle} onChange={(e) => setNoticeTitle(e.target.value)} className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                        <label htmlFor="noticeDetail" className='text-xl'>Detail</label>
                        <input required type="text" name='noticeDetail' id='noticeDetail' placeholder='Notice detail*' value={noticeDetail} onChange={(e) => setNoticeDetail(e.target.value)} className={`rounded-lg font-5xl mb-5 outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                        <label htmlFor="noticeDate" className='text-xl'>Date</label>
                        <input required type="date" name='noticeDate' id='noticeDate' value={noticeDate} onChange={(e) => setNoticeDate(e.target.value)} className={`rounded-lg font-5xl outline-none border-2 border-gray-900 py-3 px-4 ${isModalOpen ? "hidden" : "block"}`} />
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-0 top-12 cursor-pointer mx-5" onClick={() => setIsModalOpen(true)}>
                            <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
                        </svg>
                        <button className={`bg-cyan-500 hover:bg-cyan-600 p-3 rounded-lg mt-3 mb-3 cursor-pointer`} onClick={() => { if (noticeTitle && noticeDetail) { addNoticeData(); setIsModalOpen(true); } else { alert("First enter the Notice title, Notice detail, Notice date") } }} disabled={!noticeTitle || !noticeDetail || !noticeDate} >Create Notice</button>
                    </div>
                </form>

                {isModalOpen && (<div>
                    <h1 className='text-5xl text-center mb-10'>Notices</h1>
                    <div className='bg-black text-white py-4 px-4 w-full flex justify-between '>
                        <span>Notice Title</span>
                        <span>Notice Detail</span>
                        <span>Notice Date</span>
                        <span>Action</span>
                    </div>
                    <ul className={`text-black`}>
                        {
                            noticeTodo.map((noticeTodos) => (
                                <li className={`flex justify-between text-center mx-auto mt-3 px-7`} key={noticeTodos.id}>
                                    <span className=''>{noticeTodos.text.noticeTitle}</span>
                                    <span className='w-52'>{noticeTodos.text.noticeDetail}</span>
                                    <span className=''>{noticeTodos.text.noticeDate}</span>
                                    <div className='flex'>
                                        <button onClick={() => deleteSubjectTodo(noticeTodos.id)}><Trash2 color="#ff0000" className="h-9 w-9 text-red -my-1 mx-4" /></button>
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

export default Notice


