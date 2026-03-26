import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler,
    ChartOptions
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    BarElement,
    Title,
    Tooltip,
    Legend,
    Filler
);

const lineData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
        {
            label: 'Project Progress',
            data: [30, 45, 40, 65, 80, 95],
            fill: true,
            borderColor: '#8b5cf6',
            backgroundColor: 'rgba(139, 92, 246, 0.05)',
            tension: 0.4,
            pointRadius: 0,
            pointHoverRadius: 6,
            borderWidth: 2,
        },
    ],
};

const barData = {
    labels: ['Team A', 'Team B', 'Team C', 'Team D', 'Team E'],
    datasets: [
        {
            label: 'Productivity',
            data: [65, 80, 45, 90, 75],
            backgroundColor: '#8b5cf6',
            borderRadius: 8,
            barThickness: 20,
        },
    ],
};

const options: ChartOptions<'line' | 'bar'> = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
        legend: {
            display: false,
        },
        tooltip: {
            mode: 'index',
            intersect: false,
            backgroundColor: '#1e293b',
            padding: 12,
            titleFont: { size: 14, weight: 'bold' },
            bodyFont: { size: 13 },
            cornerRadius: 12,
        },
    },
    scales: {
        x: {
            grid: {
                display: false,
            },
            border: {
                display: false,
            },
            ticks: {
                color: '#94a3b8',
                font: { size: 12 },
            },
        },
        y: {
            grid: {
                color: '#f1f5f9',
            },
            border: {
                display: false,
            },
            ticks: {
                color: '#94a3b8',
                font: { size: 12 },
                maxTicksLimit: 5,
            },
        },
    },
};

const AnalyticsCharts = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 font-sans">Project Progress</h3>
                    <select className="bg-slate-50 border-none text-xs font-semibold text-slate-500 rounded-lg px-2 py-1 focus:ring-0">
                        <option>Last 6 Months</option>
                        <option>Last Year</option>
                    </select>
                </div>
                <div className="h-64">
                    <Line data={lineData} options={options as any} />
                </div>
            </div>

            <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-lg font-bold text-slate-900 font-sans">Team Productivity</h3>
                    <select className="bg-slate-50 border-none text-xs font-semibold text-slate-500 rounded-lg px-2 py-1 focus:ring-0">
                        <option>Current Week</option>
                        <option>Last Week</option>
                    </select>
                </div>
                <div className="h-64">
                    <Bar data={barData} options={options as any} />
                </div>
            </div>
        </div>
    );
};

export default AnalyticsCharts;
