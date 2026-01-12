import { useState, useEffect } from 'react';
import type { Blog } from '../types/blog';
import BlogCard from '../components/BlogCard';

const API_URL = 'http://localhost:5000';
const categories = ['All', 'Travel', 'Tech', 'Finance', 'Career', 'Lifestyle', 'Food', 'Health', 'Education'];

const AllBlogs = () => {
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [filteredBlogs, setFilteredBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('All');
    const [authorSearch, setAuthorSearch] = useState('');

    useEffect(() => {
        fetchBlogs();
    }, []);

    useEffect(() => {
        filterBlogs();
    }, [selectedCategory, authorSearch, blogs]);

    const fetchBlogs = async () => {
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
                setBlogs(data.blogs);
                setFilteredBlogs(data.blogs);
            } else {
                setError('Failed to load blogs');
            }
        } catch (err: any) {
            setError('Failed to load blogs');
        } finally {
            setLoading(false);
        }
    };

    const filterBlogs = () => {
        let filtered = blogs;

        if (selectedCategory !== 'All') {
            filtered = filtered.filter(blog => blog.category === selectedCategory);
        }

        if (authorSearch.trim()) {
            filtered = filtered.filter(blog =>
                blog.author.toLowerCase().includes(authorSearch.toLowerCase())
            );
        }

        setFilteredBlogs(filtered);
    };

    const clearFilters = () => {
        setSelectedCategory('All');
        setAuthorSearch('');
    };

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="text-xl text-gray-600">Loading blogs...</div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-7xl mx-auto">
                <h1 className="text-4xl font-bold text-gray-800 mb-8">All Blogs</h1>

                {/* Filters */}
                <div className="bg-white p-6 rounded-lg shadow-md mb-8">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Category
                            </label>
                            <select
                                value={selectedCategory}
                                onChange={(e) => setSelectedCategory(e.target.value)}
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {categories.map((cat) => (
                                    <option key={cat} value={cat}>{cat}</option>
                                ))}
                            </select>
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                                Author
                            </label>
                            <input
                                type="text"
                                value={authorSearch}
                                onChange={(e) => setAuthorSearch(e.target.value)}
                                placeholder="Search by author name"
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            />
                        </div>

                        <div className="flex items-end">
                            <button
                                onClick={clearFilters}
                                className="w-full px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>

                    <div className="mt-4 text-sm text-gray-600">
                        Showing {filteredBlogs.length} of {blogs.length} blogs
                    </div>
                </div>

                {/* Error */}
                {error && (
                    <div className="bg-red-100 text-red-600 p-4 rounded-lg mb-6">
                        {error}
                    </div>
                )}

                {/* Blogs Grid */}
                {filteredBlogs.length === 0 ? (
                    <div className="bg-white p-12 rounded-lg shadow-md text-center">
                        <p className="text-xl text-gray-500">No blogs found</p>
                        <p className="text-gray-400 mt-2">Try adjusting your filters</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredBlogs.map((blog) => (
                            <BlogCard key={blog.id} blog={blog} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default AllBlogs;
