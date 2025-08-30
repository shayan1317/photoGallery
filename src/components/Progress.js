import React from "react";
import { useEffect } from "react";
import useStorage from "./hooks/useStorage";
function Progress({ file, setFile }) {
  const { progress, url } = useStorage(file);
  console.log(progress, url);
  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url]);
  return <div className="progress-bar" style={{ width: progress + "%" }}></div>;
}

export default Progress;
