import React from 'react';
import { Link } from 'react-router-dom';
import { HiHome } from 'react-icons/hi';

function PageNotFound() {
    return ( 
        <div className="auth-page">
            <div className="container text-center">
                <div className="bg-primary bg-opacity-10 text-primary d-inline-flex align-items-center justify-content-center rounded-circle mb-4" style={{ width: '120px', height: '120px' }}>
                    <span className="display-1 fw-bold">404</span>
                </div>
                <h1 className="display-4 fw-bold mb-3">Page Not Found</h1>
                <p className="text-muted lead mb-5">Sorry, the page you are looking for does not exist or has been moved.</p>
                <Link to="/" className="btn-location mx-auto" style={{ maxWidth: '240px' }}>
                    <HiHome />
                    Back to Home
                </Link>
            </div>
        </div>
     );
}

export default PageNotFound;