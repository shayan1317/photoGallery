import React from "react";
import { useState, useEffect } from "react";
import { projectStorage, db } from "../../firebase/config";
import { addDoc, serverTimestamp, collection } from "firebase/firestore";
import { uploadBytesResumable, ref, getDownloadURL } from "firebase/storage";
function useStorage(file) {
  const [progress, setProgress] = useState("");
  const [error, setError] = useState(null);
  const [url, setUrl] = useState(null);

  useEffect(() => {
    if (!file) return;
    const storageRef = ref(projectStorage, `uploads/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snap) => {
        const percentage = (snap.bytesTransferred / snap.totalBytes) * 100;
        setProgress(percentage);
      },
      (error) => {
        setError(error);
      },
      async () => {
        const url = await getDownloadURL(uploadTask?.snapshot?.ref);
        setUrl(url);
        await addDoc(collection(db, "files"), {
          url: url,
          createdAt: serverTimestamp(),
        });
      }
    );
  }, [file]);
  return { progress, error, url };
}

export default useStorage;
