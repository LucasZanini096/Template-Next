'use client'

import { useEffect, useState } from 'react'
import { useTheme } from "next-themes"
import { Button } from "../../../components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
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


export default function SingleProductPage({params}: any) {
  const { theme, setTheme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
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
      <main className="flex-1 w-full">
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
  )
}