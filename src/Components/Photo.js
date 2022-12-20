import React, { useEffect, useState } from "react";
import PhotoScene from "../Assets/egor-klyuchnyk.jpg";
import Dropdown from "../Components/Drop-down";
import "../CSS/Photo.css"

// Firebase
// import getFirebaseConfig from "../firebase-config";
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";

const config = {
    apiKey: "AIzaSyAG-z2QOtLeZUr8cjc00p29EvAqCjHXRyI",
    authDomain: "find-the-character-fd842.firebaseapp.com",
    projectId: "find-the-character-fd842",
    storageBucket: "find-the-character-fd842.appspot.com",
    messagingSenderId: "37428567468",
    appId: "1:37428567468:web:41f2700f728230468d2e09"
  };

const Photo = () => {

    const app = initializeApp(config);
    const db = getFirestore(app);

    let charactersToFind = [
        { 
            name: "Samus",
        },
        {
            name: "C.C."
        },
        {
            name: "Mikasa"
        },
        {
            name: "Amon"
        },
        {
            name: "Batman"
        },
        {
            name: "Pokeball"
        }
    ]

    let [isDropDownOpen, setIsDropDownOpen] = useState(false);
    let [dropDown, setDropDown] = useState([]);


    useEffect(()=> {
        if (isDropDownOpen === false) {
            setDropDown([]);
        }
    }, [isDropDownOpen])

    const closeDropDown = () => {
        setIsDropDownOpen(false);
    }

    const showArea = (e) => {
        console.log(isDropDownOpen)
        if (isDropDownOpen !== false) {
            console.log("it's not [], good")
            setIsDropDownOpen(false);
        } else {
            setIsDropDownOpen(true);
            console.log(e);
            let rect = e.target.getBoundingClientRect();
            console.log(rect);
            // WITH MARGIN THIS WORKS, BUT NOT WITHOUT
            console.log(`clicked at x: ${e.clientX - rect.left}`)
            console.log(`clicked at y: ${e.clientY - rect.top}`)

            // WITHOUT MARGIN THIS WORKS,  BUT NOT WITH
            console.log(`clicked at x: ${e.pageX - e.target.offsetLeft}`)
            console.log(`clicked at y: ${e.pageY - e.target.offsetTop}`)

            setDropDown(<Dropdown posx={(e.clientX - rect.left)} posy={(e.clientY - rect.top)} charactersToFind={charactersToFind} closeDropDown={closeDropDown}/>)
        }
    }

    return (
        <div className="photo">
            <img src={PhotoScene} alt="scenery containing characters" onClick={(e) => showArea(e)}></img>
            <div>{dropDown}</div>
        </div>
    )
}

export default Photo;

// const testfunc = async () => {

//     try {
//         const docRef = await addDoc(collection(db, "users"), {
//           first: "Ada",
//           last: "Lovelace",
//           born: 1815
//         });
//         console.log("Document written with ID: ", docRef.id);
//       } catch (e) {
//         console.error("Error adding document: ", e);
//       }
// }

    // const retrieveCharacterData = async () => {
    //     const querySnapshot = await getDocs(collection(db, "characters"));
    //     querySnapshot.forEach((doc) => {
    //     console.log(`${doc.id} => ${doc.data()}`);
    //     });
    // }