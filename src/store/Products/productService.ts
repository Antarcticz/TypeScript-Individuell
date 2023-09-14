import { db } from "../../firebase/config";
import { doc, addDoc, collection, getDocs } from 'firebase/firestore';


const createProduct = async (productData: Product): Promise<Product> => {
    const collectionRef = collection(db, 'products');
    const docRef = await addDoc(collectionRef, productData);

    if (!docRef.id) {
        throw new Error('Something went wrong');
    }

    console.log(docRef);
    return { ...productData, id: Number(docRef.id) };
};

const getAllAsync = async (col: string): Promise<Product[]> => {
    const colRef = collection(db, col);
    const querySnapshot = await getDocs(colRef);

    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: Number(doc.id) } as Product);
    });

    return products;
};

const productsService = {
    createProduct,
    getAllAsync
};

export default productsService;