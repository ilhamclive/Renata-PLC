import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useSidebar } from './SidebarContext';
import '../styles/Sidebar.css';

const Sidebar = () => {
    const { isCollapsed, toggleSidebar } = useSidebar();
    const location = useLocation();

    const isActive = (path) => location.pathname === path;

    return (
        <>
            {/* Toggle Button */}
            <button className="toggle-button-outside" onClick={toggleSidebar}>
                {isCollapsed ? '☰' : '✕'}
            </button>

            {/* Sidebar */}
            <div className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
                <div className="sidebar-header"></div>
                <nav>
                    <ul>
                        <li className={isActive('/') ? 'active' : ''}>
                            <Link to="/">
                                <i className="fa fa-home"></i> {!isCollapsed && 'Dashboard'}
                            </Link>
                        </li>
                        <li className={isActive('/chart') ? 'active' : ''}>
                            <Link to="/chart">
                                <i className="fa fa-chart-bar"></i> {!isCollapsed && 'Chart'}
                            </Link>
                        </li>
                        <li className={isActive('/table') ? 'active' : ''}>
                            <Link to="/table">
                                <i className="fa fa-table"></i> {!isCollapsed && 'Table'}
                            </Link>
                        </li>
                        <li className={isActive('/system-erd') ? 'active' : ''}>
                            <Link to="/system-erd">
                                <i className="fa fa-database"></i> {!isCollapsed && 'System ERD'}
                            </Link>
                        </li>
                        <li className={isActive('/data-erd') ? 'active' : ''}>
                            <Link to="/data-erd">
                                <i className="fa fa-sitemap"></i> {!isCollapsed && 'Data ERD'}
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </>
    );
};

export default Sidebar;