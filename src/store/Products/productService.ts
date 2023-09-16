import { db } from "../../firebase/config";
import { doc, addDoc, collection, getDocs, getDoc } from 'firebase/firestore';

// Function to create a new product in the 'products' collection
const createProduct = async (productData: Product): Promise<Product> => {
    const collectionRef = collection(db, 'products'); // Reference to the 'products' collection
    const docRef = await addDoc(collectionRef, productData); // Add a new document with productData

    if (!docRef.id) {
        throw new Error('Something went wrong'); // Throw an error if the document ID is not available
    }

    console.log(docRef);
    return { ...productData, id: String(docRef.id) }; // Return the product data with the assigned ID
};

// Function to fetch all products from a specified collection
const getAllAsync = async (col: string): Promise<Product[]> => {
    const colRef = collection(db, col);  // Reference to the specified collection
    const querySnapshot = await getDocs(colRef); // Get a snapshot of all documents in the collection

    const products: Product[] = [];
    querySnapshot.forEach((doc) => {
        products.push({ ...doc.data(), id: String(doc.id) } as Product); // Iterate through documents and add to products array
    });

    return products; // Return an array of products
};

// Function to fetch a product by its ID
const getProductById = async (productId: string) => {
    try {
        const productDocRef = doc(db, 'products', productId); // Reference to a specific product document
        const productDocSnapshot = await getDoc(productDocRef); // Get a snapshot of the document

        if (productDocSnapshot.exists()) {
            const productData = productDocSnapshot.data(); // Get the data of the document

            const productWithId = {
                id: productId,
                ...productData,
            };
            return productWithId; // Return the product data with the assigned ID
        } else {
            return null;
        }
    } catch (error) {
        console.error('Error fetching product by ID:', error);
        return null;
    }
};

// Object containing the product service functions
const productsService = {
    createProduct,     // Function to create a new product
    getAllAsync,       // Function to fetch all products
    getProductById     // Function to fetch a product by ID
};

export default productsService;