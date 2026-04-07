import { useState, useEffect } from 'react';
import {
    Search,
    Filter,
    UserPlus,
    Mail,
    MessageSquare
} from 'lucide-react';
import { CardSkeleton } from '../components/ui/Skeleton';

const members = [
    {
        id: 1,
        name: 'Alice Chen',
        role: 'Senior Developer',
        email: 'alice@pmai.com',
        projects: 3,
        tasksCompleted: 42,
        load: 85,
        status: 'Online'
    },
    {
        id: 2,
        name: 'Bob Smith',
        role: 'Lead Designer',
        email: 'bob@pmai.com',
        projects: 2,
        tasksCompleted: 28,
        load: 60,
        status: 'Busy'
    },
    {
        id: 3,
        name: 'Charlie Davis',
        role: 'Backend Dev',
        email: 'charlie@pmai.com',
        projects: 4,
        tasksCompleted: 15,
        load: 95,
        status: 'Online'
    },
    {
        id: 4,
        name: 'Diana Ross',
        role: 'QA Engineer',
        email: 'diana@pmai.com',
        projects: 5,
        tasksCompleted: 120,
        load: 40,
        status: 'Away'
    }
];

const Team = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div className="space-y-8 pb-10 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage team roles, workload, and performance across projects.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary h-10 px-4 text-sm">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    <button className="btn-primary h-10 px-4 text-sm">
                        <UserPlus size={18} />
                        <span>Invite Member</span>
                    </button>
                </div>
            </div>

            {/* Search & Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-8">
                    {['All Members', 'Active', 'Off-site', 'Contractors'].map((tab, idx) => (
                        <button
                            key={tab}
                            className={`text-sm font-semibold pb-4 -mb-4 transition-all ${idx === 0 ? 'text-primary-600 border-b-2 border-primary-600' : 'text-slate-400 hover:text-slate-600'
                                }`}
                        >
                            {tab}
                        </button>
                    ))}
                </div>
                <div className="relative group max-w-xs w-full">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search team members..."
                        className="input-field pl-10 h-10 text-sm"
                    />
                </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    [1, 2, 3, 4].map(i => <CardSkeleton key={i} />)
                ) : (
                    members.map((member) => (
                        <div key={member.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-6">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-bold overflow-hidden relative">
                                        <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-white rounded-full border-2 border-white flex items-center justify-center translate-x-0.5 translate-y-0.5">
                                            <div className={`w-2 h-2 rounded-full ${member.status === 'Online' ? 'bg-emerald-500' :
                                                member.status === 'Busy' ? 'bg-rose-500' : 'bg-amber-500'
                                                }`}></div>
                                        </div>
                                        {member.name.split(' ').map(n => n[0]).join('')}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                                            {member.name}
                                        </h3>
                                        <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-4 mb-8">
                                <div className="space-y-2">
                                    <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                                        <span>Current Workload</span>
                                        <span className={member.load > 80 ? 'text-rose-500' : 'text-slate-600'}>{member.load}%</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full transition-all duration-1000 ${member.load > 80 ? 'bg-rose-500' : 'bg-primary-600'
                                                }`}
                                            style={{ width: `${member.load}%` }}
                                        ></div>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                                        <div className="text-sm font-bold text-slate-800">{member.projects}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">Projects</div>
                                    </div>
                                    <div className="bg-slate-50 p-2.5 rounded-xl text-center">
                                        <div className="text-sm font-bold text-slate-800">{member.tasksCompleted}</div>
                                        <div className="text-[10px] text-slate-400 font-bold uppercase">Tasks</div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2 pt-4 border-t border-slate-50">
                                <button className="flex-1 btn-secondary h-9 px-0 text-xs gap-1.5">
                                    <Mail size={14} />
                                    <span>Email</span>
                                </button>
                                <button className="flex-1 btn-secondary h-9 px-0 text-xs gap-1.5 hover:text-primary-600 hover:border-primary-100">
                                    <MessageSquare size={14} />
                                    <span>Message</span>
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Team;
