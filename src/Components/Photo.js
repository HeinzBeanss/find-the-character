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
            console.log(`clicked at x: ${e.clientX - rect.left}`)
            console.log(`clicked at y: ${e.clientY - rect.top}`)
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