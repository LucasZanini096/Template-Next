'use client'

import { Facebook, Instagram, Linkedin, Twitter } from 'lucide-react';
import Link from 'next/link';
import { Input } from './ui/input';
import { Button } from './ui/button';


export default function Footer() {
  return(
     <footer className="bg-blue-900 dark:bg-blue-950 text-white">
        <div className="container mx-auto px-4 py-12 md:py-24">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">About CellMaster</h3>
              <p className="text-blue-200 dark:text-blue-300">
                CellMaster is your trusted source for the latest smartphones and accessories. We're committed to providing top-notch customer service and expert advice.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">Home</Link></li>
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">Shop</Link></li>
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">About Us</Link></li>
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">Contact</Link></li>
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">FAQ</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Customer Service</h3>
              <ul className="space-y-2">
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">Shipping Policy</Link></li>
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">Returns & Exchanges</Link></li>
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">Terms & Conditions</Link></li>
                <li><Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">Privacy Policy</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect With Us</h3>
              <div className="flex space-x-4">
                <Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">
                  <Facebook className="h-6 w-6" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">
                  <Twitter className="h-6 w-6" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">
                  <Instagram className="h-6 w-6" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-blue-200 dark:text-blue-300 hover:text-white transition-colors duration-300">
                  <Linkedin className="h-6 w-6" />
                  <span className="sr-only">LinkedIn</span>
                </Link>
              </div>
              <div className="mt-4">
                <h4 className="text-sm font-semibold mb-2">Subscribe to our newsletter</h4>
                <form className="flex">
                  <Input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="bg-blue-800 dark:bg-blue-900 text-white border-blue-700 focus:border-blue-500"
                  />
                  <Button type="submit" className="ml-2 bg-blue-700 hover:bg-blue-600 text-white">
                    Subscribe
                  </Button>
                </form>
              </div>
            </div>
          </div>
          <div className="mt-8 pt-8 border-t border-blue-800 dark:border-blue-800">
            <p className="text-center text-blue-200 dark:text-blue-300">
              © {new Date().getFullYear()} CellMaster. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
  )
}