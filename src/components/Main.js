import React from "react";
import "./main.css";
import SignUP from "./SignUP";
import { useState, useEffect } from "react";
import SignIn from "./SignIn";
import { db } from "../firebase/config";
import { auth } from "../firebase/config";
import { addDoc, collection } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";
function Main() {
  // const { docs } = ReadingData("users");
  const [msg, Setmsg] = useState(false);

  //   const [ArrayuserNames, setArrayuserNames] = useState(
  //     localStorage.getItem("users")
  //   );

  const [registeredUser, SetRegisteredUser] = useState(false);

  // useEffect(() => {
  //   console.log(registeredUser);
  //   console.log(docs);
  //   if (docs.length > 0) {
  //     console.log("in map");
  //     for (let i = 0; i < docs.length; i++) {
  //       if (docs[i].userName == userName) {
  //         Setmsg("already registered");
  //         SetRegisteredUser(true);
  //         break;
  //       } else {
  //         Setmsg("");
  //         SetRegisteredUser(false);
  //       }
  //     }
  //   }

  //   if ((name, email, password != "" && registeredUser === false)) {
  //     addDoc(
  //       collection(db, "users", {
  //         name: name,
  //         email: email,
  //         username: userName,
  //         password: password,
  //       })
  //     );

  //     userCollection.add({ name, email, userName, password });
  //   }
  // }, [userName]);

  return (
    <div className="app_main">
      <div className="container">
        <div className="row g-3">
          {/* <SignIn /> */}
          <SignUP SubmitToDataBase={SubmitToDataBase} msg={msg} />
        </div>
      </div>
    </div>
  );
}

export default Main;
