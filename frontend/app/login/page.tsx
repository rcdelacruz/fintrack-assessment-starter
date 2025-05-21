export default function LoginPage() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4 bg-gray-50">
      <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold mb-6 text-center text-blue-600">Login to FinTrack</h1>
        <p className="text-center text-gray-600 mb-4">
          This is a simplified login page for the assessment. The authentication implementation is part of the assessment.
        </p>
        <div className="mt-4 text-center">
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Log In
          </button>
        </div>
      </div>
    </div>
  );
}