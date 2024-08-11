import React, {useState, useEffect} from 'react'
import { register } from "../../utils/auth"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/auth"
import Swal from 'sweetalert2'

// const Toast = Swal.mixin({
//     toast: true,
//     position: 'center',
//     showConfirmButton: false,
//     // timer: 1000,
//     timerProgressBar: true,
//     confirmButtonColor: true
// });

function Register() {

    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const [isLoading, setIsLoading] = useState(false)
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn)
    const navigate = useNavigate()

    useEffect(() => {
        if (isLoggedIn()) {
            navigate("/")
        }
    }, []);

    const resetForm = () => {
        setFullName('');
        setEmail('');
        setPhone('');
        setPassword('');
        setPassword2('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        setIsLoading(true)

        const {error} = await register(fullName, email, phone, password, password2);
        if (error) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: 'Something went wrong',
            });
        } else {
            navigate("/");
            resetForm();
        }
        setIsLoading(false);
    };

    return (
        <>
            <main className='' style={{marginBottom: 100, marginTop: 50}}>
                <div className='container'>
                    {/* Section: Register form */}
                    <section className=''>
                        <div className='row d-flex justify-content-center'>
                            <div className='col-xl-5 col-md-8'>
                                <div className='card rounded-5'>
                                    <div className='card-body p-4'>
                                        <h3 className='text-center'>Đăng ký</h3>
                                            <br />
                                            <div className='tab-content'>
                                                <div
                                                    className='tab-pane fade show active'
                                                    id='pills-login'
                                                    role='tabpanel'
                                                    aria-labelledby='tab-login'
                                                >
                                                    <form onSubmit={handleSubmit}>
                                                        {/* Fullname input */}
                                                        <div className="form-outline mb-4">
                                                            <label className="form-label" htmlFor="fullname">
                                                                Tên
                                                            </label>
                                                            <input 
                                                                type="text"
                                                                id="fullName"
                                                                onChange={(e) => setFullName(e.target.value)}
                                                                // placeholder='Tên'
                                                                required
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        {/* Email input */}
                                                        <div className="form-outline mb-4">
                                                            <label className="form-label" htmlFor="email">
                                                                Email
                                                            </label>
                                                            <input 
                                                                type="email"
                                                                id="email"
                                                                onChange={(e) => setEmail(e.target.value)}
                                                                // placeholder='Địa chỉ Email'
                                                                required
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        {/* Password input */}
                                                        <div className="form-outline mb-4">
                                                            <label className="form-label" htmlFor="password">
                                                                Mật khẩu
                                                            </label>
                                                            <input 
                                                                type="password"
                                                                id="password"
                                                                onChange={(e) => setPassword(e.target.value)}
                                                                // placeholder='Mật khẩu'
                                                                required
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        {/* Confirm Password input */}
                                                        <div className="form-outline mb-4">
                                                            <label className="form-label" htmlFor="password2">
                                                                Xác nhận mật khẩu
                                                            </label>
                                                            <input 
                                                                type="password"
                                                                id="confirm-password"
                                                                onChange={(e) => setPassword2(e.target.value)}
                                                                // placeholder='Mật khẩu'
                                                                required
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <p className='fw-bold text-danger'>
                                                            {password2 !== password ? 'Mật khẩu không trùng khớp' : ''}
                                                        </p>
                                                        {/* Mobile input */}
                                                        <div className="form-outline mb-4">
                                                            <label className="form-label" htmlFor="phone">
                                                                Số điện thoại
                                                            </label>
                                                            <input 
                                                                type="text"
                                                                id="phone"
                                                                onChange={(e) => setPhone(e.target.value)}
                                                                // placeholder='Số điện thoại'
                                                                required
                                                                className="form-control"
                                                            />
                                                        </div>
                                                        <button className='btn btn-primary w-100' type='submit' disabled={isLoading}>
                                                            {isLoading ? (
                                                                <>
                                                                    <span className='mr-2'>...</span>
                                                                    <i className='fas fa-user-plus' />
                                                                </>
                                                            ) : (
                                                                <>
                                                                    <span className='mr-2'>Đăng ký</span>
                                                                    <i className='fas fa-user-plus' />
                                                                </>
                                                            )}
                                                        </button>
                                                        <div className='text-center'>
                                                            <p className='mt-4'>
                                                                <Link to={'/login'}>Đăng nhập</Link>
                                                            </p>

                                                        </div>
                                                    </form>
                                                </div>

                                            </div>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </section>

                </div>
            </main>
        </>
    )
}

export default Register