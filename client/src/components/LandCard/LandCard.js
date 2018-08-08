import React from "react";
import "./LandCard.css";
import landcard from './landcard.json';

function LandCard(props) {
    if (props.whiteRaven === props.position && props.blackRaven === props.position) {//BOTHS RAVENS ARE HERE
        switch (props.image) {//SELECTING TERRAIN TYPE TO DISPLAY
            case 0:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[0].imageName}
                    src={landcard[0].imageBW}
                    id={props.position}
                // onClick={() => props.flipClick(props.position)}
                />
            case 1:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[1].imageName}
                    src={landcard[1].imageBW}
                    id={props.position}
                // onClick={() => props.flipClick(props.position)}
                />
            case 2:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[2].imageName}
                    src={landcard[2].imageBW}
                    id={props.position}
                // onClick={() => props.flipClick(props.position)}
                />
            case 3:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[3].imageName}
                    src={landcard[3].imageBW}
                    id={props.position}
                // onClick={() => props.flipClick(props.position)}
                />
            case 4:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[4].imageName}
                    src={landcard[4].imageBW}
                    id={props.position}
                // onClick={() => props.flipClick(props.position)}
                />
            default:
        }
    } else if (props.whiteRaven === props.position) {//WHITE RAVEN IS HERE
        switch (props.image) {//SELECTING TERRAIN TYPE TO DISPLAY
            case 0:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[0].imageName}
                    src={landcard[0].imageW}
                    id={props.position}
                />
            case 1:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[1].imageName}
                    src={landcard[1].imageW}
                    id={props.position}
                />
            case 2:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[2].imageName}
                    src={landcard[2].imageW}
                    id={props.position}
                />
            case 3:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[3].imageName}
                    src={landcard[3].imageW}
                    id={props.position}
                />
            case 4:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[4].imageName}
                    src={landcard[4].imageW}
                    id={props.position}
                />
            default:
        }
    } else if (props.blackRaven === props.position) {//BLACK RAVEN IS HERE
        switch (props.image) {//SELECTING TERRAIN TYPE TO DISPLAY
            case 0:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[0].imageName}
                    src={landcard[0].imageB}
                    id={props.position}
                />
            case 1:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[1].imageName}
                    src={landcard[1].imageB}
                    id={props.position}
                />
            case 2:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[2].imageName}
                    src={landcard[2].imageB}
                    id={props.position}
                />
            case 3:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[3].imageName}
                    src={landcard[3].imageB}
                    id={props.position}
                />
            case 4:
                return <img
                    className="landCardWorld glowLand"
                    alt={landcard[4].imageName}
                    src={landcard[4].imageB}
                    id={props.position}
                />
            default:
        }
    } else {//NEITHER RAVEN IS HERE
        switch (props.image) {//SELECTING TERRAIN TYPE TO DISPLAY
            case 0:
                return <img
                    className="landCardWorld"
                    alt={landcard[0].imageName}
                    src={landcard[0].image}
                    id={props.position}
                    onClick={() => props.landClick(props.position)}
                />
            case 1:
                return <img
                    className="landCardWorld"
                    alt={landcard[1].imageName}
                    src={landcard[1].image}
                    id={props.position}
                    onClick={() => props.landClick(props.position)}
                />
            case 2:
                return <img
                    className="landCardWorld"
                    alt={landcard[2].imageName}
                    src={landcard[2].image}
                    id={props.position}
                    onClick={() => props.landClick(props.position)}
                />
            case 3:
                return <img
                    className="landCardWorld"
                    alt={landcard[3].imageName}
                    src={landcard[3].image}
                    id={props.position}
                    onClick={() => props.landClick(props.position)}
                />
            case 4:
                return <img
                    className="landCardWorld"
                    alt={landcard[4].imageName}
                    src={landcard[4].image}
                    id={props.position}
                    onClick={() => props.landClick(props.position)}
                />
            default:
        }
    }
};


export default LandCard;
