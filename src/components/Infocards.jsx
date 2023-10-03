import React, { Component } from 'react';
import { Link } from 'react-router-dom'; 
import '../styles/infocard.css'; 

class InfoCards extends Component {
  componentDidMount() {
    const cards = document.querySelectorAll('.info-card');

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
    const cards = document.querySelectorAll('.info-card');

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

  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
    };
  }

  handleCardClick = (index) => {
    this.setState({ activeIndex: index });
  };

  handlePrevClick = () => {
    const { activeIndex } = this.state;
    this.setState({ activeIndex: (activeIndex - 1 + 3) % 3 });
  };

  handleNextClick = () => {
    const { activeIndex } = this.state;
    this.setState({ activeIndex: (activeIndex + 1) % 3 });
  };
  
  render() {
    const { activeIndex } = this.state;
    return (
      <>
        <h2 id='section-header'>Who can use us?</h2>
        <div className="carousel-container">
          <button className="arrow-button prev" onClick={this.handlePrevClick}>
            &lt;
          </button>
          <div className="carousel" id="cards">
            <div
                className={`info-card ${activeIndex === 1 ? 'left' : ''}`}
                id="left-card"
            >
              <div className="card-border"></div>
              <div className="card-content">
                <img src="images/office.png" className="office-img" alt="" />
                <div>
                <h4>Classroom</h4>
                <p>Can be used in classrooms by teacher</p>
                </div>
              </div>
            </div>
            <div
              className={`info-card ${activeIndex === 0 ? 'center' : ''}`}
              id="center-card"
            >
              <div className="card-border"></div>
              <div className="card-content">
                <img src="images/student.png" className="student-img" alt="" />
                <div>
                <h4>Personal Use</h4>
                <p>Students can use for coding practice</p>
                </div>
              </div>
            </div>
            <div
                className={`info-card ${activeIndex === 2 ? 'right' : ''}`}
                id="right-card"
            >
              <div className="card-border"></div>
              <div className="card-content">
                <img src="images/test.png" className="test-img" alt="" />
                <div>
                <h4>Offices</h4>
                <p>Can be used by organisations to conduct coding test</p>
                </div>
              </div>
            </div>
          </div>
          <button className="arrow-button next" onClick={this.handleNextClick}>
            &gt;
          </button>
        </div>
        {/* // <div id="cards">
        //   <div className="info-card">
        //     <div className="card-border"></div>
        //     <div className="card-content">
        //       <img src="images/test.png" className="test-img" alt="" />
        //       <div>
        //         <h4>Personal Use</h4>
        //         <p>Students can use for coding practice</p>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="info-card">
        //     <div className="card-border"></div>
        //     <div className="card-content">
        //     <img src="images/student.png" className="student-img" alt="" />
        //       <div>
        //         <h4>Classroom</h4>
        //         <p>Can be used in classrooms by teacher</p>
        //       </div>
        //     </div>
        //   </div>
        //   <div className="info-card">
        //     <div className="card-border"></div>
        //     <div className="card-content">
        //     <img src="images/office.png" className="office-img" alt="" />
        //       <div>
        //         <h4>Offices</h4>
        //         <p>Can be used by organisations to conduct coding test</p>
        //       </div>
        //     </div>
        //   </div>
        // </div>   */}
      </>
    )
  }
}

export { InfoCards };