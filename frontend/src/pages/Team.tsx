import { Mail, Phone, MoreVertical, MessageSquare } from 'lucide-react';

const members = [
    {
        name: 'Alex Chen',
        role: 'Senior Developer',
        email: 'alex.chen@example.com',
        workload: 85,
        status: 'Online',
        avatar: 'AC'
    },
    {
        name: 'Sarah Miller',
        role: 'Product Designer',
        email: 'sarah.m@example.com',
        workload: 45,
        status: 'Away',
        avatar: 'SM'
    },
    {
        name: 'Ryan Knight',
        role: 'Backend Engineer',
        email: 'ryan.k@example.com',
        workload: 92,
        status: 'Online',
        avatar: 'RK'
    },
    {
        name: 'Lisa Park',
        role: 'QA Specialist',
        email: 'lisa.p@example.com',
        workload: 30,
        status: 'Offline',
        avatar: 'LP'
    },
    {
        name: 'James Doe',
        role: 'Project Manager',
        email: 'james.doe@example.com',
        workload: 60,
        status: 'Online',
        avatar: 'JD'
    },
    {
        name: 'Valerie King',
        role: 'Frontend Dev',
        email: 'valerie.k@example.com',
        workload: 75,
        status: 'Away',
        avatar: 'VK'
    }
];

const Team = () => {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Team Members</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage your team and monitor their current capacity.</p>
                </div>
                <button className="btn-primary">Invite Member</button>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {members.map((member) => (
                    <div key={member.email} className="bg-white rounded-2xl border border-slate-100 shadow-soft p-6 hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
                        <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <div className="w-14 h-14 rounded-2xl bg-primary-100 border-2 border-primary-50 flex items-center justify-center text-primary-700 font-bold text-lg group-hover:scale-110 transition-transform">
                                        {member.avatar}
                                    </div>
                                    <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${member.status === 'Online' ? 'bg-emerald-500' :
                                        member.status === 'Away' ? 'bg-amber-500' : 'bg-slate-300'
                                        }`} />
                                </div>
                                <div className="min-w-0">
                                    <h3 className="text-base font-bold text-slate-900 truncate">{member.name}</h3>
                                    <p className="text-xs font-medium text-slate-500">{member.role}</p>
                                </div>
                            </div>
                            <button className="p-1.5 text-slate-400 hover:text-slate-600 hover:bg-slate-50 rounded-lg transition-colors">
                                <MoreVertical size={18} />
                            </button>
                        </div>

                        <div className="space-y-4">
                            <div>
                                <div className="flex justify-between items-center mb-1.5">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Current Workload</span>
                                    <span className={`text-xs font-bold ${member.workload > 90 ? 'text-rose-600' :
                                        member.workload > 70 ? 'text-amber-600' : 'text-primary-600'
                                        }`}>{member.workload}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-50 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${member.workload > 90 ? 'bg-rose-500' :
                                            member.workload > 70 ? 'bg-amber-500' : 'bg-primary-500'
                                            }`}
                                        style={{ width: `${member.workload}%` }}
                                    />
                                </div>
                            </div>

                            <div className="pt-4 border-t border-slate-50 flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2">
                                    <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                                        <Mail size={18} />
                                    </button>
                                    <button className="p-2 text-slate-400 hover:text-primary-600 hover:bg-primary-50 rounded-xl transition-all">
                                        <Phone size={18} />
                                    </button>
                                </div>
                                <button className="flex-1 flex items-center justify-center gap-2 py-2 bg-slate-50 hover:bg-primary-50 text-slate-600 hover:text-primary-600 rounded-xl text-xs font-bold transition-all">
                                    <MessageSquare size={16} />
                                    Send Message
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Team;
