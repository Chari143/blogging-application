import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import type { Blog } from '../types/blog';
import BlogForm from '../components/BlogForm';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3003';

const EditBlog = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [blog, setBlog] = useState<Blog | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    useEffect(() => {
        fetchBlog();
    }, [id]);

    const fetchBlog = async () => {
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
                const foundBlog = data.blogs.find((b: Blog) => b.id === id);

                if (!foundBlog) {
                    setError('Blog not found');
                    return;
                }

                setBlog(foundBlog);
            } else {
                setError('Failed to load blog');
            }
        } catch (err: any) {
            setError('Failed to load blog');
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading blog...</div>
            </div>
        );
    }

    if (error || !blog) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-center">
                    <p className="text-xl text-red-600 mb-4">{error || 'Blog not found'}</p>
                    <button
                        onClick={() => navigate('/my-blogs')}
                        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                    >
                        Back to My Blogs
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <BlogForm
                    initialData={{
                        id: blog.id,
                        title: blog.title,
                        category: blog.category,
                        content: blog.content,
                        image: blog.image
                    }}
                    isEdit
                />
            </div>
        </div>
    );
};

export default EditBlog;
