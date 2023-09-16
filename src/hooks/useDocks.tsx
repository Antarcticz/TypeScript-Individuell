import { doc, getDoc, DocumentData } from 'firebase/firestore'; // Import Firestore related functions
import { useEffect, useState } from 'react'; // Import React hooks
import { db } from '../firebase/config'; // Import the Firebase Firestore instance

// Define the result type for the custom hook
interface UseDocResult {
  data: DocumentData | null; // The document data or null if not found
  error: string | null; // Any error message or null if no error
  loading: boolean; // Loading indicator
}

// Custom hook useDoc for fetching a single document from Firestore
const useDoc = (collection: string, id: string): UseDocResult => {
  // State variables for document data, loading state, and error message
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Async function to fetch the document
    const getDocAsync = async () => {
      setLoading(true);
      const docRef = doc(db, collection, id); // Create a reference to the document
      const docSnapshot = await getDoc(docRef); // Fetch the document

      // Check if the document exists
      if (!docSnapshot.exists()) {
        setLoading(false);
        setError('Could not find that document');
      }

      // Set the data to include the document ID and its data
      setData({ id: docSnapshot.id, ...docSnapshot.data() });
      setLoading(false);
    };

    getDocAsync(); // Invoke the async function to fetch the document
  }, [collection, id]); // Run the effect whenever the collection or ID changes

  console.log(id); // Log the ID to the console (for debugging)
  
  // Return the document data, error message, and loading state
  return { data, error, loading };
};

export default useDoc;