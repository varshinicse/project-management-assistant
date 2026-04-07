import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
} from 'chart.js';
import { Bar, Doughnut } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
    Filler
);

const AnalyticsCharts = () => {
    const barData = {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
            {
                label: 'Tasks Completed',
                data: [12, 19, 15, 22, 18, 10, 8],
                backgroundColor: 'rgba(139, 92, 246, 0.8)',
                borderRadius: 8,
                hoverBackgroundColor: '#8B5CF6',
            },
        ],
    };

    const doughnutData = {
        labels: ['In Progress', 'Completed', 'Delayed'],
        datasets: [
            {
                data: [45, 40, 15],
                backgroundColor: [
                    '#8B5CF6',
                    '#10B981',
                    '#F43F5E',
                ],
                borderWidth: 0,
                hoverOffset: 4,
            },
        ],
    };

    const barOptions = {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
            legend: {
                display: false,
            },
            tooltip: {
                backgroundColor: '#1E293B',
                padding: 12,
                titleFont: { size: 14, weight: 'bold' as const },
                bodyFont: { size: 13 },
                cornerRadius: 8,
                displayColors: false,
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                grid: {
                    color: '#F1F5F9',
                },
                ticks: {
                    font: { size: 11, weight: 'bold' as const },
                    color: '#94A3B8',
                }
            },
            x: {
                grid: {
                    display: false,
                },
                ticks: {
                    font: { size: 11, weight: 'bold' as const },
                    color: '#94A3B8',
                }
            },
        },
    };

    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="lg:col-span-2 card-premium p-6">
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h3 className="text-lg font-bold text-slate-900">Task Performance</h3>
                        <p className="text-slate-500 text-xs mt-0.5">Daily completion rate trends</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="flex items-center gap-1.5">
                            <div className="w-2.5 h-2.5 rounded-full bg-primary-500"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase">Tasks</span>
                        </div>
                    </div>
                </div>
                <div className="h-72">
                    <Bar data={barData} options={barOptions} />
                </div>
            </div>

            <div className="card-premium p-6 flex flex-col">
                <div className="mb-8">
                    <h3 className="text-lg font-bold text-slate-900">Project Health</h3>
                    <p className="text-slate-500 text-xs mt-0.5">Distribution of project statuses</p>
                </div>
                <div className="flex-1 min-h-[200px] flex items-center justify-center">
                    <Doughnut data={doughnutData} options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        cutout: '75%',
                        plugins: {
                            legend: { display: false },
                            tooltip: {
                                backgroundColor: '#1E293B',
                                padding: 12,
                                titleFont: { size: 14, weight: 'bold' as const },
                                bodyFont: { size: 13 },
                                cornerRadius: 8,
                                displayColors: false,
                            }
                        }
                    }} />
                </div>
                <div className="mt-6 space-y-3">
                    <div className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-primary-500"></div>
                            <span className="text-slate-600">In Progress</span>
                        </div>
                        <span className="text-slate-900">45%</span>
                    </div>
                    <div className="flex items-center justify-between text-xs font-bold">
                        <div className="flex items-center gap-2">
                            <div className="w-2 h-2 rounded-full bg-emerald-500"></div>
                            <span className="text-slate-600">Completed</span>
                        </div>
                        <span className="text-slate-900">40%</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;
