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
  const SubmitToDataBase = async (data) => {
    const { name, userName, password, email } = data;
    if (name || userName || password || email) {
      console.log("data", data);

      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        );

        const user = userCredential.user;
        console.log("user", user);
        let storageData = { email, accessToken: user?.accessToken, name };
        localStorage.setItem("user", storageData);
        await addDoc(collection(db, "users"), {
          name: name,
          email: email,
          username: userName,
          password: password,
        });

        console.log("useradded");
      } catch (err) {
        console.log("err", err);
      }
    }
  };

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
