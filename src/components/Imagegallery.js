import React from "react";
import useFirestore from "./hooks/useFirestore";
function Imagegallery() {
  // const { docs } = useFirestore("images");

  return (
    <div className="img-grid">
      {/* {docs.map((image) => (
        <div className="img-wrap" key={image.id}>
          <img src={image.url} alt="" />
        </div>
      ))} */}
    </div>
  );
}

export default Imagegallery;
