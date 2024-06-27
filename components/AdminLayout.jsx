"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { auth } from '../firebaseConfig';
import { onAuthStateChanged } from 'firebase/auth';

const AdminLayout = ({ children }) => {
  const router = useRouter();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const unsubscribe = onAuthStateChanged(auth, (user) => {
        if (!user) {
          router.push('/admin/login');
        }
      });

      return () => unsubscribe();
    }
  }, [router]);

  return (
    <div>
      <nav className="bg-gray-800 p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="text-white font-bold text-xl">Admin Panel</div>
          <div className="flex space-x-4">
            <Link href="/admin/upload" className="text-gray-300 hover:text-white">Manage Featured Music</Link>
            <Link href="/admin/shows" className="text-gray-300 hover:text-white">Manage Upcoming Shows</Link>
            <Link href="/" className="text-gray-300 hover:text-white">Return Home</Link>
          </div>
        </div>
      </nav>
      <main className="p-4">
        {children}
      </main>
    </div>
  );
};

export default AdminLayout;
