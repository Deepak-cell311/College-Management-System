import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import logo from "../assets/logo.jpg"
import dams from "../assets/dams.jpg"



const FormData = ({ title, button, formType }) => {

    const navigate = useNavigate()
    const [showPassword, setShowPassword] = useState(false)
    
    const getLinkto = () => {
        // || formType === "register" || formType === "admin")
        if(formType === "login" ){    
                return "/dashboard"
        } else if(formType === "register"){
            return "/login"
        }else if(formType === "admin"){
            return "/admin"
        }
    }

    const handleOnSubmit = (e) => {
        e.preventDefault()
        const path = getLinkto()
        navigate(path)
    }
    const handlePassword = () => {
        setShowPassword(!showPassword)
    }

    return (
        <>
            <div className='main flex flex-col md:h-screen h-screen bg-blue-600 w-full md:flex-row md:overflow-y-hidden'>
                <div className='image bg-green-700 w-full md:h-screen'>
                    <img className='h-full w-full md:h-screen object-fit ' src={dams} alt="dams college" />
                </div>
                <div className='bg-white w-full h-full md:w-3/4 md:h-screen'>
                    <div className='logo'><img className='rounded-full mx-auto w-3/4 h-40 object-cover filter-inverted ' src={logo} alt="dams logo" /></div>
                    <h1 className='text-center text-3xl'>{title}</h1>
                    <form onSubmit={handleOnSubmit} className='px-10 md:p-10 mx-auto'>
                        <div className='mx-auto flex flex-col'>
                            <label htmlFor="rollNumber" className='text-black mb-1'>User-ID/ Student-ID/ Roll Number</label>
                            <input type="text" placeholder='User-ID/ Student-ID/ Roll Number' className='outline-none p-4 mb-6 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />
                            <label htmlFor="password" className='text-black'>Password</label>
                            <input type={showPassword ? "text" : "password"} name='password' id='password' placeholder='Password' className='outline-none p-4 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />
                            <button type='button' onClick={handlePassword}>
                                {showPassword ? <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-14 bottom-56">
                                    <path d="M3.53 2.47a.75.75 0 0 0-1.06 1.06l18 18a.75.75 0 1 0 1.06-1.06l-18-18ZM22.676 12.553a11.249 11.249 0 0 1-2.631 4.31l-3.099-3.099a5.25 5.25 0 0 0-6.71-6.71L7.759 4.577a11.217 11.217 0 0 1 4.242-.827c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113Z" />
                                    <path d="M15.75 12c0 .18-.013.357-.037.53l-4.244-4.243A3.75 3.75 0 0 1 15.75 12ZM12.53 15.713l-4.243-4.244a3.75 3.75 0 0 0 4.244 4.243Z" />
                                    <path d="M6.75 12c0-.619.107-1.213.304-1.764l-3.1-3.1a11.25 11.25 0 0 0-2.63 4.31c-.12.362-.12.752 0 1.114 1.489 4.467 5.704 7.69 10.675 7.69 1.5 0 2.933-.294 4.242-.827l-2.477-2.477A5.25 5.25 0 0 1 6.75 12Z" />
                                </svg> : <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="size-6 absolute right-14 bottom-56">
                                    <path d="M12 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6Z" />
                                    <path fillRule="evenodd" d="M1.323 11.447C2.811 6.976 7.028 3.75 12.001 3.75c4.97 0 9.185 3.223 10.675 7.69.12.362.12.752 0 1.113-1.487 4.471-5.705 7.697-10.677 7.697-4.97 0-9.186-3.223-10.675-7.69a1.762 1.762 0 0 1 0-1.113ZM17.25 12a5.25 5.25 0 1 1-10.5 0 5.25 5.25 0 0 1 10.5 0Z" clipRule="evenodd" />
                                </svg>
                                }
                            </button>
                            {formType === "register" && (
                                <>
                                    <div className='mt-5'>
                                        <input type="checkbox" name='checkbox' id='checkbox' required />
                                        <label htmlFor="checkbox" className='text-black mx-2 mt-3'>By clicking Reset Password, you agree to our <a href="/register" className='text-cyan-500'>Terms</a> and that you have read our <a href="/register" className='text-cyan-500'>Data Policy</a>, including our <a href="/register" className='text-cyan-500'>Cookie</a> Use.</label>
                                    </div>
                                </>
                            )}
                            <Link to={getLinkto()}><button className='bg-cyan-500 hover:bg-cyan-700 text-white mt-5 py-4 font-bold w-full'>{button}</button></Link>
                            {formType === "register" && (<span className='text-black italic font-semibold mt-8'>Remember Password <Link to="/login" className='text-cyan-500'>Click here</Link> to login.</span>)}
                            {formType === "login" && (
                                <>
                                    <button className={` bg-red-500 hover:bg-red-700 text-white mt-4 py-3 font-bold`}>Forget Password</button>
                                    <Link to="/register"><button className={`bg-cyan-500 hover:bg-cyan-700 text-white mt-1 py-4 font-bold w-full`}>Create New User (New Addmission)</button></Link>
                                </>
                            )}
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}
export default FormData