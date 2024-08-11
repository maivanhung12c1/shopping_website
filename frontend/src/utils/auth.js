import { useAuthStore } from "../store/auth";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import Cookies from 'js-cookie';
import apiInstance from "./axios";
import Swal from "sweetalert2";

const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1000,
    timerProgressBar: true,
});

export const login = async (email, password) => {
    try {
        const { data, status } = await apiInstance.post("user/token/", {
            email,
            password
        })

        if (status === 200) {
            setAuthUser(data.access, data.refresh)
        }
        return { data, error: null }
    } catch (error) {
        console.log(error)
        return {
            data: null,
            error: error.reponse.data?.detail || 'Something went wrong'
        };
    }
}

export const register = async (full_name, email, phone, password, password2) => {
    try {
        const { data } = await apiInstance.post('user/register/', {
            full_name,
            email,
            phone,
            password,
            password2
        }) 

        await login(email, password)

        // Alert - Signed up Successfully
        Swal.fire({
            icon: "success",
            title: "Yeahhh",
            text: 'Bạn đã đăng ký thành công',
        });

        return { data, error: null }

    } catch (error) {
        return {
            data: null,
            error: error.response.data || 'Something went wrong'
        };
    }
}

export const logout = () => {
    Cookies.remove("accessToken");
    Cookies.remove("refreshToken");
    useAuthStore.getState().setUser(null)
}

export const setUser = async () => {
    const accessToken = Cookies.get("accessToken")
    const refreshToken = Cookies.get("refreshToken")

    if (!accessToken || !refreshToken) {
        return;
    }

    if (isAccessTokenExpired(accessToken)) {
        const response = await getRefreshToken(refreshToken)
        setAuthUser(response.access, response.refresh)
    } else {
        setAuthUser(accessToken, refreshToken)
    }
}

export const setAuthUser = (accessToken, refreshToken) => {
    Cookies.set('accessToken', accessToken, {
        expires: 1,
        secure: true
    })
    Cookies.set('refreshToken', accessToken, {
        expires: 7,
        secure: true
    })

    const user = jwtDecode(accessToken) ?? null

    if (user) {
        useAuthStore.getState().setUser(user)
    }
    useAuthStore.getState().setLoading(false)
}

export const getRefreshToken = async () => {
    const refreshToken = Cookies.get("refreshToken")
    const response = await apiInstance.post('user/token/refresh/', {
        refresh: refreshToken
    })

    return response.data
}

export const isAccessTokenExpired = (accessToken) => {
    try {
        const decodedToken = jwtDecode(accessToken)
        return decodedToken.exp < Date.now() / 100
    } catch (error) {
        console.log(error)
        return true
    }
}