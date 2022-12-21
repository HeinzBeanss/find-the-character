import React, { useEffect, useState } from "react";
import "../CSS/Header.css"
import Highscores from "../Components/Highscores";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc, getDocs } from "firebase/firestore";
import { async } from "@firebase/util";

const config = {
    apiKey: "AIzaSyAG-z2QOtLeZUr8cjc00p29EvAqCjHXRyI",
    authDomain: "find-the-character-fd842.firebaseapp.com",
    projectId: "find-the-character-fd842",
    storageBucket: "find-the-character-fd842.appspot.com",
    messagingSenderId: "37428567468",
    appId: "1:37428567468:web:41f2700f728230468d2e09"
  };

const app = initializeApp(config);
const db = getFirestore(app);

const Header = () => {
    let [highscores, setHighscores] = useState([]);
    let [highscoresData, setHighscoresData] = useState([]);

    // useEffect(() => {

        
    //     console.log(highscoresData);
    // }, [highscoresData])

  
    
    //on click, get the info, read the data. pass it as props through to highscores!
    const showScoreboard = () => {
        if (highscores !== <Highscores/>) {
            setHighscores(<Highscores/>)
            console.log(highscores);
        } else if (highscores === <Highscores/> ) {
            setHighscores([]);
        }
        // figure out how to close it
    

    }

    const getScoreboardData = async () => {
        const querySnapshot = await getDocs(collection(db, "highscores"));
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
        setHighscoresData(oldArray => [...oldArray, doc.data()]);
        // console.log(highscores);

        })
    };
    
    // getScoreboardData();

    return (
        <div className="header">
            <h1> Find The Character </h1>
            <h2 className="highscoretitle" onClick={ () => {
                showScoreboard();
                getScoreboardData();
            }}> Highscores {highscores}</h2>
        </div>
    )
}

export default Header;