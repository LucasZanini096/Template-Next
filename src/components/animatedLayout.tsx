// src/components/AnimatedLayout.tsx
"use client";

import { motion } from "framer-motion";
import { usePathname } from 'next/navigation'; // Para determinar a rota atual
import NavBar from './navbar';
import Footer from './footer';


export default function AnimatedLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  
  const isAdminRoute = pathname.startsWith('/admin'); // Confere se está em admin
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
      {!isAdminRoute && <NavBar />}
      <motion.div
        className=" flex-grow flex flex-col items-center w-full"
        initial={{ y: -50 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {children}
      </motion.div>
      {!isAdminRoute && <Footer />}
    </div>
  );
}
