const tasks = [
    {
        name: 'Project Alpha Redesign',
        status: 'In Progress',
        deadline: 'Oct 15, 2023',
        team: ['JD', 'AC', 'MS'],
        progress: 65,
        type: 'info'
    },
    {
        name: 'Backend API Hardening',
        status: 'Completed',
        deadline: 'Oct 10, 2023',
        team: ['RK', 'TH'],
        progress: 100,
        type: 'success'
    },
    {
        name: 'Mobile App Beta Test',
        status: 'Delayed',
        deadline: 'Oct 08, 2023',
        team: ['LP', 'VK', 'MS'],
        progress: 40,
        type: 'danger'
    },
    {
        name: 'Infrastructure Migration',
        status: 'To Do',
        deadline: 'Oct 20, 2023',
        team: ['JD', 'RK'],
        progress: 10,
        type: 'warning'
    },
];

const TaskTable = () => {
    return (
        <div className="bg-white rounded-2xl border border-slate-100 shadow-soft mt-8 overflow-hidden">
            <div className="p-6 border-b border-slate-50 flex items-center justify-between">
                <h3 className="text-lg font-bold text-slate-900 font-sans">Recent Projects & Tasks</h3>
                <button className="text-sm font-semibold text-primary-600 hover:text-primary-700 transition-colors">View All</button>
            </div>
            <div className="overflow-x-auto">
                <table className="w-full text-left">
                    <thead>
                        <tr className="bg-slate-50/50 text-slate-500 text-xs font-semibold uppercase tracking-wider">
                            <th className="px-6 py-4">Project Name</th>
                            <th className="px-6 py-4">Status</th>
                            <th className="px-6 py-4">Deadline</th>
                            <th className="px-6 py-4">Assigned Team</th>
                            <th className="px-6 py-4">Progress</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-50">
                        {tasks.map((task) => (
                            <tr key={task.name} className="hover:bg-slate-50/50 transition-colors cursor-pointer group">
                                <td className="px-6 py-4">
                                    <span className="text-sm font-semibold text-slate-900 group-hover:text-primary-600 transition-colors">{task.name}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className={`status-badge status-badge-${task.type}`}>
                                        {task.status}
                                    </span>
                                </td>
                                <td className="px-6 py-4">
                                    <span className="text-sm text-slate-500">{task.deadline}</span>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="flex -space-x-2">
                                        {task.team.map((member, i) => (
                                            <div key={i} className="w-8 h-8 rounded-full bg-slate-100 border-2 border-white flex items-center justify-center text-[10px] font-bold text-slate-600">
                                                {member}
                                            </div>
                                        ))}
                                    </div>
                                </td>
                                <td className="px-6 py-4">
                                    <div className="w-full max-w-[120px]">
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-[10px] font-bold text-slate-500">{task.progress}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-1000 ${task.progress === 100 ? 'bg-emerald-500' : 'bg-primary-500'}`}
                                                style={{ width: `${task.progress}%` }}
                                            />
                                        </div>
                                    </div>
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
