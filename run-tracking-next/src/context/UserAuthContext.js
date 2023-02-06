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
import { gql, useLazyQuery } from "@apollo/client";

const GET_USER = gql`
  query AuthUser($phoneNumberuuid: String!) {
    authUser(phoneNumberuuid: $phoneNumberuuid) {
      id
      bib
      currentCheckpoint
      dateOfBirth
      email
      firstName
      gender
      imageUrl
      lastName
      phoneNumber
      role
    }
  }
`;

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  // const [authUser,{ loading2, error2, data }] = useQuery(GET_USER)
  const router = useRouter();
  const [user, setUser] = useState({});
  const [error, setError] = useState(null);
  // console.log(user)
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

  const verifyOtpLogin = async (result, otp) => {
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

  const verifyOtpSignup = async (result, otp) => {
    // setError("");
    // if (otp === "" || otp === null) return;
    // ส่งค่า otp ไปให้ firebase เพื่อยื่นยันความถูกต้องของ otp
    try {
      var uuuID = null;
      await result
        .confirm(otp)
        .then((result) => {
          uuuID = result.user;
        })
        .catch((error) => {
          console.log(error);
          // ...
        });
      // router.push("/");
      return uuuID.uid;
    } catch (err) {
      setError(err.message);
    }
  };

  const [authUser] = useLazyQuery(GET_USER);
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentuser) => {
      const { data, error } = await authUser({
        variables: { phoneNumberuuid: currentuser?.uid },
      });
      console.log(data);
      console.log(error);
      setUser(data?.authUser);
    });
    return () => {
      unsubscribe();
    };
  }, [authUser]);

  return (
    <userAuthContext.Provider
      value={{
        user,
        logIn,
        signUp,
        logOut,
        googleSignIn,
        setUpRecaptha,
        verifyOtpSignup,
        verifyOtpLogin,
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
