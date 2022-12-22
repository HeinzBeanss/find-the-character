import React, { useEffect, useState } from "react";
import PhotoScene from "../Assets/egor-klyuchnyk.jpg";
import Dropdown from "../Components/Drop-down";
import "../CSS/Photo.css"

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

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

const Photo = () => {

    let [timer, setTimer] = useState(0);
    let [stopTimer, setStopTimer] = useState(false);

    useEffect(() => {
        if (stopTimer === true) {

        } else {
            const onesecondtimer = setTimeout(() => {
                setTimer(timer + 1)
                console.log(timer);
            }, 1000);
            return () => clearTimeout(onesecondtimer);
        }
    }, [timer, stopTimer])

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

    let [charactersFound, setCharactersFound] = useState([]);
    useEffect(() => {
        if (charactersFound.length === 6) {
            console.log("ALL CHARACTERS FOUND!");
            setStopTimer(true);
            console.log(timer);

            
            let minutes = Math.floor(timer / 60);
            // console.log(`minutes: ${minutes}`);
            let minutesPadded = String(minutes).padStart(2, "0");
            // console.log(minutesPadded);

            let seconds = timer - minutes * 60;
            // console.log(`seconds: ${seconds}`);
            let secondsPadded = String(seconds).padStart(2, "0");
            // console.log(secondsPadded);

            let timetodisplay = `${minutesPadded}:${secondsPadded}`;
            console.log(timetodisplay);

            let userName = prompt('Please Enter your Name');
            console.log(userName);

            const writeUsernameToHighscoreBoard = async () => {
                await addDoc(collection(db, "highscores"), {
                    name: userName,
                    time: timetodisplay,
                  });
            }

            writeUsernameToHighscoreBoard();
        }
    }, [charactersFound, timer])

    // FOR DROPDOWN MOUNTING AND UNMOUNTING
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
        if (isDropDownOpen !== false) {
            setIsDropDownOpen(false);
        } else {
            setIsDropDownOpen(true);
            let rect = e.target.getBoundingClientRect();
            // WITH MARGIN THIS WORKS, BUT NOT WITHOUT
            console.log(`clicked at x: ${e.clientX - rect.left}`)
            console.log(`clicked at y: ${e.clientY - rect.top}`)
            // WITHOUT MARGIN THIS WORKS,  BUT NOT WITH
            // console.log(`clicked at x: ${e.pageX - e.target.offsetLeft}`)
            // console.log(`clicked at y: ${e.pageY - e.target.offsetTop}`)

            setDropDown(<Dropdown posx={(e.clientX - rect.left)} posy={(e.clientY - rect.top)} charactersToFind={charactersToFind} closeDropDown={closeDropDown} setFeedbackMessage={setFeedbackMessage} showFeedbackMessage={showFeedbackMessage} setShowFeedbackMessage={setShowFeedbackMessage} charactersFound={charactersFound} setCharactersFound={setCharactersFound}/>)
        }
    }

    // TIMER FOR FEEDBACK MESSAGE MOUNTING THEN UNMOUNTING.
    let [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
    let [feedbackMessage, setFeedbackMessage] = useState([])

    useEffect(() => {
        console.log(feedbackMessage)
        console.log(` should we show feedback message is: ${showFeedbackMessage}`);
        if (showFeedbackMessage === true) {
            console.log("Timer Starts")
            const timer = setTimeout(() =>{
                console.log("3 seconds later");
                setFeedbackMessage([])
                setShowFeedbackMessage(false);
            }, 3000);
            return () => clearTimeout(timer);
        }
        
    }, [feedbackMessage, showFeedbackMessage])

    return (
        <div className="photo">
            <img src={PhotoScene} alt="scenery containing characters" onClick={(e) => showArea(e)}></img>
            <div>{dropDown}</div>
            <div>{feedbackMessage}</div>
        </div>
    )
}

export default Photo;