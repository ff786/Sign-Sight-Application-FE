import React from 'react';
import { NavLink } from 'react-router-dom';
import { Home, Zap, Upload, Activity } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200 shadow-sm">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    {/* Logo */}
                    <NavLink to="/" className="flex items-center gap-2 group">
                        <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                            <Activity className="w-6 h-6 text-white" strokeWidth={2.5} />
                        </div>
                        <span className="text-xl font-bold text-gray-900">SignSight</span>
                    </NavLink>

                    {/* Navigation Links */}
                    <div className="flex items-center gap-1">
                        <NavLink
                            to="/"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`
                            }
                        >
                            <Home className="w-4 h-4" />
                            <span className="hidden sm:inline">Home</span>
                        </NavLink>

                        <NavLink
                            to="/real-time"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`
                            }
                        >
                            <Zap className="w-4 h-4" />
                            <span className="hidden sm:inline">Live Detection</span>
                            <span className="sm:hidden">Live</span>
                        </NavLink>

                        <NavLink
                            to="/upload"
                            className={({ isActive }) =>
                                `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                                    isActive
                                        ? 'bg-blue-50 text-blue-600'
                                        : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                                }`
                            }
                        >
                            <Upload className="w-4 h-4" />
                            <span className="hidden sm:inline">Upload</span>
                        </NavLink>
                    </div>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
