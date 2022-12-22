import React from "react";
import "../CSS/Highscores.css"

const Highscores = (props) => {

    return (
        <div className="scoreboard">
            {props.highscores.map((item, i) => {
                return (
                    <div className="highscoreitem" key={i}>
                        <div className="highscorename">{item.name}</div>
                        <div className="highscoretime">{item.time}</div>
                    </ div>
                )
            })}
        </div>
    )
}

export default Highscores;