import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

const api = axios.create({
    baseURL: API_BASE_URL,
});

api.interceptors.request.use((config) => {
    const token = localStorage.getItem('token');
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
});

export const authService = {
    login: (credentials: any) => api.post('/auth/login', credentials),
    register: (userData: any) => api.post('/auth/register', userData),
};

export const projectService = {
    getProjects: () => api.get('/projects/'),
    createProject: (project: any) => api.post('/projects/', project),
    getTasks: (projectId: string) => api.get(`/projects/${projectId}/tasks`),
};

export const taskService = {
    createTask: (task: any, projectId: string) => api.post(`/tasks/?project_id=${projectId}`, task),
    updateTask: (taskId: string, update: any) => api.put(`/tasks/${taskId}`, update),
    deleteTask: (taskId: string) => api.delete(`/tasks/${taskId}`),
};

export const chatService = {
    sendMessage: (message: string, projectId?: string) =>
        api.post('/chat/', { message, project_id: projectId }),
};

export default api;
