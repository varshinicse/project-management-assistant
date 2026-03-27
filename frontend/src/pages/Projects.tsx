import React, { useState, useEffect } from 'react';
import {
    Briefcase,
    MoreVertical,
    Plus,
    Search,
    Users,
    Calendar,
    Filter,
    BarChart3
} from 'lucide-react';
import { CardSkeleton } from '../components/ui/Skeleton';

const projects = [
    {
        id: 1,
        name: 'Website Redesign',
        description: 'Overhaul of the corporate website with modern design and improved SEO.',
        status: 'In Progress',
        progress: 65,
        team: 4,
        deadline: '2024-05-15',
        category: 'Development'
    },
    {
        id: 2,
        name: 'Mobile App Launch',
        description: 'New iOS and Android app for project tracking on the go.',
        status: 'Delayed',
        progress: 42,
        team: 6,
        deadline: '2024-04-20',
        category: 'Mobile'
    },
    {
        id: 3,
        name: 'AI Integration',
        description: 'Integrating GPT-4 for automated task summaries and risk prediction.',
        status: 'In Progress',
        progress: 88,
        team: 3,
        deadline: '2024-06-01',
        category: 'AI/ML'
    },
    {
        id: 4,
        name: 'Q2 Marketing',
        description: 'Strategic marketing campaign for the new product launch.',
        status: 'Completed',
        progress: 100,
        team: 5,
        deadline: '2024-03-31',
        category: 'Marketing'
    }
];

const Projects = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 900);
        return () => clearTimeout(timer);
    }, []);

    const getStatusColor = (status: string) => {
        switch (status) {
            case 'Completed': return 'status-badge-success';
            case 'Delayed': return 'status-badge-danger';
            default: return 'status-badge-info';
        }
    };

    return (
        <div className="space-y-8 pb-10 animate-fade-in">
            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Projects</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and track all active workstreams.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary h-10 px-4 text-sm">
                        <Filter size={16} />
                        <span>Filter</span>
                    </button>
                    <button className="btn-primary h-10 px-4 text-sm">
                        <Plus size={18} />
                        <span>New Project</span>
                    </button>
                </div>
            </div>

            {/* Search & Tabs */}
            <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-8">
                    {['All Projects', 'Active', 'Completed', 'Archived'].map((tab, idx) => (
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
                        placeholder="Search projects..."
                        className="input-field pl-10 h-10 text-sm"
                    />
                </div>
            </div>

            {/* Projects Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {loading ? (
                    [1, 2, 3, 4].map(i => <CardSkeleton key={i} />)
                ) : (
                    projects.map((project) => (
                        <div key={project.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all duration-300 group">
                            <div className="flex justify-between items-start mb-4">
                                <div className="bg-primary-50 text-primary-600 p-3 rounded-xl">
                                    <Briefcase size={22} />
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className={`status-badge ${getStatusColor(project.status)}`}>
                                        {project.status}
                                    </span>
                                    <button className="p-1 text-slate-400 hover:text-slate-600 rounded-md hover:bg-slate-50">
                                        <MoreVertical size={18} />
                                    </button>
                                </div>
                            </div>

                            <h3 className="text-xl font-bold text-slate-900 mb-2 group-hover:text-primary-600 transition-colors">
                                {project.name}
                            </h3>
                            <p className="text-slate-500 text-sm line-clamp-2 mb-6">
                                {project.description}
                            </p>

                            <div className="space-y-4">
                                <div className="flex items-center justify-between text-xs font-bold">
                                    <span className="text-slate-400 uppercase tracking-wider">Progress</span>
                                    <span className="text-slate-900">{project.progress}%</span>
                                </div>
                                <div className="h-2 w-full bg-slate-100 rounded-full overflow-hidden">
                                    <div
                                        className="h-full bg-primary-600 rounded-full transition-all duration-1000"
                                        style={{ width: `${project.progress}%` }}
                                    ></div>
                                </div>
                            </div>

                            <div className="mt-8 flex items-center justify-between border-t border-slate-50 pt-4">
                                <div className="flex items-center gap-4 text-slate-500">
                                    <div className="flex items-center gap-1.5">
                                        <Users size={16} />
                                        <span className="text-xs font-semibold">{project.team}</span>
                                    </div>
                                    <div className="flex items-center gap-1.5">
                                        <Calendar size={16} />
                                        <span className="text-xs font-semibold">{project.deadline.split('-').slice(1).join('/')}</span>
                                    </div>
                                </div>
                                <div className="text-primary-600">
                                    <BarChart3 size={18} />
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default Projects;
