'use client'

import { useState, useEffect } from 'react'
import Link from "next/link"
import { useTheme } from "next-themes"
import { Button } from "../../components/ui/button"
import { Input } from "../../components/ui/input"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select"
import { Slider } from "../../components/ui/slider"
import { motion, AnimatePresence } from "framer-motion"
import { fetchProducts } from '~/helpers/fetchProducts'

const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 20 },
  transition: { duration: 0.3 }
}

const stagger = {
  animate: {
    transition: {
      staggerChildren: 0.1
    }
  }
}

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  productBrand: string;
  productDescription: string;
  productImage: string;
}

export default function Products() {
  const { theme, setTheme } = useTheme();
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("all");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [priceRange, setPriceRange] = useState([0, 1500]);
  const [product, setProduct] = useState<Product[]>([]);

  useEffect(() => {
    const getProducts = async () => {
      const productsData = await fetchProducts();
      setProduct(productsData);
      setFilteredProducts(productsData);
    };

    getProducts();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    filterProducts(event.target.value, selectedBrand, selectedCategory, priceRange);
  };

  const handleBrandChange = (value: string) => {
    setSelectedBrand(value);
    filterProducts(searchTerm, value, selectedCategory, priceRange);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    filterProducts(searchTerm, selectedBrand, value, priceRange);
  };

  const handlePriceChange = (value: number[]) => {
    setPriceRange(value);
    filterProducts(searchTerm, selectedBrand, selectedCategory, value);
  };

  const filterProducts = (search: string, brand: string, category: string, price: number[]) => {
    const filtered = product.filter((prod) =>
      prod.productName.toLowerCase().includes(search.toLowerCase()) &&
      (brand === "all" || prod.productBrand === brand) &&
      (category === "all" || prod.productCategory === category) &&
      prod.productPrice >= price[0] && prod.productPrice <= price[1]
    );
    setFilteredProducts(filtered);
  };

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
              Our Products
            </motion.h1>
            <div className="grid gap-6 lg:grid-cols-[300px_1fr]">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 }}
              >
                <Card className="bg-white dark:bg-blue-800">
                  <CardHeader>
                    <CardTitle className="text-blue-900 dark:text-blue-100">Filters</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <label htmlFor="search" className="text-sm font-medium text-blue-900 dark:text-blue-100">Search</label>
                      <Input
                        id="search"
                        placeholder="Search products..."
                        value={searchTerm}
                        onChange={handleSearch}
                        className="mt-1 bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100"
                      />
                    </div>
                    <div>
                      <label htmlFor="brand" className="text-sm font-medium text-blue-900 dark:text-blue-100">Brand</label>
                      <Select onValueChange={handleBrandChange}>
                        <SelectTrigger id="brand" className="mt-1 bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100">
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Brands</SelectItem>
                          <SelectItem value="Apple">Apple</SelectItem>
                          <SelectItem value="Samsung">Samsung</SelectItem>
                          <SelectItem value="Google">Google</SelectItem>
                          <SelectItem value="OnePlus">OnePlus</SelectItem>
                          <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                          <SelectItem value="Sony">Sony</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="category" className="text-sm font-medium text-blue-900 dark:text-blue-100">Category</label>
                      <Select onValueChange={handleCategoryChange}>
                        <SelectTrigger id="category" className="mt-1 bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100">
                          <SelectValue placeholder="Select category" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="all">All Categories</SelectItem>
                          <SelectItem value="Smartphone">Smartphone</SelectItem>
                          <SelectItem value="Tablet">Tablet</SelectItem>
                          <SelectItem value="Accessory">Accessory</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div>
                      <label htmlFor="price" className="text-sm font-medium text-blue-900 dark:text-blue-100">Price Range</label>
                      <Slider
                        id="price"
                        min={0}
                        max={1500}
                        step={10}
                        value={priceRange}
                        onValueChange={handlePriceChange}
                        className="mt-2"
                      />
                      <div className="flex justify-between mt-2 text-sm text-blue-900 dark:text-blue-100">
                        <span>${priceRange[0]}</span>
                        <span>${priceRange[1]}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
              <motion.div
                className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
                variants={stagger}
                initial="initial"
                animate="animate"
              >
                <AnimatePresence>
                  {filteredProducts.map((product) => (
                    <motion.div 
                      key={product.id} 
                      variants={fadeInUp}
                      layout
                      initial="initial"
                      animate="animate"
                      exit="exit"
                    >
                      <Card className="bg-white dark:bg-blue-800">
                        <CardHeader>
                          <CardTitle className="text-blue-900 dark:text-blue-100">{product.productName}</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <motion.img
                            alt=""
                            className="w-full h-48 object-contain rounded-md"
                            height="200"
                            src={product.productImage}
                            style={{
                              aspectRatio: "300/200",
                              objectFit: "contain",
                            }}
                            width="300"
                            whileHover={{ scale: 1.05 }}
                            transition={{ duration: 0.2 }}
                          />
                          <p className="mt-2 text-blue-800 dark:text-blue-200">{product.productBrand} - {product.productCategory}</p>
                          <p className="text-2xl font-bold mt-4 text-blue-900 dark:text-blue-100">${product.productPrice}</p>
                        </CardContent>
                        <CardFooter>
                          <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="w-full"
                          > <Link href={`/products/${product.id}`}>
                            <Button className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300">See more</Button>
                          </Link>  
                          </motion.div>
                        </CardFooter>
                      </Card>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </section>
      </main>
  )
}