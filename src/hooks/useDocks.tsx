import { doc, getDoc, DocumentData } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../firebase/config';
import { log } from 'console';

interface UseDocResult {
  data: DocumentData | null;
  error: string | null;
  loading: boolean;
}

const useDoc = (collection: string, id: string): UseDocResult => {
  const [data, setData] = useState<DocumentData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const getDocAsync = async () => {
      setLoading(true);
      const docRef = doc(db, collection, id);
      const docSnapshot = await getDoc(docRef);

      if (!docSnapshot.exists()) {
        setLoading(false);
        setError('Could not find that document');
      }

      setData({ id: docSnapshot.id, ...docSnapshot.data() });
      setLoading(false);
    };

    getDocAsync();
  }, [collection, id]);

  console.log(id);
  
  return { data, error, loading };
};

export default useDoc;