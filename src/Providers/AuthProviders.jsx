import { createContext, useEffect, useState } from "react";
import { GithubAuthProvider, GoogleAuthProvider, createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword, signInWithPopup, signOut, updateProfile } from "firebase/auth";
import { app } from "../Config/Firebase/config.firebase";
import useAxiosPublic from "../Hooks/useAxiosPublic";


export const AuthContext = createContext(null)
const googleProvider = new GoogleAuthProvider();
const githubProvider = new GithubAuthProvider();
const auth = getAuth(app);
const AuthProviders = ({children}) => {
    const [user, setUser]= useState(null);
    const [loading, setLoading]= useState(true);
    const axiosPublic = useAxiosPublic()
    const createUser = (email, password)=>{
      return  createUserWithEmailAndPassword(auth,email,password)
    };
    const login = (email, password)=>{
        setLoading(true)
        return signInWithEmailAndPassword(auth,email,password)
    }
    const logOut = ()=>{
        setLoading(true)
        return signOut(auth)
    }
    const handleUpdateProfile = (name,photo) =>{
        return updateProfile(auth.currentUser,{
            displayName:name, photoURL:photo
        })
    }
    const signInWithGoogle =()=>{
        setLoading(true);
      return  signInWithPopup(auth, googleProvider)

    }
    const signInWithGithub = () =>{
        setLoading(true);
        return signInWithPopup(auth,githubProvider)
    }

    useEffect(()=>{
     const unsubscribe =   onAuthStateChanged(auth, currentUser=>{
        const userEmail = currentUser?.email || user?.email;
        const loggedUser = {email:userEmail}
            setUser(currentUser);

            setLoading(false);
            if(currentUser){
                axiosPublic.post('/jwt', loggedUser, {withCredentials:true})
                .then(res=>{

                })
                // axiosPublic.post('/users',loggedUser)
                // .then(res=>{

                // })
            }
            else{
                axiosPublic.post('/logout',loggedUser,{
                    withCredentials: true
                })
                .then(res=>{

                })
            }
        });
        return ()=>{
            return unsubscribe()
        }

    },[])

    const authInfo = {
        user,
        loading,
        createUser,
        logOut,
        login,
        handleUpdateProfile,
        signInWithGoogle,
        signInWithGithub

    }
    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProviders;