import { ArrowUpRight, ArrowDownRight, Briefcase, CheckSquare, Clock, Users } from 'lucide-react';

const stats = [
    {
        label: 'Total Projects',
        value: '12',
        trend: '+2.5%',
        trendUp: true,
        icon: Briefcase,
        color: 'text-blue-600',
        bg: 'bg-blue-50'
    },
    {
        label: 'Tasks Completed',
        value: '128',
        trend: '+14%',
        trendUp: true,
        icon: CheckSquare,
        color: 'text-emerald-600',
        bg: 'bg-emerald-50'
    },
    {
        label: 'Delayed Projects',
        value: '3',
        trend: '-1',
        trendUp: false,
        icon: Clock,
        color: 'text-rose-600',
        bg: 'bg-rose-50'
    },
    {
        label: 'Team Efficiency',
        value: '94%',
        trend: '+4.2%',
        trendUp: true,
        icon: Users,
        color: 'text-amber-600',
        bg: 'bg-amber-50'
    },
];

const StatCards = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat) => (
                <div key={stat.label} className="stat-card">
                    <div className="flex justify-between items-start mb-4">
                        <div className={`${stat.bg} ${stat.color} p-3 rounded-xl`}>
                            <stat.icon size={22} />
                        </div>
                        <div className={`flex items-center gap-1 text-xs font-medium ${stat.trendUp ? 'text-emerald-600' : 'text-rose-600'}`}>
                            {stat.trend}
                            {stat.trendUp ? <ArrowUpRight size={14} /> : <ArrowDownRight size={14} />}
                        </div>
                    </div>
                    <div>
                        <p className="text-sm font-medium text-slate-500">{stat.label}</p>
                        <h3 className="text-2xl font-bold text-slate-900 mt-1">{stat.value}</h3>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StatCards;
