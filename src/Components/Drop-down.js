import React, { useEffect } from "react";
import "../CSS/Dropdown.css";

const Dropdown = (props) => {

    const verifyCharacterLocation = (character) => { 
        props.closeDropDown();
        console.log(character.name);
    }

    useEffect(() => {
        console.log(props)
    })
    return (
        
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

    )
}

export default Dropdown;