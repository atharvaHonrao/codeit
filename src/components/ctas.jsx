import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/lPage.css'; 

class Cards extends Component {
  componentDidMount() {
    const cards = document.querySelectorAll('.card');

    for (const card of cards) {
      card.addEventListener('mousemove', this.handleOnMouseMove);
    }

    const cardsContainer = document.getElementById('cards');

    cardsContainer.addEventListener('mousemove', (e) => {
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  }

  componentWillUnmount() {
    const cards = document.querySelectorAll('.card');

    for (const card of cards) {
      card.removeEventListener('mousemove', this.handleOnMouseMove);
    }

    const cardsContainer = document.getElementById('cards');

    cardsContainer.removeEventListener('mousemove', (e) => {
      for (const card of cards) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;

        card.style.setProperty('--mouse-x', `${x}px`);
        card.style.setProperty('--mouse-y', `${y}px`);
      }
    });
  }

  handleOnMouseMove = (e) => {
    const { currentTarget: target } = e;
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    target.style.setProperty('--mouse-x', `${x}px`);
    target.style.setProperty('--mouse-y', `${y}px`);
  };
  
  render() {
    return (
      <div id="cards">
        <div className="card">
          <div className="card-border"></div>
          <div className="card-content">
            <img src="images/coding.png" className="img-1" alt="" />
            <div>
              <h4>Empower Your Coding Journey</h4>
              <p>Discover a new dimension of learning with CodeIt. Elevate your coding skills, broaden your horizons, and get ready to conquer complex technical challenges.</p>              
              <Link to="/bg-main"><button className="sign-up-btn">Get Started</button></Link>
            </div>
          </div>
        </div>
        <div className="card">
          <div className="card-border"></div>
          <div className="card-content">
            <div>
              <h4>Learn Coding the Smart Way</h4>
              <p>Explore the world of coding and programming with our interactive code editor. Practice, experiment, and refine your skills on real-world problems.</p>
              <Link to="/editor"><button className="code-cta">Start Coding</button></Link>
            </div>
            <img src="images/editor.png" className="img-2" alt="" />
          </div>
        </div>
        <hr className='separator'/>
      </div>  
    )
  }
}

// class SignUp extends Component {
//     handleOnMouseMove = e => {
//         const {currentTarget: target} = e;
//         const rect = target.getBoundingClientRect(),
//             x = e.clientX - rect.left,
//             y = e.clientY - rect.top;

//         target.style.setProperty("--mouse-x", `${x}px`);
//         target.style.setProperty("--mouse-y", `${y}px`);
//     }

//     render() {
//         return (
//           <div className="sign-up" onMouseMove={this.handleOnMouseMove}>
//             <img src="images/coding.png" className="img-1" alt="" />
//             <div className="text">
//               <h1>Empower Your Coding Journey</h1>
//               <p>Discover a new dimension of learning with CodeIt. Elevate your coding skills, broaden your horizons, and get ready to conquer complex technical challenges.</p>
//               <Link to="/bg-main"><button className="sign-up-btn">Get Started</button></Link>
//             </div>
//           </div>
//         );
//     }
// }

// class EditorCTA extends Component {
//     handleOnMouseMove = e => {
//         const {currentTarget: target} = e;
//         const rect = target.getBoundingClientRect(),
//             x = e.clientX - rect.left,
//             y = e.clientY - rect.top;

//         target.style.setProperty("--mouse-x", `${x}px`);
//         target.style.setProperty("--mouse-y", `${y}px`);
//     }

//     render() {
//         return (
//           <div className="editor-cta" onMouseMove={this.handleOnMouseMove}>
//             <div className="text-2">
//               <h1>Learn Coding the Smart Way</h1>
//               <p className="p-2">Explore the world of coding and programming with our interactive code editor. Practice, experiment, and refine your skills on real-world problems.</p>
//               <Link to="/editor"><button className="code-cta">Start Coding</button></Link>
//             </div>
//             <img src="images/editor.png" className="img-2" alt="" />
//           </div>
//         );
//     }
// }    

// export { SignUp, EditorCTA };
export { Cards };