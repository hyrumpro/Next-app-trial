import UploadForm from '../../components/UploadForm';

const FacePage: React.FC = () => {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-4">
            <header className="w-full max-w-2xl text-center mb-8">
                <h1 className="text-4xl font-bold text-gray-800 mb-2">Face Recognition Service</h1>
                <p className="text-gray-600">Upload a photo to identify faces using our AI-powered service.</p>
            </header>
            <main className="w-full max-w-2xl bg-white p-6 rounded-lg shadow-md">
                <UploadForm />
            </main>
            <footer className="w-full max-w-2xl text-center mt-8">
                <p className="text-gray-500">© 2024 Face Recognition Service. All rights reserved.</p>
            </footer>
        </div>
    );
};

export default FacePage;