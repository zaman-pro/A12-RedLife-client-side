import React, { useEffect, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { auth } from "../firebase/firebase.config";
import {
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
  updateProfile,
} from "firebase/auth";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // create user
  const register = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  // login with google
  const googleLogin = () => {
    setLoading(true);
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
  };

  // login with email and password
  const login = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  // logout
  const logout = () => {
    return signOut(auth);
  };

  // password validate
  const passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_\\-+=\\[\\]{};':\"\\\\|,.<>\\/?]).{6,}$"
  );

  // update user
  const updateUser = (updatedData) => {
    setLoading(true);
    return updateProfile(auth.currentUser, updatedData).finally(() => {
      setLoading(false);
    });
  };

  // manage users
  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => {
      unSubscribe();
    };
  }, []);

  const authData = {
    loading,
    user,
    setUser,
    register,
    updateUser,
    googleLogin,
    login,
    logout,
    passwordRegex,
  };
  return <AuthContext value={authData}>{children}</AuthContext>;
};

export default AuthProvider;
