'use client';

import { useSession, signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [quote, setQuote] = useState({
    text: "In a world where work is often related with chaos and stress",
    highlight: "creative teams deserve delight!"
  });

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/');
    }
  }, [status, router]);

  const handleLogout = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-white text-xl">Loading...</div>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen relative flex items-center justify-center">
      {/* Logout button positioned in the top-right corner */}
      <div className="absolute top-5 right-5 z-50 flex items-center space-x-3">
        <span className="text-white/80 text-sm bg-[#150b25]/30 px-3 py-1.5 rounded-l-full backdrop-blur-md">
          {session?.user?.email}
        </span>
        <button
          onClick={handleLogout}
          className="bg-[#150b25]/30 text-white text-sm px-4 py-1.5 rounded-r-full font-medium transition-all backdrop-blur-md hover:bg-[#150b25]/50"
        >
          Logout
        </button>
      </div>

      {/* Centered content */}
      <div className="text-center max-w-3xl px-6 z-10">
        <p className="text-blue-100/70 text-lg mb-4 font-light tracking-wide">
          {quote.text}
        </p>
        <h1 className="text-white text-5xl md:text-7xl font-normal tracking-tight mb-8 leading-tight">
          {quote.highlight}
        </h1>
        
        <div className="mt-8 inline-flex flex-col items-center">
          <p className="text-blue-100/70 text-sm mb-1">
            Signed in as <span className="text-white/90">{session?.user?.email}</span>
          </p>
          <p className="text-blue-100/50 text-xs">
            Move your mouse to interact with the gradient
          </p>
        </div>
      </div>
    </div>
  );
}