'use client'
import React from 'react'
import Image from 'next/image';
import Link from "next/link"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Textarea } from "../components/ui/textarea"
import { MessageSquare, Zap, Settings } from "lucide-react"
import { Checkbox } from '~/components/ui/checkbox';
import { InfiniteMovingCards } from '~/components/ui/infinite-moving-cards';
import { TextGenerateEffect } from '~/components/ui/text-generate-effect';
import { Navbar } from '~/components/custom/navbar';
import { FocusCards } from '~/components/ui/focus-cards';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog';
import { Label } from '~/components/ui/label';
import { motion, useAnimation, useInView } from "framer-motion"
import { ReactNode, CSSProperties, useEffect, useRef, useState } from "react"



interface AnimatedSectionProps {
  children: ReactNode
  className?: string
  style?: CSSProperties // Adiciona 'style' como uma propriedade opcional
}

const fadeIn = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.6 }
}

const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

function AnimatedSection({ children, className, style }: AnimatedSectionProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    }
  }, [controls, inView])

  return (
    <motion.section
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={fadeInUp}
      className={className}
      style={style}
    >
      {children}
    </motion.section>
  )
}

const cards = [
  {
    title: "Imagem 01",
    src: "https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Imagem 02",
    src: "https://images.unsplash.com/photo-1581094285214-779d97298443?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Imagem 03",
    src: "https://images.unsplash.com/photo-1581092334651-ddf26d9a09d0?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Imagem 04",
    src: "https://images.unsplash.com/photo-1581092163144-b7ae3c00adbc?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Imagem 05",
    src: "https://images.unsplash.com/photo-1581094377969-665dbb7f5da7?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    title: "Imagem 06",
    src: "https://images.unsplash.com/photo-1581094794329-c8112a89af12?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
];

const testimonials = [
  {
    image: "/logo_p4-engenharia_G2eyys.png"
  },
  {
    image: "/logo_grande.png"
  },
  {
   image: "/empresa-de-construcao-civil.jpg"
  },
  {
    image: "/Favicon-CarLuc.png"
  },
];

export default function LandingPage() {
  const [isModalOpen, setIsModalOpen] = useState(false)


  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <div className="relative w-full flex items-center justify-center">
        <Navbar className="top-2" />
      </div>

      {/* Hero Section */}
      <AnimatedSection className="text-white bg-cover bg-center h-[45rem]" style={{backgroundImage: `url("/glenov-brankovic-6CT4cYdSNaI-unsplash.png")`}}>
        <div className="w-full flex flex-col justify-center h-full px-4 py-24 md:py-32">
          <motion.div className="max-w-2xl space-y-6" variants={fadeIn}>
            <TextGenerateEffect className="text-4xl font-bold tracking-tighter sm:text-5xl" words='Inovação e Eficiência para seus Projetos de Engenharia' />
            <motion.p className="text-white" variants={fadeIn}>
            Oferecemos projetos personalizados e sustentáveis para otimizar o desempenho de sua empresa, desde a fase de planejamento até a execução final. Nossos especialistas garantem qualidade e eficiência em cada etapa.
            </motion.p>
            <motion.div className="flex flex-wrap gap-4" variants={fadeIn}>
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
                <DialogTrigger asChild>
                  <Button className='dark:text-white' style={{ backgroundColor: "#065130" }}>Saiba Mais</Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-[425px]">
                  <DialogHeader>
                    <DialogTitle>Entre em contato</DialogTitle>
                    <DialogDescription>
                      Preencha o formulário abaixo para saber mais sobre nossos serviços.
                    </DialogDescription>
                  </DialogHeader>
                  <form className="grid gap-4 py-4">
                    <div className="grid gap-2">
                      <Label htmlFor="name">Nome</Label>
                      <Input id="name" placeholder="Seu nome completo" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="Seu email" />
                    </div>
                    <div className="grid gap-2">
                      <Label htmlFor="message">Mensagem</Label>
                      <Textarea id="message" placeholder="Como podemos ajudar?" />
                    </div>
                    <Button type="submit" className='dark:text-white' style={{ backgroundColor: "#065130" }}>Enviar</Button>
                  </form>
                </DialogContent>
              </Dialog>
              <Button variant="outline">Solicite um Orçamento</Button>
            </motion.div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Features */}
      <AnimatedSection className="container grid gap-12 px-4 py-24 md:grid-cols-3">
        {[
          { icon: MessageSquare, title: "Soluções Personalizadas e Inovadoras", description: "Desenvolvemos soluções personalizadas que atendem às necessidades específicas de cada cliente, aplicando inovação e tecnologia de ponta para garantir resultados de alta qualidade e eficiência." },
          { icon: Zap, title: "Experiência Técnica e Equipe Qualificada", description: "Nossa equipe é composta por engenheiros experientes e qualificados em diversas especialidades, garantindo a expertise necessária para realizar projetos complexos com precisão e segurança." },
          { icon: Settings, title: "Sustentabilidade e Eficiência Energética", description: "Comprometidos com práticas sustentáveis, nossos projetos incluem soluções que reduzem o consumo de energia e minimizam o impacto ambiental, gerando economia e responsabilidade social." }
        ].map((feature, index) => (
          <motion.div key={index} className="space-y-4 text-center" variants={fadeIn}>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <feature.icon className="mx-auto h-12 w-12" style={{ color: "#065130" }} />
            </motion.div>
            <h2 className="text-xl font-semibold">{feature.title}</h2>
            <p className="text-gray-500">{feature.description}</p>
          </motion.div>
        ))}
      </AnimatedSection>

      {/* Gallery */}
      <AnimatedSection className="bg-gray-50 py-24">
        <div className="container px-4">
          <motion.div className="mb-12 text-center" variants={fadeIn}>
            <h2 className="text-3xl font-bold text-black">Galeria de Imagens</h2>
            <p className="mt-4 text-gray-500">Explore nosso portfólio e veja nossos serviços em ação.</p>
          </motion.div>
          <motion.div className="grid gap-8" variants={stagger}>
            <div>
              <FocusCards cards={cards} />
            </div>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Clients */}
      <motion.section className="py-12 dark:bg-white">
        <div className="container px-4">
          <motion.div className="mb-12 text-center" variants={fadeIn}>
            <h2 className="text-3xl font-bold dark:text-black">Nossos clientes</h2>
          </motion.div>
          <motion.div className="w-full" variants={stagger}>
          <div className="h-[24rem] rounded-md flex flex-col antialiased dark:bg-grid-white/[0.05] items-center justify-center relative overflow-hidden">
              <InfiniteMovingCards
                items={testimonials}
                direction="right"
                speed="slow"
              />
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Blog Posts */}
      <AnimatedSection className="py-24">
        <div className="container px-4">
          <motion.div className="mb-12 text-center" variants={fadeIn}>
            <h2 className="text-3xl font-bold">Descubra nossas últimas postagens</h2>
            <p className="mt-4 text-gray-500">Explore insights e dicas valiosas para você</p>
          </motion.div>
          <motion.div className="grid gap-8 md:grid-cols-3" variants={stagger}>
           
              <motion.div  className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:border-primary" variants={fadeIn} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Image
                  src="https://images.unsplash.com/photo-1694521787193-9293daeddbaa?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={400}
                  height={200}
                  alt="Blog post image"
                  className="rounded-lg object-cover"
                />
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Category • 5 min read</p>
                  <h3 className="mt-2 text-xl font-semibold">Como otimizar seu chatbot para melhores resultados</h3>
                  <p className="mt-2 text-gray-500">Aprenda a usar chatbots que realmente engajam seus usuários.</p>
                  <Button className="mt-4 border-2 " variant="link" style={{ color: "#065130" ,  borderColor: "#065130"}}>
                    Leia mais
                  </Button>
                </div>
              </motion.div>
            <motion.div className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:border-primary" variants={fadeIn} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Image
                  src="https://images.unsplash.com/photo-1529792083865-d23889753466?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={400}
                  height={200}
                  alt="Blog post image"
                  className="rounded-lg object-cover"
                />
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Category • 5 min read</p>
                  <h3 className="mt-2 text-xl font-semibold">Como otimizar seu chatbot para melhores resultados</h3>
                  <p className="mt-2 text-gray-500">Aprenda a usar chatbots que realmente engajam seus usuários.</p>
                  <Button className="mt-4 border-2 " variant="link" style={{ color: "#065130" ,  borderColor: "#065130"}}>
                    Leia mais
                  </Button>
                </div>
              </motion.div>
              <motion.div className="flex flex-col items-center rounded-lg border p-4 transition-colors hover:border-primary" variants={fadeIn} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
                <Image
                  src="https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  width={400}
                  height={200}
                  alt="Blog post image"
                  className="rounded-lg object-cover"
                />
                <div className="mt-4">
                  <p className="text-sm text-gray-500">Category • 5 min read</p>
                  <h3 className="mt-2 text-xl font-semibold">Como otimizar seu chatbot para melhores resultados</h3>
                  <p className="mt-2 text-gray-500">Aprenda a usar chatbots que realmente engajam seus usuários.</p>
                  <Button className="mt-4 border-2 " variant="link" style={{ color: "#065130" ,  borderColor: "#065130"}}>
                    Leia mais
                  </Button>
                </div>
              </motion.div>
          </motion.div>
          <motion.div className="mt-12 text-center" variants={fadeIn}>
            <Button variant="outline">Ver todos</Button>
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Contact Form */}
      <AnimatedSection className="bg-gray-50 py-24">
        <div className="container grid gap-12 px-4 md:grid-cols-2">
          <motion.div className="space-y-4" variants={fadeIn}>
            <h2 className="text-3xl font-bold text-black">Entre em contato</h2>
            <p className="text-gray-500">Estamos aqui para você e vamos ajudar!</p>
            <form className="space-y-4">
              <Input placeholder="Nome" />
              <Input type="email" placeholder="Email" />
              <Textarea placeholder="Mensagem" />
              <div className="flex items-center space-x-2">
                <Checkbox id="terms" />
                <label htmlFor="terms" className="text-sm text-gray-500">
                  Li e aceito os Termos
                </label>
              </div>
              <Button className='dark:text-white' style={{ backgroundColor: "#065130" }}>Enviar</Button>
            </form>
          </motion.div>
          <motion.div className="hidden md:block" variants={fadeIn} whileHover={{ scale: 1.05 }} transition={{ type: "spring", stiffness: 300 }}>
            <Image
              src="https://images.unsplash.com/photo-1652303518379-c0ef1c9fb2b1?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              width={600}
              height={400}
              alt="Contact illustration"
              className="rounded-lg object-cover"
            />
          </motion.div>
        </div>
      </AnimatedSection>

      {/* Footer */}
      <motion.footer className="border-t" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <div className="container px-4 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link className="font-semibold" href="/">
                <Image src='/PROENG.png' width={100} height={50} alt={''} />
              </Link>
              <p className="mt-4 text-sm text-gray-500">
              Rua Tupi, 13 - Valparaíso - Sto. André - SP
                <br />
                (11) 4319-7888
                <br />
                Brasil
                <br />
                comercial@proengg.com.br
                <br />
                <br />
                Seg.-Sex.: 9AM - 6PM
                <br />
              </p>
            </div>
            {[1, 2, 3].map((i) => (
              <div key={i} className="space-y-4">
                <h3 className="font-semibold">Link Box</h3>
                <ul className="space-y-2 text-sm text-gray-500">
                  <li>
                    <Link href="#">Link Item</Link>
                  </li>
                  <li>
                    <Link href="#">Link Item</Link>
                  </li>
                  <li>
                    <Link href="#">Link Item</Link>
                  </li>
                </ul>
              </div>
            ))}
          </div>
          <div className="mt-12 border-t pt-8 text-center text-sm text-gray-500">
            © 2024 Example. Todos os direitos reservados.
          </div>
        </div>
      </motion.footer>
    </div>
    )
  }