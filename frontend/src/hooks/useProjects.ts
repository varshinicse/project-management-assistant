import { useState, useEffect } from 'react';
import { projectService } from '../api/api';

export const useProjects = () => {
    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const response = await projectService.getProjects();
            setProjects(response.data);
            setError(null);
        } catch (err) {
            setError('Failed to fetch projects');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProjects();
    }, []);

    return { projects, loading, error, refresh: fetchProjects };
};
