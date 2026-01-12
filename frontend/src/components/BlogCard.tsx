import type { Blog } from '../types/blog';

interface BlogCardProps {
    blog: Blog;
    showActions?: boolean;
    onEdit?: (id: string) => void;
    onDelete?: (id: string) => void;
}

const BlogCard = ({ blog, showActions = false, onEdit, onDelete }: BlogCardProps) => {
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow flex flex-col h-full">
            {blog.image && (
                <img
                    src={blog.image}
                    alt={blog.title}
                    className="w-full h-48 object-cover"
                />
            )}
            <div className="p-5 flex flex-col flex-1">
                <div className="flex items-center gap-2 mb-2">
                    <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-semibold rounded-full">
                        {blog.category}
                    </span>
                    <span className="text-sm text-gray-500">
                        {formatDate(blog.createdAt)}
                    </span>
                </div>

                <h3 className="text-xl font-bold text-gray-800 mb-2 line-clamp-2">
                    {blog.title}
                </h3>

                <p className="text-sm text-gray-600 mb-2">
                    By <span className="font-medium">{blog.author}</span>
                </p>

                <div className="flex-1 mb-4 overflow-y-auto max-h-48 pr-2">
                    <p className="text-gray-700 whitespace-pre-wrap">
                        {blog.content}
                    </p>
                </div>

                {showActions && (
                    <div className="flex gap-2 mt-auto">
                        <button
                            onClick={() => onEdit?.(blog.id)}
                            className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
                        >
                            Edit
                        </button>
                        <button
                            onClick={() => onDelete?.(blog.id)}
                            className="flex-1 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
                        >
                            Delete
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BlogCard;
