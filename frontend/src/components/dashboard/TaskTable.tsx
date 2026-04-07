import { MoreVertical, Calendar, ArrowRight } from 'lucide-react';

const tasks = [
    {
        id: 1,
        title: 'Design system update',
        project: 'Website Redesign',
        assignee: 'Alice Chen',
        dueDate: '2024-04-12',
        status: 'In Progress',
        priority: 'High'
    },
    {
        id: 2,
        title: 'API Authentication fix',
        project: 'Mobile App',
        assignee: 'Bob Smith',
        dueDate: '2024-04-10',
        status: 'Completed',
        priority: 'Medium'
    },
    {
        id: 3,
        title: 'User interview summary',
        project: 'Q2 Marketing',
        assignee: 'Charlie Davis',
        dueDate: '2024-04-15',
        status: 'Delayed',
        priority: 'High'
    },
    {
        id: 4,
        title: 'Cloud migration plan',
        project: 'Internal Infrastructure',
        assignee: 'Diana Ross',
        dueDate: '2024-04-20',
        status: 'In Progress',
        priority: 'Low'
    }
];

const TaskTable = () => {
    const getStatusStyles = (status: string) => {
        switch (status) {
            case 'Completed': return 'status-badge-success';
            case 'Delayed': return 'status-badge-danger';
            default: return 'status-badge-info';
        }
    };

    return (
        <div className="card-premium overflow-hidden">
            <div className="p-6 border-b border-slate-100 flex items-center justify-between bg-slate-50/30">
                <div>
                    <h3 className="text-lg font-bold text-slate-900">Recent Tasks</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Track your team's latest activities and task status.</p>
                </div>
                <button className="text-primary-600 text-xs font-bold hover:text-primary-700 flex items-center gap-1 transition-colors">
                    View All <ArrowRight size={14} />
                </button>
            </div>

            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50">
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Task Name</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Project</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Assignee</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Due Date</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400">Status</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase tracking-widest text-slate-400 w-10"></th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {tasks.map((task) => (
                            <tr key={task.id} className="group hover:bg-slate-50/50 transition-colors cursor-pointer">
                                <td className="px-6 py-4">
                                    <div className="font-bold text-slate-900 text-sm group-hover:text-primary-600 transition-colors">{task.title}</div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-xs font-semibold text-slate-500 bg-slate-100 px-2 py-1 rounded-md">{task.project}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-2">
                                        <div className="w-7 h-7 rounded-lg bg-primary-50 text-primary-600 flex items-center justify-center font-bold text-[10px]">
                                            {task.assignee.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <span className="text-sm font-medium text-slate-700">{task.assignee}</span>
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex items-center gap-1.5 text-slate-500 text-xs font-medium">
                                        <Calendar size={14} className="text-slate-400" />
                                        {task.dueDate}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`status-badge ${getStatusStyles(task.status)}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <button className="p-1.5 text-slate-300 hover:text-slate-600 rounded-lg hover:bg-white transition-all">
                                        <MoreVertical size={16} />
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default TaskTable;
