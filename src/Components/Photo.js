import React, { useEffect, useState } from "react";
import PhotoScene from "../Assets/egor-klyuchnyk.jpg";
import Dropdown from "../Components/Drop-down";
import "../CSS/Photo.css"

const Photo = () => {

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

            setDropDown(<Dropdown posx={(e.clientX - rect.left)} posy={(e.clientY - rect.top)} charactersToFind={charactersToFind} closeDropDown={closeDropDown} setFeedbackMessage={setFeedbackMessage} showFeedbackMessage={showFeedbackMessage} setShowFeedbackMessage={setShowFeedbackMessage}/>)
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