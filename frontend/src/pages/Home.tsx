import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Home = () => {
    const { user } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 flex items-center justify-center p-8">
            <div className="bg-white p-12 rounded-xl shadow-xl text-center max-w-2xl">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">
                    Welcome, {user?.name}!
                </h1>

                <div className="flex flex-col gap-4">
                    <button
                        onClick={() => navigate('/blogs')}
                        className="p-6 bg-blue-50 hover:bg-blue-100 rounded-lg transition-colors"
                    >
                        <div className="font-semibold text-gray-800">Browse All Blogs</div>
                    </button>

                    <button
                        onClick={() => navigate('/create-blog')}
                        className="p-6 bg-green-50 hover:bg-green-100 rounded-lg transition-colors"
                    >
                        <div className="font-semibold text-gray-800">Create New Blog</div>
                    </button>

                    <button
                        onClick={() => navigate('/my-blogs')}
                        className="p-6 bg-purple-50 hover:bg-purple-100 rounded-lg transition-colors"
                    >
                        <div className="font-semibold text-gray-800">My Blogs</div>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Home;
