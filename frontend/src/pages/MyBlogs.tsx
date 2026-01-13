import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import type { Blog } from '../types/blog';
import { useAuth } from '../context/AuthContext';
import BlogCard from '../components/BlogCard';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

const MyBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const { user } = useAuth();

    useEffect(() => {
        fetchMyBlogs();
    }, []);

    const fetchMyBlogs = async () => {
        try {
            setLoading(true);
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/blogs`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                const data = await response.json();
                const myBlogs = data.blogs.filter((blog: Blog) => blog.userId === user?.id);
                setBlogs(myBlogs);
            } else {
                setError('Failed to load your blogs');
            }
        } catch (err: any) {
            setError('Failed to load your blogs');
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (id: string) => {
        navigate(`/edit-blog/${id}`);
    };

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this blog?')) {
            return;
        }

        try {
            const token = localStorage.getItem('token');
            const response = await fetch(`${API_URL}/blogs/${id}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });

            if (response.ok) {
                setBlogs(blogs.filter(blog => blog.id !== id));
            } else {
                const data = await response.json();
                alert(data.message || 'Failed to delete blog');
            }
        } catch (err: any) {
            alert('Failed to delete blog');
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading your blogs...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <div className="flex justify-between items-center mb-8">
                    <h1 className="text-4xl font-bold text-gray-800">My Blogs</h1>
                    <button
                        onClick={() => navigate('/create-blog')}
                        className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                    >
                        + Create New Blog
                    </button>
                </div>

                {error && (
                    <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {blogs.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-md text-center">
                        <p className="text-xl text-gray-500 mb-4">You haven't created any blogs yet</p>
                        <button
                            onClick={() => navigate('/create-blog')}
                            className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Create Your First Blog
                        </button>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {blogs.map((blog) => (
                            <BlogCard
                                key={blog.id}
                                blog={blog}
                                showActions
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default MyBlogs;
