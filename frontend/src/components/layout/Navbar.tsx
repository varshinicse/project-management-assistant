import React from 'react';
import { Bell, Search, Plus, User } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-20 bg-white/80 backdrop-blur-xl border-b border-slate-200/60 flex items-center justify-between px-8 sticky top-0 z-20 overflow-hidden">
            {/* Subtle Gradient Top Bar */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-primary"></div>

            <div className="flex items-center gap-6 flex-1 max-w-2xl">
                {/* Search Bar */}
                <div className="relative group w-full">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-all duration-300" />
                    <input
                        type="text"
                        placeholder="Search projects, tasks, or team..."
                        className="w-full pl-11 pr-4 py-2.5 rounded-2xl bg-slate-50 border-transparent focus:bg-white focus:ring-4 focus:ring-primary-500/10 focus:border-primary-500/50 transition-all duration-300 text-sm font-medium outline-none"
                    />
                    <div className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-1">
                        <kbd className="hidden sm:inline-flex h-5 items-center gap-1 rounded border border-slate-200 bg-white px-1.5 font-sans text-[10px] font-bold text-slate-400">
                            <span className="text-xs">⌘</span>K
                        </kbd>
                    </div>
                </div>
            </div>

            <div className="flex items-center gap-4">
                <button className="hidden lg:flex btn-gradient h-10 px-4 text-sm scale-95 hover:scale-100">
                    <Plus size={18} />
                    <span>Create Project</span>
                </button>

                <div className="h-8 w-px bg-slate-200 mx-2 hidden sm:block"></div>

                <div className="flex items-center gap-2">
                    <button className="p-2.5 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all relative group">
                        <Bell size={20} />
                        <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-rose-500 border-2 border-white rounded-full group-hover:scale-110 transition-transform"></span>
                    </button>

                    <button className="flex items-center gap-3 p-1.5 pr-3 rounded-xl hover:bg-slate-50 transition-all group border border-transparent hover:border-slate-100">
                        <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-primary-500 to-indigo-600 text-white flex items-center justify-center font-bold text-sm shadow-sm group-hover:shadow-md transition-all">
                            JD
                        </div>
                        <div className="hidden md:block text-left">
                            <p className="text-xs font-black text-slate-900 leading-none">John Doe</p>
                            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mt-0.5">Administrator</p>
                        </div>
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
