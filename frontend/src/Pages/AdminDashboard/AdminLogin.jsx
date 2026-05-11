import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import logo from "../../assets/logo.jpg"
import dams from "../../assets/dams.jpg"
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useDispatch, useSelector } from 'react-redux';
import { adminLogin, clearError } from '../../Redux/admin/adminSlice';

const AdminForm = () => {

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { loading, error, isAuthenticated, profile } = useSelector(state => state.admin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  useEffect(() => {
    if (isAuthenticated) {
      if (profile) {
        // Verify if profile indicates admin - though slice handles it implies success
        navigate("/admin/home");
      }
    }

    if (error) {
      toast.error(error);
      dispatch(clearError());
    }
  }, [isAuthenticated, error, navigate, dispatch, profile]);

  const handleOnSubmitAdmin = (data) => {
    dispatch(adminLogin({
      email: data.email,
      password: data.password
    }));
  }

  const onError = (errors) => {
    Object.values(errors).forEach(error => (
      toast.error(error.message)
    ))
  }

  return (
    <>
      <div className='main flex flex-col md:h-screen h-screen bg-blue-600 w-full md:flex-row md:overflow-y-hidden'>
        <div className='image bg-green-700 w-full md:h-screen'>
          <img className='h-full w-full md:h-screen object-fit ' src={dams} alt="dams college" />
        </div>
        <div className='bg-white w-full h-full md:w-3/4 md:h-screen'>
          <div className='logo'><img className='rounded-full mx-auto w-3/4 h-40 object-cover filter-inverted ' src={logo} alt="dams logo" /></div>
          <h1 className='text-center text-3xl'>Admin Login</h1>
          <form onSubmit={handleSubmit(handleOnSubmitAdmin, onError)} className='px-10 md:p-10 mx-auto'>
            <div className='mx-auto flex flex-col'>
              <label htmlFor="adminName" className='text-black mb-1'>Admin Name</label>
              <input
                {...register('adminName', {
                  required: "Admin Name is required",
                  minLength: { value: 2, message: "Admin Name must be at least 2 characters" }
                })}
                type="text"
                name='adminName'
                id='adminName'
                placeholder='Admin Name'
                className='outline-none p-4 mb-6 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />

              <label htmlFor="email" className='text-black'>Admin Email</label>
              <input
                {...register('email', {
                  required: "Email is required",
                  pattern: { value: /^\S+@\S+$/i, message: "Invalid email address" }
                })}
                type="email"
                name='email'
                id='email'
                placeholder='Enter Your Email'
                className='outline-none p-4 mb-6 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />

              <label htmlFor="password" className='text-black'>Password</label>
              <input
                {...register('password', {
                  required: "Password is required",
                  minLength: { value: 2, message: "Password must be minimum 8 character long " }
                })}
                // type={showPassword ? "text" : "password"}
                type="text"
                name='password'
                id='password'
                placeholder='Password'
                className='outline-none p-4 shadow-lg border-2 border-zinc-400 text-black shadow-red-500/50' />
            </div>

            <button disabled={loading} className='bg-cyan-500 hover:bg-cyan-700 text-white mt-5 py-4 font-bold w-full'>{loading ? "Please wait..." : "Admin Login"}</button>
          </form>
        </div>
      </div>
    </>
  )
}

export default AdminForm