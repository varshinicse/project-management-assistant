import { Sparkles, TrendingUp, AlertCircle, RefreshCw } from 'lucide-react';

const insights = [
    {
        id: 1,
        title: "Project Alpha potential delay",
        description: "Project Alpha shows a high probability of missing the next milestone. Consider reallocating resources from Project Gamma.",
        type: "warning",
        icon: AlertCircle,
        border: "border-amber-200",
        bg: "bg-amber-50/30"
    },
    {
        id: 2,
        title: "Efficiency bottleneck detected",
        description: "Developer workload is unevenly distributed in Team B. Reassign 2 minor tasks to improve overall sprint velocity.",
        type: "info",
        icon: TrendingUp,
        border: "border-sky-200",
        bg: "bg-sky-50/30"
    },
    {
        id: 3,
        title: "Optimized sprint schedule",
        description: "AI suggests a new task order based on dependency analysis that could save up to 3 days in the current cycle.",
        type: "success",
        icon: Sparkles,
        border: "border-emerald-200",
        bg: "bg-emerald-50/30"
    }
];

const AIInsightsPanel = () => {
    return (
        <div className="mt-8">
            <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                    <div className="p-2 bg-primary-100 rounded-lg text-primary-600">
                        <Sparkles size={18} />
                    </div>
                    <h3 className="text-lg font-bold text-slate-900 font-sans">AI-Driven Insights</h3>
                </div>
                <button className="flex items-center gap-2 text-sm font-semibold text-slate-500 hover:text-primary-600 transition-colors">
                    <RefreshCw size={14} />
                    <span>Regenerate insights</span>
                </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {insights.map((insight) => (
                    <div
                        key={insight.id}
                        className={`p-6 rounded-2xl border ${insight.border} ${insight.bg} hover:shadow-lg transition-all cursor-pointer group relative overflow-hidden`}
                    >
                        <div className="flex items-center gap-3 mb-3">
                            <div className="text-slate-900">
                                <insight.icon size={20} />
                            </div>
                            <h4 className="text-sm font-bold text-slate-900 group-hover:text-primary-600 transition-colors">
                                {insight.title}
                            </h4>
                        </div>
                        <p className="text-xs text-slate-600 leading-relaxed">
                            {insight.description}
                        </p>
                        <div className="mt-4 flex items-center gap-2 text-[10px] font-bold text-primary-600 uppercase tracking-widest">
                            Apply Suggestion
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AIInsightsPanel;
