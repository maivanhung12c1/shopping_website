import { React, useEffect, useState } from "react"
import { login } from "../../utils/auth"
import { useNavigate, Link } from "react-router-dom"
import { useAuthStore } from "../../store/auth"
// import { Link } from 'react-router-dom'


function Login() {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

    useEffect(() => {
        if(isLoggedIn()) {
            navigate('/');
        }
    })
    
    const resetForm = () => {
        setEmail("");
        setPassword("");
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        const {error} = await login(email, password);
        if (error) {
            alert(error);
        } else {
            navigate("/");
            resetForm();
        }
        setIsLoading(false);
    }

    return (
        <section>
            <main className="" style={{marginBottom: 100, marginTop: 50}}>
                <div className="container">
                    {/* Section: Login form */}
                    <section className="">
                        <div className="row d-flex justify-content-center">
                            <div className="col-xl-5 col-md-8">
                                <div className="card-body p-4">
                                    <h3 className="text-center">Đăng nhập</h3>
                                    <br />
                                    <div className="tab-content">
                                        <div
                                            className="tab-pane fade show active"
                                            id="pills-login"
                                            role="tabpanel"
                                            aria-labelledby="tab-login"
                                        >
                                            <form onSubmit={handleLogin}>
                                                {/* Email input */}
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="email">
                                                        Email
                                                    </label>
                                                    <input 
                                                        type="text"
                                                        id="email"
                                                        name="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <div className="form-outline mb-4">
                                                    <label className="form-label" htmlFor="password">
                                                        Mật khẩu
                                                    </label>
                                                    <input 
                                                        type="password"
                                                        id="password"
                                                        name="password"
                                                        value={password}
                                                        onChange={(e) => setPassword(e.target.value)}
                                                        className="form-control"
                                                    />
                                                </div>
                                                <button className="btn btn-primary w-100" type="submit" disabled={isLoading}>
                                                    {isLoading ? (
                                                        <>
                                                            <span className="mr-2">...</span>
                                                            <i className="fas fa-spinner fa-spin" />
                                                        </>
                                                    ) : (
                                                        <>
                                                            <span className="mr-2">Đăng nhập</span>
                                                            <i className="fas fa-sign-in-alt" />
                                                        </>
                                                    )}

                                                </button>
                                                <div className="text-center">
                                                    <p className="mt-4">
                                                        Chưa có tài khoản? <Link to='/register'>Đăng ký</Link>
                                                    </p>
                                                    <p className="mt-0">
                                                        <Link to={"/forgot-password"} className="text-danger">Quên mật khẩu</Link>
                                                    </p>
                                                </div>
                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>

            </main>
        </section>
    )
}

export default Login