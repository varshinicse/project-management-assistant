import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import {
    ArrowLeft,
    Clock,
    CheckCircle2,
    AlertCircle,
    Users,
    Activity,
    BarChart3,
    RefreshCw
} from 'lucide-react';
import { Pie, Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
} from 'chart.js';
import { CardSkeleton, ChartSkeleton } from '../components/ui/Skeleton';

ChartJS.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement,
    Title
);

const ProjectAnalytics = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [loading, setLoading] = useState(true);
    const [calculating, setCalculating] = useState(false);

    // Mock Project Data
    const [project, setProject] = useState({
        name: 'Website Redesign',
        status: 'In Progress',
        progress: 65,
        deadline: '2024-05-15',
        team: [
            { id: 1, name: 'Alice Chen', role: 'Developer', completion: 80, status: 'In Progress' },
            { id: 2, name: 'Bob Smith', role: 'Designer', completion: 100, status: 'Completed' },
            { id: 3, name: 'Charlie Davis', role: 'Developer', completion: 30, status: 'In Progress' },
            { id: 4, name: 'Diana Ross', role: 'QA', completion: 50, status: 'Not Started' },
        ]
    });

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    const calculateProgress = () => {
        setCalculating(true);

        // Dynamic Calculation Logic
        setTimeout(() => {
            const totalCompletion = project.team.reduce((acc, member) => acc + member.completion, 0);
            const averageProgress = Math.round(totalCompletion / project.team.length);

            let status = 'In Progress';
            if (averageProgress <= 30) status = 'Not Started';
            if (averageProgress >= 90) status = 'Completed';

            setProject(prev => ({
                ...prev,
                progress: averageProgress,
                status: status
            }));
            setCalculating(false);
        }, 800);
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Completed': return <CheckCircle2 className="text-emerald-500" size={18} />;
            case 'Delayed': return <AlertCircle className="text-rose-500" size={18} />;
            default: return <Clock className="text-primary-500" size={18} />;
        }
    };

    const pieData = {
        labels: ['Completed', 'Pending', 'In Review'],
        datasets: [{
            data: [project.progress, 100 - project.progress - 10, 10],
            backgroundColor: ['#8b5cf6', '#e2e8f0', '#c4b5fd'],
            borderWidth: 0,
        }]
    };

    const barData = {
        labels: project.team.map(m => m.name),
        datasets: [{
            label: 'Task Completion %',
            data: project.team.map(m => m.completion),
            backgroundColor: '#8b5cf6',
            borderRadius: 8,
        }]
    };

    return (
        <div className="space-y-8 pb-10 animate-fade-in">
            {/* Header / Breadcrumb */}
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <button
                        onClick={() => navigate('/analytics')}
                        className="p-2.5 rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 hover:text-primary-600 transition-all"
                    >
                        <ArrowLeft size={18} />
                    </button>
                    <div>
                        <div className="flex items-center gap-3 mb-1">
                            <h1 className="text-2xl font-bold text-slate-900">{project.name}</h1>
                            <span className="px-2.5 py-1 rounded-full bg-primary-50 text-primary-600 text-[10px] font-bold uppercase tracking-wider">
                                Project ID: {id}
                            </span>
                        </div>
                        <div className="flex items-center gap-4 text-sm text-slate-500 font-medium">
                            <div className="flex items-center gap-1.5">
                                <Clock size={16} />
                                <span>Due {project.deadline}</span>
                            </div>
                            <div className="flex items-center gap-1.5">
                                <Users size={16} />
                                <span>{project.team.length} Members</span>
                            </div>
                        </div>
                    </div>
                </div>

                <button
                    onClick={calculateProgress}
                    disabled={calculating || loading}
                    className="btn-primary"
                >
                    <RefreshCw size={18} className={calculating ? 'animate-spin' : ''} />
                    <span>{calculating ? 'Calculating...' : 'Track Progress'}</span>
                </button>
            </div>

            {/* Overview Stats */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
                    {loading ? (
                        <div className="space-y-6">
                            <div className="flex justify-between">
                                <div className="space-y-2">
                                    <div className="w-32 h-6 bg-slate-100 animate-shimmer rounded"></div>
                                    <div className="w-48 h-4 bg-slate-100 animate-shimmer rounded"></div>
                                </div>
                                <div className="w-16 h-8 bg-slate-100 animate-shimmer rounded"></div>
                            </div>
                            <div className="h-4 w-full bg-slate-100 animate-shimmer rounded-full"></div>
                        </div>
                    ) : (
                        <>
                            <div className="flex items-center justify-between mb-8">
                                <div>
                                    <h3 className="text-lg font-bold text-slate-900">Project Progress</h3>
                                    <p className="text-slate-500 text-sm">Overall completion based on team performance</p>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-primary-600">{project.progress}%</div>
                                    <div className="text-xs font-bold uppercase text-slate-400 mt-1">{project.status}</div>
                                </div>
                            </div>

                            <div className="relative h-4 w-full bg-slate-100 rounded-full overflow-hidden mb-4">
                                <div
                                    className="h-full bg-primary-600 rounded-full transition-all duration-1000 ease-out shadow-lg shadow-primary-600/20"
                                    style={{ width: `${project.progress}%` }}
                                ></div>
                            </div>
                        </>
                    )}

                    <div className="flex justify-between text-xs font-bold text-slate-400 px-1 mt-4">
                        <span>0%</span>
                        <span>50%</span>
                        <span>100%</span>
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft flex items-center justify-center">
                    {loading ? (
                        <div className="w-32 h-32 rounded-full border-8 border-slate-100 animate-shimmer"></div>
                    ) : (
                        <div className="w-full h-48">
                            <Pie data={pieData} options={{ maintainAspectRatio: false }} />
                        </div>
                    )}
                </div>
            </div>

            {/* Team Section */}
            <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
                <div className="xl:col-span-2 space-y-6">
                    <div className="flex items-center justify-between">
                        <h2 className="text-xl font-bold text-slate-900">Team Performance</h2>
                        <div className="flex items-center gap-2 text-sm font-medium text-slate-500">
                            <Activity size={16} className="text-primary-500" />
                            <span>Live Performance Data</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {loading ? (
                            [1, 2, 3, 4].map(i => <CardSkeleton key={i} />)
                        ) : (
                            project.team.map((member) => (
                                <div key={member.id} className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm hover:border-primary-100 transition-all">
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-500 font-bold">
                                            {member.name.split(' ').map(n => n[0]).join('')}
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-bold text-slate-900">{member.name}</h4>
                                            <p className="text-xs text-slate-500 font-medium">{member.role}</p>
                                        </div>
                                        {getStatusIcon(member.status)}
                                    </div>
                                    <div className="space-y-1.5">
                                        <div className="flex justify-between text-[10px] font-bold text-slate-600">
                                            <span>Completion</span>
                                            <span>{member.completion}%</span>
                                        </div>
                                        <div className="h-1.5 w-full bg-slate-50 rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary-600/60 rounded-full transition-all duration-500"
                                                style={{ width: `${member.completion}%` }}
                                            ></div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                </div>

                <div className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft">
                    <h3 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
                        <BarChart3 size={20} className="text-primary-600" />
                        Workload Output
                    </h3>
                    {loading ? (
                        <ChartSkeleton />
                    ) : (
                        <div className="h-64">
                            <Bar
                                data={barData}
                                options={{
                                    maintainAspectRatio: false,
                                    plugins: { legend: { display: false } },
                                    scales: {
                                        y: { beginAtZero: true, max: 100, ticks: { font: { size: 10 } } },
                                        x: { ticks: { font: { size: 10 } } }
                                    }
                                }}
                            />
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProjectAnalytics;
