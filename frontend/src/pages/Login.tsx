import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/api';
import { Bot, Lock, User, ArrowRight, AlertCircle } from 'lucide-react';

interface LoginProps {
    onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const response = await authService.login({ username, password });
            localStorage.setItem('token', response.data.access_token);
            onLogin();
            navigate('/dashboard');
        } catch (err: any) {
            setError('Invalid username or password. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 sm:p-8">
            <div className="w-full max-w-[400px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header / Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-soft border border-slate-100 mb-4 group transition-transform hover:scale-110">
                        <Bot size={24} className="text-primary-600" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">PM-AI Assistant</h1>
                    <p className="text-slate-500 text-sm mt-1.5 font-medium">Enterprise Project Intelligence</p>
                </div>

                {/* Login Card */}
                <div className="bg-white rounded-lg shadow-soft border border-slate-100 overflow-hidden">
                    <div className="p-8 sm:p-10">
                        {error && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                                <p className="text-xs font-semibold text-rose-600 leading-relaxed">{error}</p>
                            </div>
                        )}

                        <form className="space-y-6" onSubmit={handleSubmit}>
                            <div className="space-y-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Username</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <User size={18} strokeWidth={2} />
                                    </div>
                                    <input
                                        type="text"
                                        required
                                        placeholder="Enter your username"
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-slate-300"
                                        value={username}
                                        onChange={(e) => setUsername(e.target.value)}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <div className="flex items-center justify-between px-0.5">
                                    <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest">Password</label>
                                    <a href="#" className="text-[11px] font-bold text-primary-600 hover:text-primary-700 transition-colors uppercase tracking-widest">Forgot?</a>
                                </div>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Lock size={18} strokeWidth={2} />
                                    </div>
                                    <input
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-12 pr-4 py-3 bg-white border border-slate-200 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-slate-300"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-bold text-sm transition-all shadow-md shadow-primary-500/10 flex items-center justify-center gap-2 disabled:opacity-50 group active:scale-[0.98]"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        Sign In <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            New here? <Link to="/register" className="text-primary-600 font-bold hover:underline">Create an account</Link>
                        </p>
                    </div>
                </div>

                {/* Footer Info */}
                <div className="mt-10 text-center">
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em] opacity-80">
                        &copy; 2026 PM-AI Intelligence System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Login;
