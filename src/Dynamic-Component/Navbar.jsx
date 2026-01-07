import React from 'react';
import { NavLink } from 'react-router-dom';
import { Hand, Zap, Upload as UploadIcon } from 'lucide-react';

const Navbar = () => {
    return (
        <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 backdrop-blur-xl border-b border-teal-500/20 shadow-2xl shadow-teal-500/10">
            <div className="container mx-auto px-6 h-20 flex items-center justify-between">
                <NavLink to="/" className="flex items-center gap-3 text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-teal-400 to-cyan-400 hover:from-teal-300 hover:to-cyan-300 transition-all">
                    <div className="p-2 bg-gradient-to-br from-teal-500/30 to-cyan-500/30 rounded-xl border border-teal-400/30 hover:border-teal-400/60 transition-all">
                        <Hand className="w-7 h-7 text-teal-400" />
                    </div>
                    <span className="hidden sm:inline">SignSight</span>
                </NavLink>

                <div className="flex items-center gap-1 sm:gap-2">
                    <NavLink
                        to="/"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                isActive
                                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50'
                                    : 'text-slate-300 hover:text-teal-400 hover:bg-slate-800/50'
                            }`
                        }
                    >
                        Home
                    </NavLink>
                    <NavLink
                        to="/real-time"
                        className={({ isActive }) =>
                            `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                isActive
                                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50'
                                    : 'text-slate-300 hover:text-teal-400 hover:bg-slate-800/50'
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
                            `flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                                isActive
                                    ? 'bg-teal-500/20 text-teal-300 border border-teal-500/50'
                                    : 'text-slate-300 hover:text-teal-400 hover:bg-slate-800/50'
                            }`
                        }
                    >
                        <UploadIcon className="w-4 h-4" />
                        <span className="hidden sm:inline">Upload</span>
                    </NavLink>
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
