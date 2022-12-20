import React, { useEffect, useState } from "react";
import FeedbackMessage from "../Components/FeedbackMessage";
import "../CSS/Dropdown.css";

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

const app = initializeApp(config);
const db = getFirestore(app);

const Dropdown = (props) => {

    // create a response message - show it where you press the cursor basically
    // set it on a timer, maybe with useeffect.
    let [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
    let [feedbackMessage, setFeedbackMessage] = useState([])

    useEffect(() => {
        // timeout here.

        return () => setShowFeedbackMessage(false);
    }, [feedbackMessage])

    const verifyCharacterLocation = async (character) => { 
        props.closeDropDown();
        console.log(character.name);
        
        // Retrieve Character Data from Firebase
        const querySnapshot = await getDocs(collection(db, "characters"));
        querySnapshot.forEach((doc) => {

        // console.log(`${doc.id} => ${doc.data()}`);
        // console.log(doc.data());
        // console.log(doc.data().name);
        // console.log(doc.data().found);
        // console.log(`x coord: ${doc.data().xcoord}, y coord: ${doc.data().ycoord}`);

        // Compare each backend object with character.name
        if (character.name === doc.data().name) {
            // console.log(`you pressed ${doc.data().name}!`)

            if (doc.data().xcoord < (props.posx + 50) && doc.data().xcoord > (props.posx - 50)
                && doc.data().ycoord < (props.posy + 50) && doc.data().ycoord > (props.posy - 50)) {
                    console.log(`you found ${doc.data().name}`)
                    setShowFeedbackMessage(true);
                    setFeedbackMessage(<FeedbackMessage name={doc.data().name}/>);
                    


                } else {
                    console.log(`you didn't find ${doc.data().name}`)
                }
            // console.log(props.posx);
            // console.log(props.posy);
        }
        });
            
        //getdatafor eachcharacter
        // validate it
        // print a message/component on screen depending on the result!
    }

    return (
        <div>
            {/* <div className="feedback">{feedbackMessage}</div> */}
            <div className="dropdown" style={{top: (props.posy - 44), left: (props.posx - 44)}}>
                <div className="areaselected"></div>
                <div className="dropdownlist">
                    <div className="dropdowntitle">Select a Character</div>
                    {props.charactersToFind.map((character, i) => {
                        return (
                            <button className="character" key={i} onClick={() => {verifyCharacterLocation(character)}}>{character.name}</button>
                        )
                    })}
                </div>
                
            </div>
        </div>

    )
}

export default Dropdown;