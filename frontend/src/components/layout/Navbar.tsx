import { Bell, Search, Plus } from 'lucide-react';

const Navbar = () => {
    return (
        <header className="h-16 border-b border-slate-200/60 bg-white/80 backdrop-blur-md flex items-center justify-between px-8 sticky top-0 z-20">
            <div className="flex items-center gap-6 flex-1">
                {/* Search Bar */}
                <div className="relative group max-w-md w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search projects, tasks, or team..."
                        className="input-field pl-10 h-10 text-sm"
                    />
                </div>
            </div>

            <div className="flex items-center gap-4">
                {/* Create Button */}
                <button className="btn-primary h-10 px-4 text-sm hidden md:flex">
                    <Plus size={18} />
                    <span>Create Project</span>
                </button>

                {/* Notifications */}
                <button className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-lg transition-all relative">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-rose-500 rounded-full border-2 border-white"></span>
                </button>

                <div className="h-6 w-[1px] bg-slate-200 mx-1"></div>

                {/* Profile */}
                <button className="flex items-center gap-3 pl-2 group">
                    <div className="w-8 h-8 rounded-full bg-primary-100 border border-primary-200 flex items-center justify-center text-primary-700 text-xs font-bold group-hover:ring-4 group-hover:ring-primary-50 transition-all">
                        JD
                    </div>
                </button>
            </div>
        </header>
    );
};

export default Navbar;
