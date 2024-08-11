import React, {useEffect} from 'react'
import { logout } from '../../utils/auth'
import { Link } from 'react-router-dom'


function Logout() {
    useEffect(() => {
        logout()
    }, [])
    return (
        <>
            <section>
                <main className='' style={{marginBottom: 100, marginTop: 50}}>
                    <div className='container'>
                        <section className=''>
                            <div className='row d-flex justify-content-center'>
                                <div className='col-xl-5 col-md-8'>
                                    <div className='card rounded-5'>
                                        <div className='card-body p-4'>
                                            <h3 className='text-center'>Bạn đã đăng xuất</h3>
                                            <div className='d-flex justify-content-center'>
                                                <Link to={'/login'} className='btn btn-primary me-2'>Đăng nhập <i className='fas fa-sign-in-alt'/></Link>
                                                <Link to={'/register'} className='btn btn-primary me-2'>Đăng ký <i  className='fas fa-user-plus'/></Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                            </div>
                        </section>
                    </div>

                </main>
            </section>
        </>
    )
}

export default Logout