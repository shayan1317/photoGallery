import React from "react";
import { useState, useEffect } from "react";
import { projectFirestore } from "../firebase/config";

const ReadingData = (collection) => {
  const [docs, setDocs] = useState([]);
  useEffect(() => {
    projectFirestore.collection(collection).onSnapshot((each_data) => {
      const users_data = [];

      each_data.forEach((doc) => {
        users_data.push({ ...doc.data(), id: doc.id });
      });
      setDocs(users_data);
    });
  }, [collection]);
  return { docs };
};

export default ReadingData;
