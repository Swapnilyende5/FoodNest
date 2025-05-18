import React from "react";
import "./index.scss"

const Layout = ({ children }) => {
    return (
        <div className="layout-wrapper">
            <main className="main-content">
                {children}
            </main>
        </div>
    );
};

export default Layout;
