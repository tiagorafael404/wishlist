'use client';

import { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import { UnifiedAuthForm } from '@/components/auth/UnifiedAuthForm';
import { Loader2 } from 'lucide-react';

export default function HomePage() {
  const [isAuthModalOpen, setAuthModalOpen] = useState(false);
  const { user, loading } = useAuth();
  const router = useRouter();

  if (loading) {
    return (
      <div className="flex h-screen w-full items-center justify-center bg-background">
        <Loader2 className="h-10 w-10 animate-spin text-primary" />
      </div>
    );
  }
  
  const handleProfileClick = () => {
    router.push('/profile');
  };

  return (
    <div className="bg-background text-foreground min-h-screen">
      <div className="navbar container mx-auto p-4">
        <div className="menu flex justify-end">
          <ul className="flex items-center space-x-4">
            <li><a className="font-mono hover:underline">about</a></li>
            <li>
            {user ? (
                <button onClick={handleProfileClick} className="font-mono hover:underline">
                  profile
                </button>
            ) : (
                <button id="signup-button" onClick={() => setAuthModalOpen(true)} className="font-mono hover:underline">
                  sign up
                </button>
            )}
            </li>
          </ul>
        </div>
      </div>

      <main className="container mx-auto text-center py-20">
        <h1 className="text-6xl font-bold font-['Fjalla_One',_sans-serif]">vazerk</h1>
      </main>

      {isAuthModalOpen && (
        <div 
          id="signup" 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
        >
          <UnifiedAuthForm onClose={() => setAuthModalOpen(false)} />
        </div>
      )}
    </div>
  );
}
