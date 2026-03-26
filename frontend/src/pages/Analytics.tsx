import {
    Clock,
    Target,
    AlertTriangle,
    ChevronDown,
    Calendar,
    Download,
    Users
} from 'lucide-react';
import { useProjects } from '../hooks/useProjects';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale,
} from 'chart.js';
import { Bar, Line, Radar } from 'react-chartjs-2';

// Register ChartJS components
ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    PointElement,
    LineElement,
    RadialLinearScale
);

const Analytics = () => {
    const { projects, loading } = useProjects();

    const workloadData = {
        labels: ['Alex', 'Jordan', 'Taylor', 'Sam', 'Chris'],
        datasets: [
            {
                label: 'Active Tasks',
                data: [5, 8, 3, 6, 4],
                backgroundColor: '#0052CC',
                borderRadius: 4,
            },
            {
                label: 'Completed Tasks',
                data: [12, 15, 10, 8, 14],
                backgroundColor: '#36B37E',
                borderRadius: 4,
            }
        ],
    };

    const performanceData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [
            {
                label: 'Velocity',
                data: [45, 52, 48, 61, 55, 68],
                borderColor: '#0052CC',
                backgroundColor: 'rgba(0, 82, 204, 0.1)',
                fill: true,
                tension: 0.4,
            }
        ],
    };

    const skillData = {
        labels: ['Frontend', 'Backend', 'Design', 'QA', 'DevOps'],
        datasets: [
            {
                label: 'Team Skills',
                data: [85, 70, 90, 65, 50],
                backgroundColor: 'rgba(0, 82, 204, 0.2)',
                borderColor: '#0052CC',
                pointBackgroundColor: '#0052CC',
            }
        ],
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-full">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-jira-blue"></div>
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-[#172B4D]">Analytics & Insights</h1>
                    <p className="text-[#6B778C] text-sm">Deep dive into project performance and team productivity metrics.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-jira-border rounded font-medium text-[#42526E] text-sm hover:bg-slate-50 transition shadow-sm">
                        <Calendar size={16} /> Last 30 days <ChevronDown size={14} />
                    </button>
                    <button className="flex items-center gap-2 px-3 py-2 bg-white border border-jira-border rounded font-medium text-[#42526E] text-sm hover:bg-slate-50 transition shadow-sm">
                        <Download size={16} /> Export
                    </button>
                </div>
            </div>

            {/* Metric Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-white p-5 rounded border border-jira-border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-blue-50 text-blue-600 rounded">
                            <Target size={20} />
                        </div>
                        <span className="text-[#6B778C] text-xs font-bold uppercase tracking-wider">Velocity</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#172B4D]">42.5</span>
                        <span className="text-green-600 text-xs font-medium bg-green-50 px-1.5 py-0.5 rounded">↑ 12%</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded border border-jira-border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-green-50 text-green-600 rounded">
                            <Clock size={20} />
                        </div>
                        <span className="text-[#6B778C] text-xs font-bold uppercase tracking-wider">Cycle Time</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#172B4D]">4.2d</span>
                        <span className="text-green-600 text-xs font-medium bg-green-50 px-1.5 py-0.5 rounded">↓ 0.5d</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded border border-jira-border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-purple-50 text-purple-600 rounded">
                            <Users size={20} />
                        </div>
                        <span className="text-[#6B778C] text-xs font-bold uppercase tracking-wider">Utilisation</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#172B4D]">88%</span>
                        <span className="text-blue-600 text-xs font-medium bg-blue-50 px-1.5 py-0.5 rounded">Optimal</span>
                    </div>
                </div>
                <div className="bg-white p-5 rounded border border-jira-border shadow-sm">
                    <div className="flex items-center gap-3 mb-2">
                        <div className="p-2 bg-red-50 text-red-600 rounded">
                            <AlertTriangle size={20} />
                        </div>
                        <span className="text-[#6B778C] text-xs font-bold uppercase tracking-wider">Risk Level</span>
                    </div>
                    <div className="flex items-end justify-between">
                        <span className="text-2xl font-bold text-[#172B4D]">Low</span>
                        <span className="text-slate-500 text-xs font-medium bg-slate-50 px-1.5 py-0.5 rounded">Steady</span>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Team Workload */}
                <div className="bg-white p-6 rounded border border-jira-border shadow-sm">
                    <h2 className="text-lg font-semibold text-[#172B4D] mb-6">Team Workload</h2>
                    <div className="h-72">
                        <Bar
                            data={workloadData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { position: 'bottom', labels: { boxWidth: 12, usePointStyle: true } } },
                                scales: {
                                    y: { beginAtZero: true, grid: { color: '#F4F5F7' } },
                                    x: { grid: { display: false } }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Performance Trend */}
                <div className="bg-white p-6 rounded border border-jira-border shadow-sm">
                    <h2 className="text-lg font-semibold text-[#172B4D] mb-6">Performance Trend (Velocity)</h2>
                    <div className="h-72">
                        <Line
                            data={performanceData}
                            options={{
                                maintainAspectRatio: false,
                                plugins: { legend: { display: false } },
                                scales: {
                                    y: { beginAtZero: true, grid: { color: '#F4F5F7' } },
                                    x: { grid: { display: false } }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Team Distribution */}
                <div className="bg-white p-6 rounded border border-jira-border shadow-sm">
                    <h2 className="text-lg font-semibold text-[#172B4D] mb-6">Skill Distribution</h2>
                    <div className="h-72 flex justify-center">
                        <Radar
                            data={skillData}
                            options={{
                                maintainAspectRatio: false,
                                scales: {
                                    r: {
                                        angleLines: { display: false },
                                        suggestedMin: 0,
                                        suggestedMax: 100
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                {/* Health Overview */}
                <div className="bg-white p-6 rounded border border-jira-border shadow-sm">
                    <h2 className="text-lg font-semibold text-[#172B4D] mb-4">Project Health Overview</h2>
                    <div className="space-y-4 pt-2">
                        {projects.slice(0, 4).map((p: any) => (
                            <div key={p._id} className="space-y-1.5">
                                <div className="flex items-center justify-between">
                                    <span className="text-sm font-medium text-[#42526E]">{p.name}</span>
                                    <span className="text-xs font-bold text-[#6B778C]">{p.completion_percentage}%</span>
                                </div>
                                <div className="h-2 w-full bg-[#EBECF0] rounded-full overflow-hidden">
                                    <div
                                        className={`h-full rounded-full transition-all duration-1000 ${p.overall_risk === 'High' ? 'bg-red-500' :
                                                p.overall_risk === 'Medium' ? 'bg-orange-500' :
                                                    'bg-green-500'
                                            }`}
                                        style={{ width: `${p.completion_percentage}%` }}
                                    ></div>
                                </div>
                            </div>
                        ))}
                        {projects.length === 0 && (
                            <div className="text-center py-10 text-[#6B778C] italic text-sm">
                                No project data available
                            </div>
                        )}
                        <button className="w-full mt-4 py-2 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded transition">
                            View Detailed Report
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Analytics;
