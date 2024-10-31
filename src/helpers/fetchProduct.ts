import { getDoc, doc } from 'firebase/firestore';
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
  productImage: string[];
}

// Função para buscar um produto por ID
// Função para buscar um produto por ID
export const fetchProductById = async (id: string): Promise<Product | null> => {
  try {
    const productRef = doc(db, 'Products', id);
    const productSnapshot = await getDoc(productRef);

    if (!productSnapshot.exists()) {
      console.error(`Produto com ID ${id} não encontrado.`);
      return null;
    }

    const data = productSnapshot.data();
    if (!data) {
      console.error('Erro ao obter dados do produto.');
      return null;
    }

    const bucket = new FirebaseStorageRepository();
    const files = await bucket.listAllFiles(id);
    let productImageUrls: string[] = [];

    // Pega as URLs de todas as imagens associadas ao produto
    if (files.length > 0) {
      productImageUrls = await Promise.all(files.map(file => getDownloadURL(file)));
    } else {
      productImageUrls = ['/default-product-image.jpg']; // URL de uma imagem padrão
    }

    // Monta o produto
    const product: Product = {
      id: productSnapshot.id,
      productName: data.productName || 'Produto sem nome',
      productPrice: data.productPrice ?? 0, // Usar nullish coalescing para garantir que valores 0 sejam mantidos
      productDescription: data.productDescription || 'Descrição não fornecida',
      productCategory: data.productCategory || 'Categoria não especificada',
      productBrand: data.productBrand || 'Marca não especificada',
      productImage: productImageUrls, // Armazena o array de URLs
    };

    return product;
  } catch (error) {
    console.error(`Erro ao buscar produto com ID ${id}:`, error);
    return null;
  }
};