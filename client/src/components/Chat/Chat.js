import React, { Component } from "react";
import "./Chat.css";
import firebase from "../../firebase.js"
import $ from 'jquery'

class Chat extends Component {

    constructor(props) {
        super(props);
        this.state = {
            messages: [] 
        };

    };

    componentWillMount(){
        /* Create reference to messages in Firebase Database */
        let messagesRef = firebase.database().ref("messages").orderByChild("id").limitToLast(25);

        messagesRef.on("child_added", snapshot => {
        /* Update React state when message is added at Firebase Database */
            let message = { 
                text: snapshot.val(), 
                id: snapshot.key 
            };
            this.setState({ 
                messages: [message].concat(this.state.messages)
            });
            $(".chatPoop").animate( { scrollTop: $(".chatPoop").height()+999999999999999999 }, "fast");
        });
        
    };

    addMessage(event){
        event.preventDefault(); // <- prevent form submit from reloading the page
        /* Send the message to Firebase */
        firebase.database().ref("messages").push( firebase.auth().currentUser.displayName + ": " + this.input.value );
        
        this.input.value = ""; // <- clear the input

        console.log(this.state.messages);
    };

    render() {
        return (
            <div className="chat-box">
                <h3 className="chat-title">Chat</h3>
                <hr className="style-one"/>

                <div className="col-lg-12">

                    <div className="row chatPoopDad">
                        <div className="col-lg-12 chatPoop">
                            {this.state.messages.map( message => <h6 key={message.id}>{message.text}</h6> )}
                        </div>
                    </div>

                    <hr className="style-one"/>

                    <form onSubmit={this.addMessage.bind(this)}>
  
                        <div className="row">

                            <div className="col-lg-10">
                                <input className="form-control" type="text" placeholder="Your message" ref={ msg => this.input = msg } required title="Anti-Chris Abuse" minLength="1" maxLength="100" />
                            </div>

                            <div className="col-lg-2">
                                <input className="btn btn-dark" type="submit" />
                            </div>

                        </div>
                    </form>
                </div>
            </div>
        );
    };
};
     
//     return(
//             <div className="col-md-12 border">
//                 <div className="chat-box">
//                 {/* Temporary image placeholder for chat box */}
//                     <h3 className="chat-title">Chat</h3>
//                     <hr className="style-one"/>

//                         <div className="chatPoop">
//                         <div>
                        
//                                 {/* Replace with message history in firebase */}
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
//                             Poop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop herePoop here
                        
//                         </div>
//                     </div>
                    
//                 </div>
//             </div>
//     )
// };

export default Chat;