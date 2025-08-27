import React, { useEffect, useState } from "react";
import ReadingData from "./ReadindData";

function SignIn() {
  // const { docs } = ReadingData("users");
  const [user_name, setusername] = useState("");
  const [message, setMessage] = useState("");
  const [pass, setpass] = useState("");

  const readData = (e) => {
    // setusername(e.target[0].value);
    // setpass(e.target[1].value);
    // if ((user_name, pass) == "") {
    //   setMessage("username/password could not be empty");
    // } else {
    //   setMessage(" ");
    // }
  };

  useEffect(() => {
    // if (docs.length > 0) {
    //   for (let i = 0; i < docs.length; i++) {
    //     if (
    //       (user_name, pass) != "" &&
    //       docs[i].userName == user_name &&
    //       docs[i].password == pass
    //     ) {
    //       setMessage("Successefully Signed In");
    //       break;
    //     } else {
    //       setMessage("User Not registered!Please register yourself");
    //     }
    //   }
    // }
    // docs.map((doc) => {
    //   console.log(doc);
    //   console.log(user_name, pass);
    //   if (doc.userName == user_name && doc.password == pass) {
    //     setMessage("Successefully Signed In");
    //   }
    // });
  }, [user_name, pass]);

  return (
    <div className="col-6">
      <div className="content">
        <h2 className="title">sign in</h2>
        <form className="p-5" onSubmit={readData}>
          <div class="form-group">
            <label>enter user name</label>
            <input type="text" class="form-control" />
          </div>
          <div class="form-group">
            <label>enter password</label>
            <input type="passsword" class="form-control" />
          </div>
          <p className="error_msg">{message}</p>
          <button>submit</button>
        </form>
      </div>
    </div>
  );
}

export default SignIn;
