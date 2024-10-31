'use client'

import { useState } from 'react'
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Textarea } from "../../components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "../../components/ui/card"
import { Smartphone, Sun, Moon, ShoppingCart, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"

export default function Contact() {
  const { theme, setTheme } = useTheme()
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setFormStatus('submitting')
    // Simulating form submission
    await new Promise(resolve => setTimeout(resolve, 1000))
    setFormStatus('submitted')
  }

  return (
      <main className="flex-1 w-full">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900">
          <div className="container px-4 md:px-6">
            <motion.h1 
              className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-blue-900 dark:text-blue-100"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              Contact Us
            </motion.h1>
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-white dark:bg-blue-800">
                  <CardHeader>
                    <CardTitle className="text-blue-900 dark:text-blue-100">Send us a message</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <form onSubmit={handleSubmit}>
                      <div className="grid gap-4">
                        <div className="grid gap-2">
                          <label htmlFor="name" className="text-sm font-medium text-blue-900 dark:text-blue-100">Name</label>
                          <Input id="name" placeholder="Enter your name" required className="bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100" />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="email" className="text-sm font-medium text-blue-900 dark:text-blue-100">Email</label>
                          <Input id="email" placeholder="Enter your email" type="email" required className="bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100" />
                        </div>
                        <div className="grid gap-2">
                          <label htmlFor="message" className="text-sm font-medium text-blue-900 dark:text-blue-100">Message</label>
                          <Textarea id="message" placeholder="Enter your message" required className="bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100" />
                        </div>
                        <Button 
                          type="submit" 
                          className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300"
                          disabled={formStatus === 'submitting'}
                        >
                          {formStatus === 'submitting' ? 'Sending...' : 'Send Message'}
                        </Button>
                        {formStatus === 'submitted' && (
                          <p className="text-green-600 dark:text-green-400 text-sm">Thank you for your message. We'll get back to you soon!</p>
                        )}
                        {formStatus === 'error' && (
                          <p className="text-red-600 dark:text-red-400 text-sm">There was an error sending your message. Please try again.</p>
                        )}
                      </div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                className="space-y-6"
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-white dark:bg-blue-800">
                  <CardHeader>
                    <CardTitle className="text-blue-900 dark:text-blue-100">Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Mail className="h-5 w-5 text-blue-800 dark:text-blue-400" />
                        <span className="text-blue-900 dark:text-blue-100">contact@cellmaster.com</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <Phone className="h-5 w-5 text-blue-800 dark:text-blue-400" />
                        <span className="text-blue-900 dark:text-blue-100">+1 (555) 123-4567</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <MapPin className="h-5 w-5 text-blue-800 dark:text-blue-400" />
                        <span className="text-blue-900 dark:text-blue-100">123 Phone Street, Mobile City, 12345</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
                <Card className="bg-white dark:bg-blue-800">
                  <CardHeader>
                    <CardTitle className="text-blue-900 dark:text-blue-100">Our Location</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="aspect-video relative">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3022.2412648718453!2d-73.98784368459395!3d40.74844097932818!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c259a9b3117469%3A0xd134e199a405a163!2sEmpire%20State%20Building!5e0!3m2!1sen!2sus!4v1635518138459!5m2!1sen!2sus"
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        allowFullScreen
                        loading="lazy"
                        className="absolute inset-0"
                      ></iframe>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
  )
}