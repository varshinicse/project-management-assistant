import React, { useState, useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import MainLayout from './components/layout/MainLayout';
import Skeleton from './components/ui/Skeleton';
import './index.css';

// Lazy loading pages for instant navigation
const Login = lazy(() => import('./pages/Login'));
const Register = lazy(() => import('./pages/Register'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Projects = lazy(() => import('./pages/Projects'));
const Team = lazy(() => import('./pages/Team'));
const Analytics = lazy(() => import('./pages/Analytics'));
const ProjectAnalytics = lazy(() => import('./pages/ProjectAnalytics'));
const KanbanBoard = lazy(() => import('./components/KanbanBoard'));
const ChatUI = lazy(() => import('./components/ChatUI'));

const PageFallback = () => (
  <div className="p-8 space-y-8 animate-fade-in">
    <div className="flex justify-between items-center">
      <div className="space-y-2">
        <Skeleton width={200} height={32} />
        <Skeleton width={300} height={16} />
      </div>
      <Skeleton width={120} height={40} className="rounded-xl" />
    </div>
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {[1, 2, 3, 4].map(i => (
        <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-soft space-y-4">
          <Skeleton width={48} height={48} className="rounded-xl" />
          <Skeleton width="60%" height={24} />
          <Skeleton width="40%" height={16} />
        </div>
      ))}
    </div>
    <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-soft h-64">
      <Skeleton width="100%" height="100%" />
    </div>
  </div>
);

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(!!localStorage.getItem('token'));

  useEffect(() => {
    const checkAuth = () => {
      setIsAuthenticated(!!localStorage.getItem('token'));
    };
    window.addEventListener('storage', checkAuth);
    const interval = setInterval(checkAuth, 1000);
    return () => {
      window.removeEventListener('storage', checkAuth);
      clearInterval(interval);
    };
  }, []);

  const handleLogin = () => {
    setIsAuthenticated(true);
  };

  const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
    return isAuthenticated ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Suspense fallback={<PageFallback />}>
        <Routes>
          <Route path="/login" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Login onLogin={handleLogin} />} />
          <Route path="/register" element={isAuthenticated ? <Navigate to="/dashboard" /> : <Register onLogin={handleLogin} />} />

          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute><Projects /></ProtectedRoute>} />
          <Route path="/tasks" element={<ProtectedRoute><KanbanBoard /></ProtectedRoute>} />
          <Route path="/team" element={<ProtectedRoute><Team /></ProtectedRoute>} />
          <Route path="/analytics" element={<ProtectedRoute><Analytics /></ProtectedRoute>} />
          <Route path="/analytics/project/:id" element={<ProtectedRoute><ProjectAnalytics /></ProtectedRoute>} />
          <Route path="/insights" element={<ProtectedRoute><ChatUI /></ProtectedRoute>} />
          <Route path="/settings" element={<ProtectedRoute><div className="p-8 text-center text-slate-500 font-medium whitespace-nowrap overflow-hidden">
            <Skeleton width={200} height={20} className="mx-auto" />
          </div></ProtectedRoute>} />

          <Route path="/kanban/:projectId" element={<ProtectedRoute><KanbanBoard /></ProtectedRoute>} />

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Suspense>
    </Router>
  );
};

export default App;
