'use client'

import { useState } from 'react'
import { Button } from "../../../components/ui/button"
import { Input } from "../../../components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "../../../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../../components/ui/select"
import { motion } from "framer-motion"
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useForm } from 'react-hook-form';
import { FirestoreRepository } from '../../../api/firebase/firebase-repository';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { v4 as uuidV4 } from "uuid";
import { ref, uploadBytes } from 'firebase/storage';
import { bucket } from '../../../api/firebase/firebase';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../../../components/ui/form";
import {
  CloudUpload,
  Paperclip
} from "lucide-react"

import {
  FileInput,
  FileUploader,
  FileUploaderContent,
  FileUploaderItem
} from "../../../../components/ui/extension/file-upload";


interface ProductMenu {
  productName: string;
  productDescription: string;
  productPrice: number;
  productCategory: string;
  productBrand: string;
}

const formSchema = z.object({
  productName: z.string().min(1, "Product Name is required"),
  productDescription: z.string().min(1, "Product Description is required"),
  productPrice: z.number().min(0, "Price must be a positive number"),
  productCategory: z.string().nonempty("Category is required"),
  productBrand: z.string().nonempty("Brand is required"),
  productImages: z.array(z.any()).optional(),
});

type FormSchema = z.infer<typeof formSchema>;

export default function RegisterProduct() {
  //const { theme, setTheme } = useTheme()
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'submitted' | 'error'>('idle')

  const [files, setFiles] = useState<File[]>([]);

  const dropZoneConfig = {
    maxFiles: 5,
    maxSize: 1024 * 1024 * 4,
    multiple: true,
  };
  const form = useForm < z.infer < typeof formSchema >> ({
    resolver: zodResolver(formSchema),

  })

  const onSubmit = async (data: FormSchema) => {
    setFormStatus('submitting');
    const idProduct = uuidV4();

    try {
      // Upload Files to Storage
      await Promise.all(
        files.map(async (file) => {
          const storageRef = ref(bucket, `${idProduct}/${uuidV4()}`);
          await uploadBytes(storageRef, file);
        })
      );

      const collectionName = 'Products';
      const baseFirestorm = new FirestoreRepository<ProductMenu>();

      // Add additional logic to send data if necessary
      const productData: ProductMenu = {
        productName: data.productName,
        productDescription: "",
        productPrice: data.productPrice,
        productCategory: data.productCategory,
        productBrand: data.productBrand,
      };

      await baseFirestorm.create(collectionName, idProduct, productData);

      setFormStatus('submitted');
      console.log("Product successfully registered");
    } catch (error) {
      console.error("Error submitting product", error);
      setFormStatus('error');
    }
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
              Register New Product
            </motion.h1>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
            >
              <Card className="max-w-2xl mx-auto bg-white dark:bg-blue-800">
                <CardHeader>
                  <CardTitle className="text-blue-900 dark:text-blue-100">Product Details</CardTitle>
                </CardHeader>
                <CardContent>
                  
                  <Form {...form}>
                    <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
                      <FormField
                        control={form.control}
                        name="productName"
                        render={({ field }) => (
                            <FormItem className='space-y-2'>
                                <FormLabel className='text-sm font-medium text-blue-900 dark:text-blue-100'>Product Name</FormLabel>
                                <FormControl>
                                    <Input {...field} defaultValue={''} className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100' />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                      />

                      <FormField
                      control={form.control}
                      name="productDescription"
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Product Description</FormLabel>
                          <FormControl>
                            <Input 
                            defaultValue={''}
                            className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'
                            type="text"
                            {...field} />
                          </FormControl>
                          <FormDescription>This is your public display name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="productPrice"
                      render={({ field }) => (
                        <FormItem className='space-y-2'>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Product Price</FormLabel>
                          <FormControl>
                            <Input 
                            placeholder=""
                            className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'
                            type="number"
                            defaultValue={0}
                            {...field}
                            onChange={(e) => field.onChange(parseFloat(e.target.value))} // Converte o valor para número
                             />
                          </FormControl>
                          <FormDescription>This is your public display name.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="productCategory"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Product Category</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value} >
                            <FormControl>
                              <SelectTrigger className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'>
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Smartphone">Smartphone</SelectItem>
                              <SelectItem value="Tablet">Tablet</SelectItem>
                              <SelectItem value="Accessory">Accessory</SelectItem>
                            </SelectContent>
                          </Select>
                            <FormDescription>You can manage email addresses in your email settings.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                      control={form.control}
                      name="productBrand"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Product Brand</FormLabel>
                          <Select onValueChange={field.onChange} defaultValue={field.value}>
                            <FormControl>
                              <SelectTrigger className='bg-white dark:bg-blue-700 text-blue-900 dark:text-blue-100'>
                                <SelectValue placeholder="" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              <SelectItem value="Apple">Apple</SelectItem>
                              <SelectItem value="Samsung">Samsung</SelectItem>
                              <SelectItem value="Google">Google</SelectItem>
                              <SelectItem value="OnePlus">OnePlus</SelectItem>
                              <SelectItem value="Xiaomi">Xiaomi</SelectItem>
                              <SelectItem value="Sony">Sony</SelectItem>
                            </SelectContent>
                          </Select>
                            <FormDescription>You can manage email addresses in your email settings.</FormDescription>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    
                        <FormField
                          control={form.control}
                          name="productImages"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel  className='text-sm font-medium text-blue-900 dark:text-blue-100'>Select File</FormLabel>
                              <FormControl>
                                <FileUploader
                                  value={files}
                                  onValueChange={(newFiles) => setFiles(newFiles || [])}
                                  dropzoneOptions={dropZoneConfig}
                                  className="relative bg-background rounded-lg p-2"
                                >
                                  <FileInput
                                    id="fileInput"
                                    className="outline-dashed outline-1 outline-slate-500"
                                  >
                                    <div className="flex items-center justify-center flex-col p-8 w-full ">
                                      <CloudUpload className='text-gray-500 w-10 h-10' />
                                      <p className="mb-1 text-sm text-gray-500 dark:text-gray-400">
                                        <span className="font-semibold">Click to upload</span>
                                        &nbsp; or drag and drop
                                      </p>
                                      <p className="text-xs text-gray-500 dark:text-gray-400">
                                        SVG, PNG, JPG or GIF
                                      </p>
                                    </div>
                                  </FileInput>
                                  <FileUploaderContent>
                                    {files &&
                                      files.length > 0 &&
                                      files.map((file, i) => (
                                        <FileUploaderItem key={i} index={i}>
                                          <Paperclip className="h-4 w-4 stroke-current" />
                                          <span>{file.name}</span>
                                        </FileUploaderItem>
                                      ))}
                                  </FileUploaderContent>
                                </FileUploader>
                              </FormControl>
                              <FormDescription>Select a file to upload.</FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                    <Button 
                      type="submit" 
                      className="w-full bg-blue-800 text-white hover:bg-blue-700 dark:bg-blue-200 dark:text-blue-900 dark:hover:bg-blue-300"
                      disabled={formStatus === 'submitting'}
                    >
                      {formStatus === 'submitting' ? 'Registering...' : 'Register Product'}
                    </Button>

                    </form>

                  </Form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </section>
      </main>
  )
}