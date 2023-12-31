import React, { createContext, useEffect, useState } from "react";
import {
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";
import app from "../firebase/firebase.config";

export const AuthContext = createContext(null);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();

const AuthProviders = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [control, setControl] = useState(false);

  // create user
  const signUp = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };
  const logIn = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };
  // sign in with google
  const logInWithGoogle = () => {
    setLoading(true);
    return signInWithPopup(auth, provider);
  };
  // Update user info
  const updateUser = (name, photoUrl) => {
    setLoading(true);
    return updateProfile(auth.currentUser, {
      displayName: name,
      photoURL: photoUrl,
    });
  };
  // user monitoring
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setLoading(true);
      setUser(currentUser);
      if (currentUser) {
        
        if (currentUser.displayName) {
          fetch("https://mastery-karate-server.vercel.app/jwt", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify({ email: currentUser?.email }),
        })
          .then((res) => res.json())
          .then((data) => {
            localStorage.setItem("access-token", data?.token);
          });
          const savedUser = {
            name: currentUser.displayName || "",
            email: currentUser.email,
            role: "student",
            image: currentUser.photoURL,
          };
          fetch("https://mastery-karate-server.vercel.app/users", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(savedUser),
          })
            .then((res) => res.json())
            .then((data) => {});
        }
      } else {
        setUser(null);
        localStorage.removeItem('access-token');
      }
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, [control]);
  // user logout
  const logOut = () => {
    return signOut(auth);
  };
  const userInfo = {
    user,
    loading,
    signUp,
    logIn,
    updateUser,
    logInWithGoogle,
    logOut,
    setControl,
    control,
  };
  return (
    <AuthContext.Provider value={userInfo}>{children}</AuthContext.Provider>
  );
};

export default AuthProviders;
