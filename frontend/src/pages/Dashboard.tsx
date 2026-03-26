import { useProjects } from '../hooks/useProjects';
import StatCards from '../components/dashboard/StatCards';
import AnalyticsCharts from '../components/dashboard/AnalyticsCharts';
import TaskTable from '../components/dashboard/TaskTable';
import AIInsightsPanel from '../components/dashboard/AIInsightsPanel';

const Dashboard = () => {
    const { loading } = useProjects();

    if (loading) {
        return (
            <div className="flex items-center justify-center h-[60vh]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
            </div>
        )
    }

    return (
        <div className="space-y-8 pb-10">
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
            <StatCards />

            {/* Charts Section */}
            <AnalyticsCharts />

            {/* AI Insights Section */}
            <AIInsightsPanel />

            {/* Recent Activity / Tasks Table */}
            <TaskTable />
        </div>
    );
};

export default Dashboard;
