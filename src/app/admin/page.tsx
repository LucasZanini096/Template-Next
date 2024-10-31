'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { motion } from "framer-motion"
import 'react-toastify/dist/ReactToastify.css'
import { AuthAPI } from '../../api/firebase/auth-api'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../components/ui/form";
import { useRouter } from 'next/navigation'; // Importe o useRouter
import { useToast } from '../../hooks/use-toast'

const authAPI = new AuthAPI();

const loginSchema = z.object({
    email: z.string().email({
        message: "Email inválido",
    }),
    password: z
        .string()
        .min(6, {
            message: "Senha deve ter pelo menos 6 caracteres",
        })
        .max(16, {
            message: "Senha deve ter até 16 caracteres",
        }),
});

type LoginSchema = z.infer<typeof loginSchema>;



export default function Admin() {  
  const [isMounted, setIsMounted] = useState(false); // Verificação da montagem
  const [isLoading, setIsLoading] = useState(false)
  const { toast } = useToast();
  const router = useRouter(); // Crie uma instância do useRouter
  console.log(router);

  const form = useForm<LoginSchema>({
    resolver: zodResolver(loginSchema)
});

useEffect(() => {
  setIsMounted(true); // Componente foi montado
}, []);

async function onSignIn({ email, password }: LoginSchema) {
  setIsLoading(true);
  const user = await authAPI.signInWithEmailAndPassword(email, password);

  if(user && isMounted) {
      console.log("Seja bem vindo")
      toast({
        title: `Seja bem-vindo, Admin`,
    });
      router.push('/admin/registerProduct'); // Redirecione após o login bem-sucedido
  }

   
}

async function onSignInWithGoogle() {
  const user = await authAPI.signInWithGoogle();

  if(user && isMounted ){
      console.log("Seja bem vindo")
      router.push('/admin/registerProduct'); // Redirecione após o login bem-sucedido
  }

  // toast({
  //     title: `Seja bem-vindo, ${user.displayName}!`,
  // });
}

  return (
      <main className="flex-1 w-full flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="w-full max-w-md"
        >
          <Card className="bg-white dark:bg-blue-800">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-center text-blue-900 dark:text-blue-100">Welcome Back</CardTitle>
              <CardDescription className="text-center text-blue-800 dark:text-blue-200">
                Please sign in to your account
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSignIn)}
                        className="space-y-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel>E-mail</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="example@gmail.com"
                                            type="email"
                                            className="bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100"
                                            {...field}
                                            defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="password"
                            render={({ field }) => (
                                <FormItem className='space-y-2'>
                                    <FormLabel>Senha</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="****"
                                            type="password"
                                            className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'
                                            {...field}
                                            defaultValue={''}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                            <Button type="submit" disabled={isLoading} className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">
                              {isLoading ? 'Signing In...' : 'Sign In'}
                            </Button>
                    </form>
                </Form>
            </CardContent>
            <CardFooter className="flex flex-col space-y-2">
              <Link 
                href="#" 
                className="text-sm text-center text-blue-800 dark:text-blue-200 hover:underline"
              >
                Forgot your password?
              </Link>
            </CardFooter>
          </Card>
        </motion.div>
      </main>
  )
}