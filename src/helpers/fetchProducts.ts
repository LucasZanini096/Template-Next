// src/api/products.ts
import { getDocs, collection } from 'firebase/firestore';
import { db } from '../api/firebase/firebase';
import { FirebaseStorageRepository } from '../api/firebase/bucket-repository';
import { getDownloadURL } from 'firebase/storage';

interface Product {
  id: string;
  productName: string;
  productPrice: number;
  productCategory: string;
  productBrand: string;
  productDescription: string;
  productImage: string;
}

export const fetchProducts = async (): Promise<Product[]> => {
  const querySnapshot = await getDocs(collection(db, 'Products'));
  const bucket = new FirebaseStorageRepository();

  const productsDataPromises = querySnapshot.docs.map(async (doc) => {
    const data = doc.data();
    const files = await bucket.listAllFiles(doc.id);
    let productImageUrl = '';

    if (files.length > 0) {
      productImageUrl = await getDownloadURL(files[0]);
    }

    return {
      id: doc.id,
      productName: data.productName || '',
      productPrice: data.productPrice || 0,
      productDescription:  data.productBrand || '',
      productCategory: data.productCategory || '',
      productBrand: data.productBrand || '',
      productImage: productImageUrl,
    };
  });

  const productsData = await Promise.all(productsDataPromises);
  return productsData;
};