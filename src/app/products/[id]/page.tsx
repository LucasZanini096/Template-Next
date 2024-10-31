'use client'

import { useEffect, useState } from 'react'
import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Button } from "../../../components/ui/button"
import { Card, CardContent } from "../../../components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "../../../components/ui/tabs"
import { Smartphone, Sun, Moon, ShoppingCart, Star, ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { FirestoreRepository } from '~/api/firebase/firebase-repository'
import { bucket } from '~/api/firebase/firebase'
import { getDownloadURL, listAll, ref } from 'firebase/storage'
import { fetchProductById } from '~/helpers/fetchProduct'

interface ProductInterface {
  id: string;
  productName: string | null;
  productPrice: number | null;
  productCategory: string | null;
  productBrand: string | null;
  productDescription: string | null;
  productImage: string[];
}


// Mock product data
const product = {
  id: 1,
  name: "iPhone 13 Pro",
  brand: "Apple",
  category: "Smartphone",
  price: 999,
  description: "The iPhone 13 Pro is Apple's latest flagship smartphone, featuring a powerful A15 Bionic chip, ProMotion display, and an advanced camera system for stunning photos and videos.",
  features: [
    "6.1-inch Super Retina XDR display with ProMotion",
    "A15 Bionic chip for lightning-fast performance",
    "Pro camera system with new 12MP Telephoto, Wide, and Ultra Wide cameras",
    "Cinematic mode for beautiful depth-of-field transitions",
    "5G capable for ultra-fast downloads and high-quality streaming",
    "Ceramic Shield front cover for improved durability",
    "IP68 water resistance"
  ],
  specs: {
    "Display": "6.1-inch Super Retina XDR with ProMotion",
    "Chip": "A15 Bionic",
    "Camera": "Pro 12MP camera system: Telephoto, Wide, and Ultra Wide",
    "Front Camera": "12MP TrueDepth camera",
    "Capacity": "128GB, 256GB, 512GB, 1TB",
    "Battery": "Up to 22 hours video playback",
    "OS": "iOS 15"
  },
  images: [
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300",
    "/placeholder.svg?height=400&width=300"
  ],
  rating: 4.8,
  reviews: 1234
}

export default function SingleProductPage({params}: any) {
  const { theme, setTheme } = useTheme()
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  //const [actualData, setActualData] = useState<Product | null>(null);
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const { id } = params;
  const [product, setProduct] = useState<ProductInterface | null>(null); // Produto único

    

  console.log(id)


  useEffect(() => {
    const getProducts = async () => {
      const productData = await fetchProductById(`${id}`);
      if (productData) {
        setProduct(productData);
      }
    };
    getProducts();
  }, [id]);

//   useEffect(() => {
//     const getProduct = async () => {
//         const baseFirestore = new FirestoreRepository<ProductInterface>();
//         try {
//             console.log(id);
//             if (id) {
//                 const data = await baseFirestore.read('Products', id);

//                 if (data) {
//                     setProduct(data);
//                     const listRef = ref(bucket, `${id}`);

//                     setImageUrls([]);

//                     listAll(listRef)
//                         .then((res) => {
//                             res.items.forEach((itemRef) => {
//                                 const storageRef = ref(bucket, itemRef.fullPath);

//                                 getDownloadURL(storageRef).then((url) => {
//                                     setImageUrls((prev) => [...prev, url]);
//                                     console.log(imageUrls.length);
//                                 });
//                             });
//                         })
//                         .catch((error) => {
//                             console.log(error);
//                         });

//                 }
//             }
//         } catch (error) {
//             console.error(error);
//         }
//     };
//     getProduct();
// }, []);


  // Próxima imagem
  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      product && prevIndex === product.productImage.length - 1 ? 0 : prevIndex + 1
    );
  };

  // Imagem anterior
  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      product && prevIndex === 0 ? product.productImage.length - 1 : prevIndex - 1
    );
  };

  console.log(product)

  return (
    <motion.div 
      className="flex flex-col min-h-screen bg-white dark:bg-gray-900"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
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
          <Link className="text-sm font-medium hover:text-blue-800 dark:hover:text-blue-400 hover:underline underline-offset-4" href="#">
            About
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
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-blue-50 dark:bg-blue-900">
          <div className="container px-4 md:px-6">
            <motion.div 
              className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-start"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
            >
              <div className="space-y-4">
                <div className="relative aspect-square overflow-hidden rounded-lg">
                  <AnimatePresence mode="wait">
                    <motion.img
                      key={0}
                      src={product?.productImage[0]}
                      alt={`${product?.productName} - Image ${0 + 1}`}
                      className="object-contain  w-full h-full"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.5 }}
                    />
                  </AnimatePresence>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full"
                    onClick={prevImage}
                  >
                    <ChevronLeft className="h-6 w-6" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-white/80 dark:bg-gray-800/80 rounded-full"
                    onClick={nextImage}
                  >
                    <ChevronRight className="h-6 w-6" />
                  </Button>
                </div>
                <div className="flex space-x-2 overflow-x-auto py-2">
                  {product?.productImage.map((image, index) => (
                    <motion.img
                      key={index}
                      src={image}
                      alt={`${product?.productName} - Thumbnail ${index + 1}`}
                      className={`w-20 h-20 object-contain   rounded-md cursor-pointer ${index === currentImageIndex ? 'ring-2 ring-blue-500' : ''}`}
                      onClick={() => setCurrentImageIndex(index)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    />
                  ))}
                </div>
              </div>
              <div className="space-y-6">
                <div>
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-blue-900 dark:text-blue-100">{product?.productName}</h1>
                  <p className="text-base text-blue-800 dark:text-blue-200">{product?.productBrand} - {product?.productCategory}</p>
                </div>
                <p className="text-3xl font-bold text-blue-900 dark:text-blue-100">${product?.productPrice}</p>
                <p className="text-base text-blue-800 dark:text-blue-200">{product?.productDescription}</p>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">
                    Add to Cart
                  </Button>
                </motion.div>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <motion.footer 
        className="bg-blue-900 dark:bg-blue-950 text-white py-6"
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.5 }}
      >
        <div className="container mx-auto px-4">
          <p className="text-center text-blue-200 dark:text-blue-300">
            © {new Date().getFullYear()} CellMaster. All rights reserved.
          </p>
        </div>
      </motion.footer>
    </motion.div>
  )
}