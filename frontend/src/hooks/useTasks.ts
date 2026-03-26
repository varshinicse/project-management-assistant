import { useState, useEffect } from 'react';
import { projectService, taskService } from '../api/api';

export const useTasks = (projectId: string | undefined) => {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        if (!projectId) return;
        try {
            setLoading(true);
            const response = await projectService.getTasks(projectId);
            setTasks(response.data);
        } catch (err) {
            console.error('Failed to fetch tasks');
        } finally {
            setLoading(false);
        }
    };

    const updateTask = async (taskId: string, update: any) => {
        try {
            await taskService.updateTask(taskId, update);
            await fetchTasks();
        } catch (err) {
            console.error('Failed to update task');
        }
    };

    const deleteTask = async (taskId: string) => {
        try {
            await taskService.deleteTask(taskId);
            await fetchTasks();
        } catch (err) {
            console.error('Failed to delete task');
        }
    };

    useEffect(() => {
        fetchTasks();
    }, [projectId]);

    return { tasks, loading, updateTask, deleteTask, refresh: fetchTasks };
};
