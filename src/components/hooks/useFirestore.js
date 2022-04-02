import { useState, useEffect } from "react";
import { projectFirestore } from "../../firebase/config";

const useFirestore = (collection) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    projectFirestore
      .collection(collection)
      .orderBy("createdAt", "desc")
      .onSnapshot((each_data) => {
        const images_data = [];

        each_data.forEach((doc) => {
          images_data.push({ ...doc.data(), id: doc.id });
        });
        setDocs(images_data);
      });
  }, [collection]);
  return { docs };
};

export default useFirestore;
