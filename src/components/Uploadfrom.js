import { useState } from "react";
import Progress from "./Progress";
import "./uploadform.css";
function Uploadfrom() {
  const types = ["image/jpeg", "image/png"];
  const [file, setFile] = useState(null);
  const [error, setError] = useState(null);
  const fileChange = (e) => {
    let selected = e.target.files[0];

    if (selected && types.includes(selected.type)) {
      setFile(selected);
      setError("");
    } else {
      setFile(null);
      setError("please select correct type i.e png or jpeg");
    }
  };

  return (
    <div>
      <label htmlFor="">
        <input type="file" onChange={fileChange} />
      </label>

      <div className="output">
        {error && <div className="error">{error}</div>}
        {file && <div>{file.name}</div>}
        {file && <Progress file={file} setFile={setFile} />}
      </div>
    </div>
  );
}

export default Uploadfrom;
