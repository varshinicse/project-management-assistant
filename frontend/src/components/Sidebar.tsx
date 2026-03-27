import React from 'react';
import {
    LayoutDashboard,
    Briefcase,
    CheckSquare,
    Users,
    BarChart3,
    BrainCircuit,
    Settings,
    LogOut,
    ChevronLeft,
    ChevronRight,
    Bot
} from 'lucide-react';
import { NavLink } from 'react-router-dom';

interface SidebarProps {
    collapsed: boolean;
    setCollapsed: (collapsed: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ collapsed, setCollapsed }) => {
    const navItems = [
        { icon: LayoutDashboard, label: 'Dashboard', path: '/dashboard' },
        { icon: Briefcase, label: 'Projects', path: '/projects' },
        { icon: CheckSquare, label: 'Tasks', path: '/tasks' },
        { icon: Users, label: 'Team', path: '/team' },
        { icon: BarChart3, label: 'Analytics', path: '/analytics' },
        { icon: BrainCircuit, label: 'AI Insights', path: '/insights' },
    ];

    return (
        <aside
            className={`premium-sidebar flex flex-col h-screen transition-all duration-300 relative z-30 ${collapsed ? 'w-20' : 'w-[260px]'}`}
        >
            {/* Logo Section */}
            <div className="p-8 mb-4">
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        {/* Decorative Gradient Circle */}
                        <div className="absolute -inset-1 bg-gradient-primary rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-300"></div>
                        <div className="relative bg-white p-3 rounded-2xl shadow-sm text-primary-600 animate-float">
                            <Bot size={24} strokeWidth={2.5} />
                        </div>
                    </div>
                    {!collapsed && (
                        <div className="animate-fade-in">
                            <span className="block text-lg font-black text-slate-900 tracking-tighter uppercase leading-none">AI PM</span>
                            <span className="block text-xs font-bold text-primary-600 uppercase tracking-widest mt-1">Assistant</span>
                        </div>
                    )}
                </div>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => (
                    <NavLink
                        key={item.path}
                        to={item.path}
                        className={({ isActive }) =>
                            `nav-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : 'px-5 py-3.5'}`
                        }
                    >
                        <div className={`p-1.5 rounded-lg transition-colors ${collapsed ? '' : 'group-hover:bg-white/50'}`}>
                            <item.icon size={20} className="shrink-0" />
                        </div>
                        {!collapsed && <span className="truncate tracking-tight">{item.label}</span>}
                    </NavLink>
                ))}
            </nav>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-slate-200/50 space-y-2">
                <NavLink
                    to="/settings"
                    className={({ isActive }) =>
                        `nav-link ${isActive ? 'active' : ''} ${collapsed ? 'justify-center px-0' : 'px-5 py-3.5'}`
                    }
                >
                    <Settings size={20} className="shrink-0" />
                    {!collapsed && <span>Settings</span>}
                </NavLink>
                <button className={`nav-link w-full text-rose-500 hover:text-rose-600 hover:bg-rose-50/50 ${collapsed ? 'justify-center px-0' : 'px-5 py-3.5'}`}>
                    <LogOut size={20} className="shrink-0" />
                    {!collapsed && <span>Logout</span>}
                </button>
            </div>

            {/* Toggle Button */}
            <button
                onClick={() => setCollapsed(!collapsed)}
                className="absolute -right-3 top-24 bg-white border border-slate-200 rounded-full p-1.5 shadow-soft text-slate-400 hover:text-primary-600 hover:border-primary-200 transition-all z-40 hover:scale-110"
            >
                {collapsed ? <ChevronRight size={14} /> : <ChevronLeft size={14} />}
            </button>
        </aside>
    );
};

export default Sidebar;
