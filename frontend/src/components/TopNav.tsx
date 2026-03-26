import { Bell, Search, PanelLeft, LayoutGrid } from 'lucide-react';

const TopNav = () => {
    return (
        <header className="h-16 border-b border-slate-100 bg-white flex items-center justify-between px-6 sticky top-0 z-10 shadow-[0_1px_2px_rgba(0,0,0,0.03)]">
            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <PanelLeft size={20} />
                </button>

                <div className="h-4 w-[1px] bg-slate-200 mx-2 hidden sm:block"></div>

                <div className="relative group hidden sm:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-[#0EA5E9] transition-colors" />
                    <input
                        type="text"
                        placeholder="Search..."
                        className="pl-10 pr-4 py-2 bg-slate-50 border border-transparent rounded-xl text-sm focus:outline-none focus:bg-white focus:border-slate-200 w-64 md:w-80 transition-all font-medium placeholder:text-slate-400"
                    />
                </div>

                <button className="sm:hidden p-2 text-slate-400 hover:text-slate-600 rounded-lg transition-colors">
                    <Search size={20} />
                </button>
            </div>

            <div className="flex items-center gap-3">
                <button className="p-2 text-slate-400 hover:text-[#0EA5E9] hover:bg-blue-50 rounded-lg transition-all relative">
                    <Bell size={20} strokeWidth={2} />
                    <span className="absolute top-2.5 right-2.5 w-2 h-2 bg-red-500 rounded-full border-2 border-white animate-pulse"></span>
                </button>

                <div className="h-4 w-[1px] bg-slate-200 mx-2"></div>

                <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                    <LayoutGrid size={20} />
                </button>
            </div>
        </header>
    );
};

export default TopNav;
