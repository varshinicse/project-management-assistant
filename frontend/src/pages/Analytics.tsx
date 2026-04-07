import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Briefcase,
    TrendingUp,
    ChevronRight,
    Users,
    Calendar,
    Search,
    Filter
} from 'lucide-react';
import { CardSkeleton } from '../components/ui/Skeleton';

const projects = [
    {
        id: '1',
        name: 'Website Redesign',
        status: 'In Progress',
        progress: 65,
        teamSize: 4,
        deadline: '2024-05-15',
        trend: '+5%',
    },
    {
        id: '2',
        name: 'Mobile App Launch',
        status: 'Delayed',
        progress: 42,
        teamSize: 6,
        deadline: '2024-04-20',
        trend: '-2%',
    },
    {
        id: '3',
        name: 'AI Integration',
        status: 'In Progress',
        progress: 88,
        teamSize: 3,
        deadline: '2024-06-01',
        trend: '+12%',
    },
    {
        id: '4',
        name: 'Q2 Marketing Campaign',
        status: 'Completed',
        progress: 100,
        teamSize: 5,
        deadline: '2024-03-31',
        trend: 'Done',
    },
];

const Analytics = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 800);
        return () => clearTimeout(timer);
    }, []);

    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Completed': return 'status-badge-success';
            case 'Delayed': return 'status-badge-danger';
            default: return 'status-badge-info';
        }
    };

    return (
        <div className="space-y-8 pb-10 animate-fade-in">
            {/* Header */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Project Analytics</h1>
                    <p className="text-slate-500 text-sm mt-1">Deep dive into your project performance and team productivity.</p>
                </div>
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                        <input
                            type="text"
                            placeholder="Find a project..."
                            className="input-field pl-10 h-10 w-64 text-sm"
                        />
                    </div>
                    <button className="btn-secondary h-10 px-4 text-sm">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    [1, 2, 3, 4].map(i => <CardSkeleton key={i} />)
                ) : (
                    projects.map((project) => (
                        <div
                            key={project.id}
                            onClick={() => navigate(`/analytics/project/${project.id}`)}
                            className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 cursor-pointer group"
                        >
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-primary-50 text-primary-600 p-3 rounded-xl group-hover:bg-primary-600 group-hover:text-white transition-colors duration-300">
                                    <Briefcase size={22} />
                                </div>
                                <span className={`status-badge ${getStatusStyles(project.status)}`}>
                                    {project.status}
                                </span>
                            </div>

                            <h3 className="text-lg font-bold text-slate-900 mb-1 group-hover:text-primary-600 transition-colors">
                                {project.name}
                            </h3>

                            <div className="flex items-center gap-2 text-xs text-slate-500 mb-6 font-medium">
                                <TrendingUp size={14} className="text-emerald-500" />
                                <span>{project.trend} this week</span>
                            </div>

                            {/* Progress Bar */}
                            <div className="space-y-2 mb-6">
                                <div className="flex justify-between text-xs font-bold text-slate-700">
                                    <span>Progress</span>
                                    <span>{project.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${project.status === 'Delayed' ? 'bg-rose-500' : 'bg-primary-600'
                                            }`}
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            {/* Footer Info */}
                            <div className="flex items-center justify-between border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-4 text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Users size={16} />
                                        <span className="text-xs font-semibold">{project.teamSize}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={16} />
                                        <span className="text-xs font-semibold">{project.deadline.split('-').slice(1).join('/')}</span>
                                    </div>
                                </div>
                                <ChevronRight size={18} className="text-slate-300 group-hover:text-primary-600 transition-colors" />
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Analytics;
