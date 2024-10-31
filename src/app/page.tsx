'use client'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../components/ui/form";


import { useState, useEffect } from 'react'
import Image from 'next/image';
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import { Smartphone, ShieldCheck, Truck, HeadphonesIcon, Mail, Phone, MapPin } from "lucide-react"
import { motion } from "framer-motion"
import { Bar, BarChart, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "../components/ui/chart"
import Iphone13 from '../../public/Iphone13.png';
import Pixel6 from '../../public/Pixel6.jpg';
import Iphone16 from '../../public/Iphone16.jpg';
import S21 from '../../public/Galaxy21.jpg';
import Images from '../../public/Iphone14.png'
import { useToast } from "../hooks/use-toast"
import { v4 as uuidV4 } from "uuid";
import { useForm } from 'react-hook-form';
import { FirestoreRepository } from '../api/firebase/firebase-repository';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";


const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

const salesData = [
  { month: "Jan", sales: 1000 },
  { month: "Feb", sales: 1200 },
  { month: "Mar", sales: 900 },
  { month: "Apr", sales: 1500 },
  { month: "May", sales: 1800 },
  { month: "Jun", sales: 2000 },
]

const customerSatisfactionData = [
  { year: 2019, satisfaction: 85 },
  { year: 2020, satisfaction: 88 },
  { year: 2021, satisfaction: 90 },
  { year: 2022, satisfaction: 92 },
  { year: 2023, satisfaction: 95 },
]


interface UserMenu{
  userName: string;
  userEmail: string;
  userMessage: string
}

const formSchema = z.object({
  userName: z.string().min(1, {message: "Campo obrigatório"}),
  userEmail: z.string().min(1, {message: "Campo obrigatório"}).email({
      message: "Deve ser um email válido"
  }),
  userMessage: z.string().min(1, {message: "Campo obrigatório"})
})

type FormSchema = z.infer<typeof formSchema>;

export default function LandingPage() {

  const [mounted, setMounted] = useState(false)
  const { toast } = useToast();

  const form = useForm<FormSchema>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: FormSchema) {
    try {
      const collectionName = 'FormsHomePage';
      const baseFirestorm = new FirestoreRepository<UserMenu>();
      const idUser = uuidV4();
      await baseFirestorm.create(collectionName, idUser, data);
  
      console.log("Document successfully created!", baseFirestorm);
      toast({ title: "Success", description: "Your form was successfully submitted!" });
    } catch (error) {
      console.error("Error creating document: ", error);
      toast({ title: "Error", description: "There was an error submitting the form." });
    }
  }

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <div className="min-h-screen bg-white dark:bg-gray-900" /> 
  }

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-1">
        <motion.section 
          className="w-full py-12 md:py-24 lg:py-32 xl:py-48 bg-blue-900 dark:bg-blue-950 text-white"
          initial="initial"
          animate="animate"
          variants={fadeInUp}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-[1fr_400px] lg:gap-12 xl:grid-cols-[1fr_600px]">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                    Experience the Future of Mobile Technology
                  </h1>
                  <p className="max-w-[600px] text-blue-200 md:text-xl">
                    Discover cutting-edge smartphones that redefine connectivity and innovation. Your perfect device awaits.
                  </p>
                </div>
                <div className="flex flex-col gap-2 min-[400px]:flex-row">
                  <Button className="bg-white text-blue-900 hover:bg-blue-100 dark:bg-blue-300 dark:text-blue-900 dark:hover:bg-blue-200 transition-colors duration-300">
                    Shop Now
                  </Button>
                  <Button variant="outline" className="text-white border-white hover:bg-white hover:text-blue-900 dark:border-blue-300 dark:hover:bg-blue-300 dark:hover:text-blue-900 transition-colors duration-300">
                    Learn More
                  </Button>
                </div>
              </div>
              <Image
                alt="Latest Smartphone"
                className="mx-auto aspect-video overflow-hidden rounded-xl object-cover object-center sm:w-full lg:order-last"
                height="550"
                src={Iphone16}
                width="550"
              />
            </div>
          </div>
        </motion.section>
        <motion.section 
          className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="container px-4 md:px-8">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-blue-900 dark:text-blue-100">About Us</h2>
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <p className="text-blue-800 dark:text-blue-200 text-lg">
                  At CellMaster, we're passionate about connecting people through cutting-edge mobile technology. With years of experience in the industry, we've built a reputation for offering the latest and greatest smartphones, coupled with unparalleled customer service.
                </p>
                <p className="text-blue-800 dark:text-blue-200 text-lg">
                  Our team of experts is dedicated to helping you find the perfect device that fits your lifestyle and needs. We believe that the right smartphone can enhance your daily life, and we're here to guide you through the ever-evolving world of mobile technology.
                </p>
              </div>
              <div className="mt-4 lg:mt-0 flex justify-center">
                <Image
                  alt="CellMaster Store"
                  className="aspect-[4/3] overflow-hidden rounded-lg object-cover"
                  height="800"
                  src={Images}
                  width="600"
                />
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section 
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-blue-900 dark:text-blue-100">Featured Phones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { title: "iPhone 13 Pro", price: "$999", image: Iphone13 },
                { title: "Samsung Galaxy S21", price: "$799", image: S21 },
                { title: "Google Pixel 6", price: "$699", image: Pixel6}
              ].map((phone, index) => (
                <motion.div key={index} whileHover={{ scale: 1.05 }} transition={{ duration: 0.3 }}>
                  <Card className="bg-white dark:bg-blue-800">
                    <CardHeader>
                      <CardTitle className="text-blue-900 dark:text-blue-100">{phone.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <Image
                        alt={phone.title}
                        className="w-full h-60 object-contain rounded-md"
                        height="300"
                        src={phone.image}
                        style={{
                          aspectRatio: "300/300",
                          objectFit: "contain",
                        }}
                        width="300"
                      />
                      <p className="text-2xl font-bold mt-4 text-blue-900 dark:text-blue-100">{phone.price}</p>
                    </CardContent>
                    <CardFooter>
                      <Button className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">Add to Cart</Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section 
          className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={stagger}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-blue-900 dark:text-blue-100">Why Choose Us</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { icon: ShieldCheck, title: "Secure Payments", description: "Your transactions are always safe and encrypted" },
                { icon: Truck, title: "Fast Delivery", description: "Get your phone delivered to your doorstep quickly" },
                { icon: HeadphonesIcon, title: "24/7 Support", description: "Our customer service team is always here to help" },
                { icon: Smartphone, title: "Wide Selection", description: "Choose from a variety of top brands and models" }
              ].map((item, index) => (
                <motion.div key={index} className="flex flex-col items-center text-center" variants={fadeInUp}>
                  <item.icon className="h-12 w-12 mb-4 text-blue-800 dark:text-blue-400" />
                  <h3 className="text-xl font-bold mb-2 text-blue-900 dark:text-blue-100">{item.title}</h3>
                  <p className="text-blue-800 dark:text-blue-200">{item.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
        <motion.section 
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-center mb-8 text-blue-900 dark:text-blue-100">Our Performance</h2>
            <div className="grid gap-6 lg:grid-cols-2">
              <Card>
                <CardHeader>
                  <CardTitle>Monthly Sales</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      sales: {
                        label: "Sales",
                        color: "#1e3a8a",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={salesData}>
                        <XAxis dataKey="month" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
                      </BarChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  
                  <CardTitle>Customer Satisfaction</CardTitle>
                </CardHeader>
                <CardContent>
                  <ChartContainer
                    config={{
                      satisfaction: {
                        label: "Satisfaction",
                        color: "#1e3a8a",
                      },
                    }}
                    className="h-[300px]"
                  >
                    <ResponsiveContainer width="100%" height="100%">
                      <LineChart data={customerSatisfactionData}>
                        <XAxis dataKey="year" />
                        <YAxis />
                        <ChartTooltip content={<ChartTooltipContent />} />
                        <Line type="monotone" dataKey="satisfaction" stroke="var(--color-satisfaction)" />
                      </LineChart>
                    </ResponsiveContainer>
                  </ChartContainer>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
        <motion.section 
          className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900 dark:text-blue-100">Ready to Upgrade?</h2>
                <p className="mx-auto max-w-[600px] text-blue-800 dark:text-blue-200 md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Join our mailing list to receive exclusive offers and be the first to know about new arrivals.
                </p>
              </div>
              <div className="w-full max-w-sm space-y-2">
                <form className="flex space-x-2">
                  <Input className="max-w-lg flex-1 bg-white dark:bg-blue-800 text-blue-900 dark:text-blue-100" placeholder="Enter your email" type="email" />
                  <Button type="submit" className="bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300 transition-colors duration-300">Subscribe</Button>
                </form>
              </div>
            </div>
          </div>
        </motion.section>
        <motion.section 
          className="w-full py-12 md:py-24 lg:py-32 bg-white dark:bg-gray-900"
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          variants={fadeInUp}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl text-blue-900 dark:text-blue-100">Contact Us</h2>
                <p className="text-blue-800 dark:text-blue-200">
                  We're here to help and answer any question you might have. We look forward to hearing from you.
                </p>
                <div className="space-y-2">
                  <div className="flex items-center text-blue-800 dark:text-blue-200">
                    <Mail className="w-4 h-4 mr-2" />
                    <span>contact@cellmaster.com</span>
                  </div>
                  <div className="flex items-center text-blue-800 dark:text-blue-200">
                    <Phone className="w-4 h-4 mr-2" />
                    <span>+1 (555) 123-4567</span>
                  </div>
                  <div className="flex items-center text-blue-800 dark:text-blue-200">
                    <MapPin className="w-4 h-4 mr-2" />
                    <span>123 Phone Street, Mobile City, 12345</span>
                  </div>
                </div>
              </div>
              <Card className="bg-white dark:bg-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100">Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} >
                      <div className='grid gap-4'>
                          <FormField
                                      control={form.control}
                                      name="userName"
                                      render={({ field }) => (
                                          <FormItem>
                                              <div className='grid gap-2'>
                                                <FormLabel className='text-blue-900 dark:text-blue-100'>Name</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'   />
                                                </FormControl>
                                              </div>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                          <FormField
                                      control={form.control}
                                      name="userEmail"
                                      render={({ field }) => (
                                          <FormItem>
                                              <div className='grid gap-2'>
                                                <FormLabel className='text-blue-900 dark:text-blue-100'>Email</FormLabel>
                                                <FormControl>
                                                    <Input {...field} className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'  />
                                                </FormControl>
                                              </div>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                          <FormField
                                      control={form.control}
                                      name="userMessage"
                                      render={({ field }) => (
                                          <FormItem>
                                              <div className='grid gap-2'>
                                                <FormLabel className='text-blue-900 dark:text-blue-100'>Message</FormLabel>
                                                <FormControl>
                                                    <Textarea {...field} className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'  />
                                                </FormControl>
                                              </div>
                                              <FormMessage />
                                          </FormItem>
                                      )}
                                  />
                           <Button type="submit" className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">Send Message</Button>
                        </div>
                    </form>
                  </Form>
                </CardContent>
              </Card>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
    )
  }