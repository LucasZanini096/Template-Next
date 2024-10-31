'use client'

import { motion } from "framer-motion"
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "../../src/components/ui/button"
import { Smartphone, Sun, Moon, ShoppingCart } from "lucide-react"
import { useEffect, useState } from 'react'


export default function NavBar() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900" /> 
  }

  return(
    <motion.header 
    className="px-4 lg:px-6 h-14 flex items-center border-b border-gray-200 dark:border-gray-700"
    initial={{ y: -50 }}
    animate={{ y: 0 }}
    transition={{ type: "spring", stiffness: 300, damping: 30 }}
  >
    <Link className="flex items-center justify-center" href="/">
      <Smartphone className="h-6 w-6 text-blue-800 dark:text-blue-400" />
      <span className="ml-2 text-lg font-bold text-blue-800 dark:text-blue-400">CellMaster</span>
    </Link>
    <nav className="ml-auto flex gap-4 sm:gap-6">
      <Link className="text-sm font-medium hover:text-blue-800 dark:hover:text-blue-400 hover:underline underline-offset-4" href="/">
        Home
      </Link>
      <Link className="text-sm font-medium hover:text-blue-800 dark:hover:text-blue-400 hover:underline underline-offset-4" href="/products">
        Products
      </Link>
      <Link className="text-sm font-medium hover:text-blue-800 dark:hover:text-blue-400 hover:underline underline-offset-4" href="/contact">
        Contact
      </Link>
    </nav>
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="Toggle Theme"
        className="ml-4 text-blue-800 dark:text-blue-400"
        onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      >
        {theme === 'dark' ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
      </Button>
    </motion.div>
    <motion.div
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
    >
      <Button
        variant="ghost"
        size="icon"
        aria-label="Shopping Cart"
        className="ml-4 text-blue-800 dark:text-blue-400"
      >
        <ShoppingCart className="h-5 w-5" />
      </Button>
    </motion.div>
  </motion.header>

  )
  
  
}