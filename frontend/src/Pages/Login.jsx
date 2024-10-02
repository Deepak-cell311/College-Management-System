import React from 'react'
import FormData from '../Components/FormData'

const Login = () => {
    return (
        <>
            <FormData 
                title = "Login Your Account"
                button = "Log in"
                formType = "login"
                buttonAction = "login"
            />
        </>
    )
}

export default Login