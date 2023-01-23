import { createContext, useContext, useEffect, useState } from "react";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
} from "firebase/auth";
import { auth } from "../components/firebase_config";
import { useRouter } from "next/router";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const router = useRouter();
  const [user, setUser] = useState({});

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }
  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }
  function logOut() {
    return signOut(auth);
  }
  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function setUpRecaptha(number) {
    // console.log(number);
    // ส่งเบอร์โทรมาเพือเอาไปทำการ RecaptchaVerifier
    const recaptchaVerifier = new RecaptchaVerifier(
      "recaptcha-container",
      { size: "invisible" },
      auth
    );
    // recaptchaVerifier.render();

    return signInWithPhoneNumber(auth, number, recaptchaVerifier);
  }

  const verifyOtp = async (result, otp) => {
    // setError("");
    // if (otp === "" || otp === null) return;
    // ส่งค่า otp ไปให้ firebase เพื่อยื่นยันความถูกต้องของ otp
    try {
      await result.confirm(otp);
      router.push("/");
    } catch (err) {
      setError(err.message);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentuser) => {
      console.log("Auth", currentuser);
      setUser(currentuser);
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
        verifyOtp,
      }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  // เป็นฟังก์ชั่นที่จะส่งค่า userAuthContext.Provider ที่มี value={{
  //     user,
  //     logIn,
  //     signUp,
  //     logOut,
  //     googleSignIn,
  //     setUpRecaptha,
  //     verifyOtp,
  //   }}
  // ส่งไปให้หน้าอื่นใช้ได้โดยใช้ useUserAuth
  return useContext(userAuthContext);
}
