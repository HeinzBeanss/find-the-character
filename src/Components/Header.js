import React, { useEffect, useState } from "react";
import "../CSS/Header.css"
import Highscores from "../Components/Highscores";

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, getDocs } from "firebase/firestore";

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
    let [getData, setGetData] = useState(true);
    let [highscores, setHighscores] = useState([]);
    let [highscoresData, setHighscoresData] = useState([]);

    useEffect(() => {
        if (getData === true) {
            const getScoreboardData = async () => {
                let temparray = [];
                const querySnapshot = await getDocs(collection(db, "highscores"));
                querySnapshot.forEach((doc) => {

                if (temparray.includes(doc.data())) {
                    // do nothing
                } else {
                    temparray.push(doc.data());
                }
                setGetData(false)
                })

                setHighscoresData(temparray);
            };
        getScoreboardData();
        }
    }, [getData, highscoresData])

    // onMouseEnter passes in true, onMouseLeave passes in false
    const showScoreboard = (show) => {
        if (show === false) {
            setHighscores([])
        } else if (show === true) {
            setHighscores(<Highscores highscores={highscoresData}/>)
        }
    }

    return (
        <div className="header">
            <h1> Find The Character </h1>
            <h2 className="highscoretitle" onMouseEnter={ () => {
                showScoreboard(true);
            }} onMouseLeave={ () => { showScoreboard(false)}}> Highscores {highscores}</h2>
        </div>
    )
}

export default Header;