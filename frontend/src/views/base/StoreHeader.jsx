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

                                </ul>

                            </li>

                        </ul>

                    </div>
                </div>

            </nav>
        </div>
    )
}