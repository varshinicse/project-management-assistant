import { useParams, Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import { useProjects } from '../hooks/useProjects';
import {
    AlertCircle,
    Plus,
    Trash2,
    Search,
    ChevronRight,
    Filter
} from 'lucide-react';

const KanbanBoard = () => {
    const { projectId } = useParams();
    const { tasks, updateTask, deleteTask, loading } = useTasks(projectId);
    const { projects } = useProjects();

    // Find current project for header
    const currentProject: any = projects.find((p: any) => p._id === projectId);

    const handleStatusUpdate = async (taskId: string, newStatus: string) => {
        await updateTask(taskId, { status: newStatus });
    };

    const handleDeleteTask = async (taskId: string) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            await deleteTask(taskId);
        }
    };

    const columns = ['To Do', 'In Progress', 'Done'];

    if (loading && !currentProject) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        );
    }

    return (
        <div className="flex flex-col h-full space-y-6">
            {/* Breadcrumbs & Header */}
            <div className="space-y-4">
                <nav className="flex items-center text-[10px] text-slate-400 font-bold uppercase tracking-widest gap-2">
                    <Link to="/projects" className="hover:text-primary-600 transition-colors">Projects</Link>
                    <ChevronRight size={10} className="text-slate-300" />
                    <span className="text-slate-500 font-black truncate max-w-[200px]">{currentProject?.name || 'Loading...'}</span>
                </nav>

                <div className="flex items-center justify-between">
                    <div>
                        <h1 className="text-3xl font-bold text-slate-900 tracking-tight">{currentProject?.name || 'Board'}</h1>
                        <p className="text-slate-500 text-sm font-medium mt-1">Manage tasks and track delivery progress across the project lifecycle.</p>
                    </div>
                    <div className="flex items-center gap-3">
                        <button className="btn-secondary h-10 px-4 text-xs">
                            <Filter size={14} />
                            View Options
                        </button>
                        <button className="btn-primary h-10 px-4 text-xs font-bold">
                            <Plus size={16} />
                            Create Task
                        </button>
                    </div>
                </div>
            </div>

            {/* Board Controls */}
            <div className="flex items-center gap-4 py-2 border-y border-slate-50 overflow-x-auto no-scrollbar">
                <div className="relative group max-w-xs flex-1 min-w-[180px]">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 group-focus-within:text-primary-600 transition-colors" />
                    <input
                        type="text"
                        placeholder="Search current board..."
                        className="input-field pl-10 h-10 text-sm"
                    />
                </div>

                <div className="flex -space-x-2 overflow-hidden">
                    {[1, 2, 3, 4].map((_, i) => (
                        <div key={i} className={`w-8 h-8 rounded-xl border-2 border-white bg-slate-100 flex items-center justify-center text-[10px] font-bold text-slate-600 shadow-soft ring-1 ring-slate-50 hover:z-10 hover:scale-110 transition-all cursor-pointer`}>
                            {String.fromCharCode(65 + i)}
                        </div>
                    ))}
                    <button className="w-8 h-8 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center text-slate-400 hover:bg-primary-50 hover:text-primary-600 transition-all">
                        <Plus size={14} />
                    </button>
                </div>

                <div className="h-4 w-px bg-slate-100 mx-2"></div>

                <button className="text-xs font-bold text-slate-500 hover:text-primary-600 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all">My Issues</button>
                <button className="text-xs font-bold text-slate-500 hover:text-primary-600 px-3 py-2 rounded-xl hover:bg-primary-50 transition-all whitespace-nowrap">Recently Updated</button>
            </div>

            {/* Kanban Columns */}
            <div className="flex-1 flex gap-6 overflow-x-auto pb-6 -mx-2 px-2 custom-scrollbar">
                {columns.map(column => (
                    <div key={column} className="flex-shrink-0 w-80 flex flex-col bg-white rounded-2xl border border-slate-100 p-4 shadow-soft group/column">
                        <div className="flex items-center justify-between mb-4 px-1">
                            <div className="flex items-center gap-2">
                                <h2 className="text-[11px] font-black text-slate-400 uppercase tracking-[0.2em]">
                                    {column}
                                </h2>
                                <span className="bg-slate-50 text-slate-500 px-2 py-0.5 rounded-lg text-[9px] font-black">
                                    {tasks.filter((t: any) => t.status === column).length}
                                </span>
                            </div>
                            <button className="opacity-0 group-hover/column:opacity-100 p-1.5 hover:bg-primary-50 text-slate-400 hover:text-primary-600 rounded-lg transition-all">
                                <Plus size={14} />
                            </button>
                        </div>

                        <div className="flex-1 overflow-y-auto space-y-4 pr-1 custom-scrollbar min-h-[500px]">
                            {tasks.filter((t: any) => t.status === column).map((task: any) => (
                                <div
                                    key={task._id}
                                    className="bg-white p-4 rounded-xl border border-slate-100 shadow-soft hover:shadow-premium hover:-translate-y-1 transition-all group/card cursor-pointer relative overflow-hidden"
                                >
                                    {/* Risk Indicator Line */}
                                    <div className={`absolute left-0 top-0 bottom-0 w-1 ${task.delay_risk === 'High' ? 'bg-rose-500' :
                                        task.delay_risk === 'Medium' ? 'bg-amber-500' : 'bg-emerald-500'
                                        }`} />

                                    <div className="flex items-start justify-between gap-3 mb-2">
                                        <h3 className="text-xs font-bold text-slate-900 leading-normal group-hover/card:text-primary-600 transition-colors">
                                            {task.title}
                                        </h3>
                                        <button
                                            onClick={(e) => { e.stopPropagation(); handleDeleteTask(task._id); }}
                                            className="opacity-0 group-hover/card:opacity-100 p-1.5 text-slate-300 hover:text-rose-500 transition-all bg-slate-50 rounded-lg"
                                        >
                                            <Trash2 className="w-3 h-3" />
                                        </button>
                                    </div>

                                    <p className="text-[11px] font-medium text-slate-500 line-clamp-3 mb-4 leading-relaxed">
                                        {task.description}
                                    </p>

                                    {task.ai_warning && (
                                        <div className="mb-4 p-2 bg-rose-50/50 text-[10px] text-rose-700 rounded-xl border border-rose-100 flex items-start gap-2 animate-in fade-in zoom-in duration-300">
                                            <AlertCircle size={12} className="mt-0.5 flex-shrink-0" />
                                            <span className="font-semibold leading-tight">{task.ai_warning}</span>
                                        </div>
                                    )}

                                    <div className="flex items-center justify-between mt-auto">
                                        <div className="flex items-center gap-2">
                                            <div className="text-[9px] font-black text-slate-400 uppercase tracking-widest bg-slate-50 px-1.5 py-0.5 rounded-md">
                                                {currentProject?.name?.substring(0, 3).toUpperCase()}-{(task._id.substring(task._id.length - 4)).toUpperCase()}
                                            </div>
                                        </div>

                                        <div className="flex items-center gap-2">
                                            <select
                                                value={task.status}
                                                onChange={(e) => handleStatusUpdate(task._id, e.target.value)}
                                                onClick={(e) => e.stopPropagation()}
                                                className="text-[9px] font-black uppercase border-none bg-slate-50 hover:bg-primary-50 py-1 px-2 rounded-lg text-slate-500 hover:text-primary-600 focus:ring-0 cursor-pointer transition-all"
                                            >
                                                {columns.map(c => <option key={c} value={c}>{c}</option>)}
                                            </select>
                                            <div className="w-6 h-6 rounded-lg bg-primary-100 border border-white flex items-center justify-center text-[9px] text-primary-700 font-bold shadow-soft">
                                                {task.assigned_to?.[0]?.toUpperCase() || 'U'}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4 flex items-center gap-2">
                                        <div className="flex-1 h-1 bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary-500 transition-all duration-700"
                                                style={{ width: `${task.progress}%` }}
                                            />
                                        </div>
                                        <span className="text-[9px] font-black text-slate-400">{task.progress}%</span>
                                    </div>
                                </div>
                            ))}
                            {tasks.filter((t: any) => t.status === column).length === 0 && (
                                <div className="py-12 rounded-2xl border-2 border-dashed border-slate-50 text-[11px] text-slate-300 font-bold text-center flex flex-col items-center">
                                    <Plus size={20} className="mb-2 opacity-50" />
                                    No issues found
                                </div>
                            )}
                        </div>
                    </div>
                ))}

                <button className="flex-shrink-0 w-80 h-14 flex items-center justify-center border-2 border-dashed border-slate-100 rounded-2xl text-slate-400 font-bold text-sm hover:bg-primary-50 hover:text-primary-600 hover:border-primary-100 transition-all group">
                    <Plus size={18} className="mr-2 group-hover:scale-110 transition-transform" />
                    Add Section
                </button>
            </div>
        </div>
    );
};

export default KanbanBoard;
