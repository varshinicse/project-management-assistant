import { useProjects } from '../hooks/useProjects';
import StatCards from '../components/dashboard/StatCards';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import TaskTable from '../components/dashboard/TaskTable';
import AIInsightsPanel from '../components/dashboard/AIInsightsPanel';
import { CardSkeleton, ChartSkeleton } from '../components/ui/Skeleton';

const Dashboard = () => {
    const { loading } = useProjects();

    return (
        <div className="space-y-8 pb-10 animate-fade-in">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-slate-900 tracking-tight">Overview</h1>
                    <p className="text-slate-500 text-sm mt-1">Welcome back! Here's what's happening today.</p>
                </div>
                <div className="flex items-center gap-3">
                    <button className="btn-secondary text-xs h-9 px-3">Download Report</button>
                    <button className="btn-primary text-xs h-9 px-3">Add Widget</button>
                </div>
            </div>

            {/* Metric Row */}
            {loading ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                    {[1, 2, 3, 4].map(i => <CardSkeleton key={i} />)}
                </div>
            ) : (
                <StatCards />
            )}

            {/* Charts Section */}
            {loading ? <ChartSkeleton /> : <AnalyticsCharts />}

            {/* AI Insights Section */}
            <AIInsightsPanel />

            {/* Recent Activity / Tasks Table */}
            <TaskTable />
        </div>
    );
};

export default Dashboard;
