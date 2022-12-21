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
                    props.setFeedbackMessage(<FeedbackMessage found={true} name={doc.data().name} showFeedbackMessage={props.showFeedbackMessage} posx={props.posx} posy={props.posy}/>);
                    props.setShowFeedbackMessage(true);
                    // setFeedbackMessage(<FeedbackMessage name={doc.data().name}/>);
                    if (props.charactersFound.includes(character.name)) {
                        console.log("ALREADY THERE")
                    } else {
                        props.setCharactersFound(oldArray => [...oldArray, character.name]);
                    }

                    

                } else {
                    props.setShowFeedbackMessage(true);
                    console.log(`you didn't find ${doc.data().name}`)
                    props.setFeedbackMessage(<FeedbackMessage found={false}name={doc.data().name} showFeedbackMessage={props.showFeedbackMessage} posx={props.posx} posy={props.posy}/>);
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