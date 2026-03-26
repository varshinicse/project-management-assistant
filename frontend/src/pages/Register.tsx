import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { authService } from '../api/api';
import { Bot, User, Mail, Lock, ArrowRight, AlertCircle, ShieldCheck } from 'lucide-react';

const Register = ({ onLogin }: { onLogin?: () => void }) => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
    });
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        if (formData.password !== formData.confirmPassword) {
            setError('Passwords do not match');
            return;
        }

        setLoading(true);
        try {
            const response = await authService.register(formData);
            const { access_token } = response.data;

            // Auto login after registration
            localStorage.setItem('token', access_token);
            if (onLogin) onLogin();

            navigate('/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.detail || 'Registration failed. Try a different username.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#F8FAFC] flex items-center justify-center p-6 sm:p-8">
            <div className="w-full max-w-[480px] animate-in fade-in slide-in-from-bottom-4 duration-700">
                {/* Header / Logo */}
                <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-12 h-12 bg-white rounded-xl shadow-soft border border-slate-100 mb-4 group transition-transform hover:scale-110">
                        <Bot size={24} className="text-primary-600" strokeWidth={2.5} />
                    </div>
                    <h1 className="text-2xl font-bold text-slate-900 tracking-tight">Create Account</h1>
                    <p className="text-slate-500 text-sm mt-1.5 font-medium">Join the PM-AI intelligence network</p>
                </div>

                {/* Register Card */}
                <div className="bg-white rounded-lg shadow-soft border border-slate-100 overflow-hidden">
                    <div className="p-8 sm:p-10">
                        {error && (
                            <div className="mb-6 p-4 bg-rose-50 border border-rose-100 rounded-lg flex items-start gap-3 animate-in fade-in slide-in-from-top-2">
                                <AlertCircle size={18} className="text-rose-500 shrink-0 mt-0.5" />
                                <p className="text-xs font-semibold text-rose-600 leading-relaxed">{error}</p>
                            </div>
                        )}

                        <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={handleSubmit}>
                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Username</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <User size={16} strokeWidth={2} />
                                    </div>
                                    <input
                                        name="username"
                                        type="text"
                                        required
                                        placeholder="Username"
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-slate-300"
                                        value={formData.username}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 col-span-2 md:col-span-1">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Email</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Mail size={16} strokeWidth={2} />
                                    </div>
                                    <input
                                        name="email"
                                        type="email"
                                        required
                                        placeholder="Email"
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-slate-300"
                                        value={formData.email}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 col-span-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Password</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <Lock size={16} strokeWidth={2} />
                                    </div>
                                    <input
                                        name="password"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-slate-300"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2 col-span-2">
                                <label className="text-[11px] font-bold text-slate-400 uppercase tracking-widest ml-0.5">Confirm Password</label>
                                <div className="relative">
                                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                                        <ShieldCheck size={16} strokeWidth={2} />
                                    </div>
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        required
                                        placeholder="••••••••"
                                        className="w-full pl-11 pr-4 py-2.5 bg-white border border-slate-200 rounded-md text-sm font-medium transition-all focus:outline-none focus:ring-2 focus:ring-primary-500/20 focus:border-primary-500 placeholder:text-slate-300"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </div>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full col-span-2 mt-4 py-3.5 bg-primary-600 hover:bg-primary-700 text-white rounded-md font-bold text-sm transition-all shadow-md shadow-primary-500/10 flex items-center justify-center gap-2 disabled:opacity-50 group active:scale-[0.98]"
                            >
                                {loading ? (
                                    <span className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin"></span>
                                ) : (
                                    <>
                                        Create Account <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
                                    </>
                                )}
                            </button>
                        </form>
                    </div>

                    <div className="px-8 py-5 bg-slate-50 border-t border-slate-100 text-center">
                        <p className="text-sm font-medium text-slate-500">
                            Already have an account? <Link to="/login" className="text-primary-600 font-bold hover:underline">Sign in instead</Link>
                        </p>
                    </div>
                </div>

                <div className="mt-8 text-center text-slate-400 flex items-center justify-center gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] opacity-80">
                        AI Powered Project Management System
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
