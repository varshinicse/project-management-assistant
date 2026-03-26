import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import {
    LayoutDashboard,
    Briefcase,
    CheckSquare,
    Users,
    BarChart3,
    Sparkles,
    Settings,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Bot
} from 'lucide-react';

const Sidebar = () => {
    const [collapsed, setCollapsed] = useState(false);

    const navItems = [
        { name: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
        { name: 'Projects', path: '/projects', icon: Briefcase },
        { name: 'Tasks', path: '/tasks', icon: CheckSquare },
        { name: 'Team', path: '/team', icon: Users },
        { name: 'Analytics', path: '/analytics', icon: BarChart3 },
        { name: 'AI Insights', path: '/insights', icon: Sparkles },
        { name: 'Settings', path: '/settings', icon: Settings },
    ];

    const handleLogout = () => {
        localStorage.removeItem('token');
        window.location.href = '/login';
    };

    return (
        <aside
            className={`premium-sidebar flex flex-col h-screen transition-all duration-300 relative z-30 ${collapsed ? 'w-20' : 'w-64'}`}
        >
            {/* Logo Section */}
            <div className="p-6 mb-2">
                <div className="flex items-center gap-3">
                    <div className="bg-primary-600 p-2 rounded-xl text-white shadow-lg shadow-primary-600/20">
                        <Bot size={20} strokeWidth={2.5} />
                    </div>
                    {!collapsed && (
                        <div className="animate-fade-in">
                            <h2 className="text-sm font-bold text-slate-900 leading-none">AI PM</h2>
                            <p className="text-[10px] font-medium text-slate-500 mt-0.5">Assistant</p>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {navItems.map((item) => (
                    <NavLink
                        key={item.name}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center' : ''}`
                        }
                    >
                        {({ isActive }) => (
                            <>
                                <item.icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                                {!collapsed && <span className="animate-fade-in">{item.name}</span>}
                            </>
                        )}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Section */}
            <div className="p-4 mt-auto border-t border-slate-100">
                <button
                    onClick={handleLogout}
                    className={`nav-link w-full text-slate-500 hover:text-rose-600 hover:bg-rose-50 ${collapsed ? 'justify-center' : ''}`}
                >
                    <LogOut size={18} />
                    {!collapsed && <span className="animate-fade-in">Logout</span>}
                </button>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-8 bg-white text-slate-400 rounded-full p-1 shadow-soft border border-slate-200 hover:text-primary-600 hover:border-primary-200 transition-all z-40"
            >
                {collapsed ? <ChevronRight size={12} /> : <ChevronLeft size={12} />}
            </button>
        </aside>
    );
};

export default Sidebar;
