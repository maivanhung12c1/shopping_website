import { useState, useEffect, useContext } from "react";
import { useAuthStore } from "../../store/auth";
import { Link } from "react-router-dom";
import { CartContext } from "../plugin/Context";
import { useNavigate } from "react-router-dom";


function StoreHeader() {
    const cartCount = useContext(CartContext);
    const [search, setSearch] = useState('');

    const [isLoggedIn, user] = useAuthStore((state) => [
        state.isLoggedIn,
        state.user,
    ]);

    const navigate = useNavigate();

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleSearchSubmit = () => {
        navigate(`/search?query=${search}`);
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
                <div className="container">
                    <Link className="navbar-brand" to='/'>Mai Van Hung</Link>
                    <button>
                        <span className="navbar-toggler-icon" />
                    </button>
                    <div className="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle='dropdown' aria-expanded='false'>
                                    Tài khoản
                                </a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={'/customer/account/'} className="dropdown-item"><i className="fas fa-user"></i> Tài khoản </Link></li>
                                    <li><Link to={'/customer/orders/'} className="dropdown-item"><i className="fas fa-shopping"></i> Giỏ hàng </Link></li>
                                    <li><Link to={'/customer/wishlist/'} className="dropdown-item"><i className="fas fa-heart"></i> Wishlist </Link></li>
                                    <li><Link to={'/customer/notifications/'} className="dropdown-item"><i className="fas fa-bell fa-shake"></i> Thông báo </Link></li>
                                    <li><Link to={'/customer/settings/'} className="dropdown-item"><i className="fas fa-gear fa-spin"></i> Cài đặt </Link></li>
                                </ul>

                            </li>
                            <li className="nav-item dropdown">
                                <a href="#" className="nav-link dropdown-toggle" id="navbarDropdown" role="button" data-bs-toggle='dropdown' aria-expanded='false'>Vendor</a>
                                <ul className="dropdown-menu" aria-labelledby="navbarDropdown">
                                    <li><Link to={'/vendor/dashboard/'} className="dropdown-item"><i className="fas fa-user"></i> Dashboard  </Link></li>
                                    <li><Link to={'/vendor/products/'} className="dropdown-item"><i className="bi bi-grid-fill"></i> Sản phẩm </Link></li>
                                    <li><Link to={'/vendor/products/new/'} className="dropdown-item"><i className="fas fa-plus-circle"></i> Thêm sản phẩm </Link></li>
                                    <li><Link to={'/vendor/orders/'} className="dropdown-item"><i className="fas fa-shopping-cart"></i> Giỏ hàng </Link></li>
                                    <li><Link to={'/vendor/earning/'} className="dropdown-item"><i className="fas fa-dollar-sign"></i> Số dư </Link></li>
                                    <li><Link to={'/vendor/reviews/'} className="dropdown-item"><i className="fas fa-start"></i> Reviews </Link></li>
                                    <li><Link to={'/vendor/coupon/'} className="dropdown-item"><i className="fas fa-tag"></i> Coupon </Link></li>
                                    <li><Link to={'/vendor/notifications/'} className="dropdown-item"><i className="fas fa-bell fa-shake"></i> Thông báo </Link></li>
                                    <li><Link to={'/vendor/settings/'} className="dropdown-item"><i className="fas fa-gear fa-spin"></i> Cài đặt </Link></li>
                                </ul>
                            </li>
                        </ul>
                        <div className="d-flex">
                            <input type="text" name="search" className="form-control me-2" onChange={handleSearchChange} placeholder="Tìm kiếm" aria-label="Search"/>
                            <button onClick={handleSearchSubmit} className="btn btn-outline-success me-2" type="submit">Tìm kiếm</button>                            
                        </div>
                        {
                            isLoggedIn()
                            ?
                            <>
                                <Link className="btn btn-primary me-2" to={'customer/account/'}>Tài khoản</Link>
                                <Link className="btn btn-primary me-2" to='/logout'>Đăng xuất</Link>
                            </>
                            :
                            <>
                                <Link className="btn btn-primary me-2" to='/login'>Đăng nhập</Link>
                                <Link className="btn btn-primary me-2" to='/register'>Đăng ký</Link>
                            </>
                        }
                        <Link to={'/cart/'} className="btn btn-danger"><i className="fas fa-shopping-cart"></i> <span id="cart-total-items">{cartCount || 0}</span> </Link>
                    </div>
                </div>

            </nav>
        </div>
    );
};

export default StoreHeader;