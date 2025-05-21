import Link from 'next/link';

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gray-50">
      <h1 className="text-4xl font-bold mb-8 text-blue-600">Welcome to FinTrack</h1>
      <p className="text-lg mb-8 text-center max-w-2xl">
        The smart financial dashboard to manage your transactions and reach your financial goals.
      </p>
      <div className="flex gap-4">
        <Link
          href="/login"
          className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          Login
        </Link>
        <Link
          href="/register"
          className="px-6 py-3 bg-white text-blue-500 border border-blue-500 rounded-lg hover:bg-blue-50 transition-colors"
        >
          Register
        </Link>
      </div>
    </main>
  );
}