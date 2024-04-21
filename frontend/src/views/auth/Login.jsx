import { React, useEffect, useState } from "react"
import { login } from "../../utils/auth"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/auth"


function Login() {
    const [username, setUsername] = useState()
    navigate = useNavigate()
    return (
        <div>
            <h2>
                Welcome back
            </h2>
        </div>
    )
}

export default Login