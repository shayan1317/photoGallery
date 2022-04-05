import React from "react";
import "./main.css";
import SignUP from "./SignUP";
import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import { projectFirestore } from "../firebase/config";
import ReadingData from "./ReadindData";
function Main() {
  const { docs } = ReadingData("users");
  const [msg, Setmsg] = useState(false);
  const [name, setName] = useState("");
  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");
  const [userName, setUsername] = useState("");
  //   const [ArrayuserNames, setArrayuserNames] = useState(
  //     localStorage.getItem("users")
  //   );

  const userCollection = projectFirestore.collection("users");
  const [registeredUser, SetRegisteredUser] = useState(false);
  function SubmitToDataBase(e) {
    setName(e.target[0].value); // for storing name
    setemail(e.target[1].value); // for storing email
    setUsername(e.target[2].value); // username
    setpassword(e.target[3].value); // for storing password
  }

  useEffect(() => {
    console.log(registeredUser);
    console.log(docs);
    if (docs.length > 0) {
      console.log("in map");
      for (let i = 0; i < docs.length; i++) {
        if (docs[i].userName == userName) {
          Setmsg("already registered");
          SetRegisteredUser(true);
          break;
        } else {
          Setmsg("");
          SetRegisteredUser(false);
        }
      }
    }

    if ((name, email, password != "" && registeredUser === false)) {
      userCollection.add({ name, email, userName, password });
    }
  }, [userName]);

  return (
    <div className="app_main">
      <div className="container">
        <div className="row g-3">
          <SignIn />
          <SignUP
            SubmitToDataBase={SubmitToDataBase}
            msg={msg}
            name={name}
            userName={userName}
            email={email}
            password={password}
          />
        </div>
      </div>
    </div>
  );
}

export default Main;
