import { db } from "../../firebase/config";
import { doc, addDoc, collection, getDocs, getDoc } from 'firebase/firestore';


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

/* Get Product By ID */
const getProductById = async (productId: string) => {
    try {
        const productDocRef = doc(db, 'products', productId);
        const productDocSnapshot = await getDoc(productDocRef);

        if (productDocSnapshot.exists()) {
            // Extract the document data
            const productData = productDocSnapshot.data();
            // Combine the ID and data into a single object
            const productWithId = {
                id: productId,
                ...productData,
            };
            return productWithId;
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
};

const productsService = {
    createProduct,
    getAllAsync,
    getProductById
};

export default productsService;