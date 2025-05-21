import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-3xl font-bold mb-4 text-gray-800">404</h2>
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Page Not Found</h3>
        <p className="mb-6 text-gray-600">
          The page you are looking for doesn't exist or has been moved.
        </p>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go Home
        </Link>
      </div>
    </div>
  );
}
