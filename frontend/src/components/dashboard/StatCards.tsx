import {
    ArrowUpRight,
    ArrowDownRight,
    Briefcase,
    CheckSquare,
    Clock,
    Users,
    TrendingUp
} from 'lucide-react';

const stats = [
    {
        label: 'Total Projects',
        value: '12',
        trend: '+2.5%',
        trendUp: true,
        icon: Briefcase,
        color: 'text-indigo-600',
        bg: 'bg-indigo-50/50'
    },
    {
        label: 'Tasks Completed',
        value: '128',
        trend: '+14%',
        trendUp: true,
        icon: CheckSquare,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50/50'
    },
    {
        label: 'Team Members',
        value: '24',
        trend: '+4',
        trendUp: true,
        icon: Users,
        color: 'text-primary-600',
        bg: 'bg-primary-50/50'
    },
    {
        label: 'Hours Logged',
        value: '1,420',
        trend: '-3%',
        trendUp: false,
        icon: Clock,
        color: 'text-amber-600',
        bg: 'bg-amber-50/50'
    }
];

const StatCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
                <div key={idx} className="card-premium p-6 group">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-2xl group-hover:scale-110 transition-transform duration-300 shadow-sm border border-white/50 backdrop-blur-sm`}>
                            <stat.icon size={24} strokeWidth={2.5} />
                        </div>
                        <div className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-black uppercase tracking-tighter ${stat.trendUp ? 'bg-emerald-50 text-emerald-600' : 'bg-rose-50 text-rose-600'
                            }`}>
                            {stat.trendUp ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
                            {stat.trend}
                        </div>
                    </div>

                    <div className="space-y-1">
                        <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">{stat.label}</p>
                        <h3 className="text-3xl font-black text-slate-900 tracking-tighter">
                            {stat.value}
                        </h3>
                    </div>

                    <div className="mt-4 pt-4 border-t border-slate-50 flex items-center gap-2 text-[10px] font-bold text-slate-400">
                        <TrendingUp size={12} className="text-primary-400" />
                        <span>Insight: Up 12% from last month</span>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;
