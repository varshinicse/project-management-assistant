import { Plus, Folder, Star, Search, MoreHorizontal } from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import { useNavigate } from 'react-router-dom';

const Projects = () => {
    const { projects, loading } = useProjects();
    const navigate = useNavigate();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Projects</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and track your project portfolio.</p>
                </div>
                <button className="btn-primary">
                    <Plus size={18} />
                    <span>New Project</span>
                </button>
            </div>

            {/* Filters and Search */}
            <div className="flex items-center justify-between gap-4">
                <div className="relative group flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search projects by name..."
                        className="input-field pl-10 h-10 text-sm"
                    />
                </div>
                <div className="flex items-center gap-2">
                    <button className="btn-secondary h-10 px-4 text-sm">All Statuses</button>
                    <button className="btn-secondary h-10 px-4 text-sm">Sort: Recent</button>
                </div>
            </div>

            {/* Projects Table */}
            <div className="bg-white rounded-2xl border border-slate-100 shadow-soft overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                                <th className="px-6 py-4 w-10">
                                    <Star size={14} />
                                </th>
                                <th className="px-6 py-4">Project</th>
                                <th className="px-6 py-4">Status</th>
                                <th className="px-6 py-4">Lead</th>
                                <th className="px-6 py-4">Risk Level</th>
                                <th className="px-6 py-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                            {projects.map((project: any) => (
                                <tr
                                    key={project._id}
                                    className="hover:bg-slate-50/50 transition-colors cursor-pointer group"
                                    onClick={() => navigate(`/kanban/${project._id}`)}
                                >
                                    <td className="px-6 py-4" onClick={(e) => e.stopPropagation()}>
                                        <button className="text-slate-300 hover:text-amber-400 transition-colors">
                                            <Star size={16} />
                                        </button>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="bg-primary-50 p-2 rounded-lg text-primary-600 group-hover:bg-primary-600 group-hover:text-white transition-all">
                                                <Folder size={18} />
                                            </div>
                                            <div>
                                                <div className="text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">
                                                    {project.name}
                                                </div>
                                                <div className="text-[10px] text-slate-400 font-medium uppercase tracking-tight">
                                                    {project.name.substring(0, 3).toUpperCase()}-2024
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`status-badge ${project.completion_percentage === 100 ? 'status-badge-success' : 'status-badge-info'}`}>
                                            {project.completion_percentage === 100 ? 'Completed' : 'In Progress'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <div className="w-7 h-7 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                {project.name.charAt(0)}
                                            </div>
                                            <span className="text-sm text-slate-600 font-medium">Lead User</span>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <span className={`status-badge ${project.overall_risk === 'High' ? 'status-badge-danger' :
                                            project.overall_risk === 'Medium' ? 'status-badge-warning' :
                                                'status-badge-success'
                                            }`}>
                                            {project.overall_risk || 'Low'}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right" onClick={(e) => e.stopPropagation()}>
                                        <button className="p-2 hover:bg-slate-100 rounded-lg transition-colors text-slate-400">
                                            <MoreHorizontal size={18} />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                            {projects.length === 0 && (
                                <tr>
                                    <td colSpan={6} className="px-6 py-24 text-center">
                                        <div className="flex flex-col items-center">
                                            <div className="bg-slate-50 p-6 rounded-full mb-4">
                                                <Folder size={40} className="text-slate-200" />
                                            </div>
                                            <h3 className="text-lg font-bold text-slate-900 mb-1">No projects found</h3>
                                            <p className="text-sm text-slate-500 max-w-xs mx-auto">Click "New Project" to start tracking your first initiative.</p>
                                        </div>
                                    </td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default Projects;
