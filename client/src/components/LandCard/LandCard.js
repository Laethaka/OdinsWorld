import React from "react";
import "./LandCard.css";
import landcard from './landcard.json';

function LandCard(props) {
    if (props.whiteRaven === props.position) {//WHITE RAVEN IS HERE
        switch (props.image) {
            case 0:
                return <img width="75rem" alt={landcard[0].imageName} src={landcard[0].image} id={props.position} />
            case 1:
                return <img width="75rem" alt={landcard[1].imageName} src={landcard[1].image} id={props.position} />
            case 2:
                return <img width="75rem" alt={landcard[2].imageName} src={landcard[2].image} id={props.position} />
            case 3:
                return <img width="75rem" alt={landcard[3].imageName} src={landcard[3].image} id={props.position} />
            case 4:
                return <img width="75rem" alt={landcard[4].imageName} src={landcard[4].image} id={props.position} />
        }
    } else if (props.blackRaven === props.position) {//BLACK RAVEN IS HERE
        switch (props.image) {
            case 0:
                return <img width="75rem" alt={landcard[0].imageName} src={landcard[0].image} id={props.position} />
            case 1:
                return <img width="75rem" alt={landcard[1].imageName} src={landcard[1].image} id={props.position} />
            case 2:
                return <img width="75rem" alt={landcard[2].imageName} src={landcard[2].image} id={props.position} />
            case 3:
                return <img width="75rem" alt={landcard[3].imageName} src={landcard[3].image} id={props.position} />
            case 4:
                return <img width="75rem" alt={landcard[4].imageName} src={landcard[4].image} id={props.position} />
        }
    } else {
        switch (props.image) {
            case 0:
                return <img width="75rem" alt={landcard[0].imageName} src={landcard[0].image} id={props.position} />
            case 1:
                return <img width="75rem" alt={landcard[1].imageName} src={landcard[1].image} id={props.position} />
            case 2:
                return <img width="75rem" alt={landcard[2].imageName} src={landcard[2].image} id={props.position} />
            case 3:
                return <img width="75rem" alt={landcard[3].imageName} src={landcard[3].image} id={props.position} />
            case 4:
                return <img width="75rem" alt={landcard[4].imageName} src={landcard[4].image} id={props.position} />
        }
    }
};


export default LandCard;
