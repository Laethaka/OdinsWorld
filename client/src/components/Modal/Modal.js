import React, { Component } from "react";
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Slide from '@material-ui/core/Slide';
import "./Modal.css";

function Transition(props) {
    return <Slide direction="up" {...props} />;
}

class Modal extends Component {
    state = {
        open: false,
        winner: "Victorious",
        loser: "Defeat"
    }

    componentDidMount() {
        this.setState({
            open: true
        })
    }

    soundRender = () => {
        if (this.props.playerNum === this.props.gameResult) {
            return (
                <audio
                    id="resultMusic"
                    src={require("./victorious.wav")}
                    type="audio/wav"
                    autoPlay="autoplay"
                />
            )
        } else {
            return (
                <audio
                    id="resultMusic"
                    src={require("./defeat.wav")}
                    type="audio/wav"
                    autoPlay="autoplay"
                />
            )
        }
    }

    handleClose = () => {
        this.setState({ open: false });

    };

    render() {
        console.log('check', this.props)
        return (
            <div >
                <Dialog
                    open={this.state.open}
                    TransitionComponent={Transition}
                    keepMounted
                    onClose={this.handleClose}
                    aria-labelledby="alert-dialog-slide-title"
                    aria-describedby="alert-dialog-slide-description"
                    classes={{
                        paper: "info-background"
                    }}
                >
                    <DialogTitle id="alert-dialog-slide-title">
                        {"  "}
                    </DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-slide-description">
                            {this.props.playerNum === this.props.gameResult ? <h1 className="modal-content">{this.state.winner}</h1> : <h1 className="modal-content">{this.state.loser}</h1>}
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <a type="btn" className="btn button pr-4 pl-4 button-back-lobb mx-auto" id="vdbutton" href={"/Lobby"}>Back to Lobby</a>
                    </DialogActions>
                    {this.soundRender()}
                </Dialog>
            </div>
        )
    }
}

export default Modal;