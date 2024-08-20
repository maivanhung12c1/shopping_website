import React from "react";

function StoreFooter() {
    return (
        <div>
            <footer className="bg-light text-center text-lg-start">
                {/* Grid container */}
                <div className="container-fluid p-4">
                    <div className="col-md-6 mb-4 mb-md-0 d-flex justify-content-center justify-content-md-start align-items-center">
                        <strong>Kết nối với chúng tôi qua các mạng xã hội</strong>
                    </div>
                    <div className="col-md-6 d-flex justify-content-center justify-content-md-end">
                        {/* FB */}
                        <a href="#"
                            className="btn btn-primary btn-sm btn-floating me-2"
                            style={{ backgroundColor: '#3b5998' }}
                            role="button"
                        >
                            <i className="fab fa-facebook-f"/>
                        </a>
                        {/* X */}
                        <a href="#"
                            className="btn btn-primary btn-sm btn-floating me-2"
                            style={{ backgroundColor: '#55acee' }}
                            role="button"
                        >
                            <i className="fab fa-twitter"/>
                        </a>
                        {/* Pinterest */}
                        <a href="#"
                            className="btn btn-primary btn-sm btn-floating me-2"
                            style={{ backgroundColor: '#3b5998' }}
                            role="button"
                        >
                            <i className="fab fa-pinterest"/>
                        </a>
                        {/* Youtube */}
                        <a href="#"
                            className="btn btn-primary btn-sm btn-floating me-2"
                            style={{ backgroundColor: '#3b5998' }}
                            role="button"
                        >
                            <i className="fab fa-youtube"/>
                        </a>
                        {/* Instagram */}
                        <a href="#"
                            className="btn btn-primary btn-sm btn-floating me-2"
                            style={{ backgroundColor: '#3b5998' }}
                            role="button"
                        >
                            <i className="fab fa-instagram"/>
                        </a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default StoreFooter;