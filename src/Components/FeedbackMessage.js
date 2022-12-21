import React from "react";
import "../CSS/FeedbackMessage.css"
const FeedbackMessage = (props) => {

    if (props.found === true) {
        return (
            <div className="feedback" style={{top: (props.posy - 44), left: (props.posx - 44)}}>You found {props.name}! </div>
        )
    } else if (props.found === false ) {
        return (
            <div className="feedback" style={{top: (props.posy - 44), left: (props.posx - 44)}}> {props.name} isn't here!</div>
        )
    }
}

export default FeedbackMessage;