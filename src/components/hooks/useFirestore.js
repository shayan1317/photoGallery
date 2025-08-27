import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import { getDocs } from "firebase/firestore";
const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    const fetchFiles = async () => {
      const querySnapshot = await getDocs(collection(db, "files"));
      const fileData = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDocs(fileData);
    };

    fetchFiles();
  }, []);
  return { docs };
};

export default useFirestore;
