import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const { user, logout, isAuthenticated } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-gradient-to-r from-indigo-600 to-purple-600 px-4 py-3 text-white shadow-lg">
            <div className="max-w-7xl mx-auto flex justify-between items-center">
                <h1
                    className="text-xl font-bold cursor-pointer hover:opacity-90 transition-opacity"
                    onClick={() => navigate('/')}
                >
                    BlogApp
                </h1>

                <div className="flex items-center gap-4">
                    {isAuthenticated ? (
                        <>
                            <span className="text-sm opacity-90">Hi, {user?.username}</span>
                            <button
                                onClick={handleLogout}
                                className="px-4 py-2 text-sm font-medium bg-white/20 rounded-md hover:bg-white/30 transition-colors"
                            >
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <button
                                onClick={() => navigate('/login')}
                                className="px-4 py-2 text-sm font-medium border border-white/30 rounded-md hover:bg-white/10 transition-colors"
                            >
                                Login
                            </button>
                            <button
                                onClick={() => navigate('/signup')}
                                className="px-4 py-2 text-sm font-medium bg-white text-indigo-600 rounded-md hover:bg-gray-100 transition-colors"
                            >
                                Sign Up
                            </button>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
