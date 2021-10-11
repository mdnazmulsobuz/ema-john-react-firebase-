import { useState } from "react"
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, signOut } from "firebase/auth";
import { useEffect } from "react";
import initializeAuthentication from "../Firebase/firebase.init";

initializeAuthentication();

const useFirebase = ()  =>{
    const [user, Setuser] = useState({});
    const auth = getAuth();
    const googleProvider = new GoogleAuthProvider();


    const signInUsingGoogle = () =>{
         signInWithPopup(auth, googleProvider)
         .then(result =>{
             console.log(result.user);
         })
    }

    const logOut = () =>{
        signOut(auth)
        .then( ()=>{
            Setuser({})
        })
    }
    useEffect( ()=>{
        onAuthStateChanged(auth , (user) =>{
            if (user){
                Setuser(user);
            }else{

            }
        });
    }, [])
    return {
        user, 
        signInUsingGoogle,
        logOut
    }
}

export default useFirebase;
