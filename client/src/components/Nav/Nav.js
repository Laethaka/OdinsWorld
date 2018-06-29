import React, { Component } from "react";
import firebase, { auth, provider } from '../../firebase.js'

class Nav extends Component {

  constructor() {
    super();
    this.state = {
      username: '',
      user: null
    }
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
  }

  logout() {
    auth.signOut()
      .then(() => {
        this.setState({
          user: null
        });
      });
  }
  login() {
    auth.signInWithPopup(provider)
      .then((result) => {
        const user = result.user;
        this.setState({
          user
        });
      });
  }

  componentDidMount() {
    auth.onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
    });
    // const itemsRef = firebase.database().ref('items');
    // itemsRef.on('value', (snapshot) => {
    //   let items = snapshot.val();
    //   let newState = [];
    //   for (let item in items) {
    //     newState.push({
    //       id: item,
    //       title: items[item].title,
    //       user: items[item].user
    //     });
    //   }
    //   this.setState({
    //     items: newState
    //   });
    // });
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-dark redNav pt-4 pb-4">
        <a className="navbar-brand" href="#">Odin's Reach</a>


        <div className="collapse navbar-collapse d-flex justify-content-end" id="navbarSupportedContent">

          {/* Conditional for logged in user */}

        <header>
          <div className="wrapper">
            {this.state.user ?
              <button onClick={this.logout}>Logout</button>
              :
              <button onClick={this.login}>Log In</button>
            }
          </div>
        </header>
        {this.state.user ?
          <div>
            <div className='user-profile'>
              <img src={this.state.user.photoURL} />
            </div>
          </div>
          :
          <div className='wrapper'>
            <p>Please log in to play Odin's Ravens!</p>
          </div>
        }


        </div>
      </nav>
    )
  };
}
export default Nav;
