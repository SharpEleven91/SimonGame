import React from 'react';
import $ from "jquery";
import sound1 from './sounds/simonSound1.mp3';
import sound2 from './sounds/simonSound2.mp3';
import sound3 from './sounds/simonSound3.mp3';
import sound4 from './sounds/simonSound4.mp3';
import soundError from './sounds/simonError.mp3';
import PowerButton from './PowerButton.js';
import StartButton from './StartButton.js';
import StrictButton from './StrictButton.js';
import StrictLight from './StrictLight.js';
import Colors from './Colors.js';
import Counter from './Counter.js';
import './App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      power: false,
      strict: false,
      count: 0,
      active: false,
      gameStarted: false,
      actions: [],
      clicks: 0,
    }
  }
  
  // handles click event on ColorButton component
  handleColorClick(e) {
    let actions = this.state.actions.slice();
    if (this.state.power && !this.state.active) {
      let button = e.target.classList[0];
      if (button === actions[this.state.clicks]) {
        this.playAudio(button);
        this.setState({
          clicks: this.state.clicks + 1,
        }, () => {
          if (this.state.clicks === actions.length) {
            this.setState({
              clicks: 0
            }, () => {
              this.play();
            })
          }
        })
      } else {
        this.wrongInput();
        if (this.state.strict) {
          this.setState({
            actions: []
          }, () => {
            for (let i = 0; i < this.state.count; i++) {
              this.addNewColorAction();
            }
          })
        }
        this.setState({
          clicks: 0,
          active: true,
        }, () => {
          this.sequence();
        });
      }
    }
  }
  
  // handles click event on StrictButton component
  handleStrictClick() {
    if (this.state.strict) {
      this.setState({
        strict: false,
      });
    } else {
      this.setState({
        strict: true,
      });
    }
  }
  
  // handles click event on PowerButton component
  handlePowerClick() {
    if (this.state.power) {
      this.setState({
        power: false,
        strict: false,
        active: false,
        gameStarted: false,
        actions: [],
        count: 0,
      })
    } else {
      this.setState({
        power: true,
      })
    }
  }
  
  // Generate a number between 1 - 4
  // Number represents color:
  //    1 = green
  //    2 = red
  //    3 = yellow
  //    4 = blue
  generateColor() {
    let min = Math.ceil(1);
    let max = Math.floor(5);
    let color = Math.floor(Math.random() * (max - min)) + min;
    switch(color) {
      case 1:
        return 'green'
      case 2:
        return 'red'
      case 3:
        return 'yellow'
      case 4:
        return 'blue'
      default:
        break;
    }
  }
  
  // Add generated color to array
  addNewColorAction() {
    let arr = this.state.actions;
    arr.push(this.generateColor());
    this.setState({
      actions: arr,
    });
  }
  
  // play generated sequence
  sequence() {
    let actions = this.state.actions;
    let i = 0;
    let animateInterval = setInterval( () => {
      this.animate(actions[i]);
      i++;
      if (i >= actions.length || !this.state.power) {
        clearInterval(animateInterval);
        animateInterval = null;
        if (!animateInterval) {
          this.setState({
            active: false
          })
        }
      }
    }, 1000);
    
  }
  
  // Play the colors corresponding audio file
  playAudio(color) {
    let greenAudio = new Audio(sound1);
    let blueAudio = new Audio(sound2);
    let redAudio = new Audio(sound3);
    let yellowAudio = new Audio(sound4);
    switch(color) {
      case "green":
        greenAudio.play();
        break;
      case "blue":
        blueAudio.play();
        break;
      case "red":
        redAudio.play();
        break;
      case "yellow":
        yellowAudio.play();
        break;
      default: 
        break;
    }
  } 
  
  // add css class to element
  animate(color) {
    let element = $("." + color);
    let animateClass = "active-" + color;
    element.addClass(animateClass);
    this.playAudio(color);
    setTimeout(function() {
      element.removeClass(animateClass)
    }, 800);
  }
  
  // increment the count by one then add new color to Action state, play sequence of colors in action stat
  // then check victory condition
  play() {
    if (this.state.power && this.state.gameStarted && !this.state.active && this.state.count <= 19) {
      this.setState({
        active: true,
        count: this.state.count + 1,
      }, () => { this.addNewColorAction()})
      this.sequence();
    } else if (this.state.power && this.state.gameStarted && this.state.count === 20) {
      this.victory();
    }
    
  }
  
  // notifies user that they have placed wrong input
  wrongInput() {
    let errorSound = new Audio(soundError);
    errorSound.play();
    $("#frame").addClass("shake-effect");
    setTimeout(() => {
      $("#frame").removeClass("shake-effect");
    }, 500);
  }
  
  // handle click event on StartButton component
  handleStartClick() {
    if (this.state.power && !this.state.active && !this.state.gameStarted) {
      this.setState({
        gameStarted: true
      }, function() {
        this.play();
      })
    }  
  }
  
  // set count to WIN and lock the game with active state until powered off or reset
  victory() {
    if (this.state.count === 20) {
      this.setState({
        count: "WIN",
        active: true,
      })
    }
  }
  
  render() {
    return <div>
           <Colors power={this.state.power} click={this.handleColorClick.bind(this)}/>
           <div className="outer-mask">
               <div className="vertical-line"></div>
               <div className="horizontal-line"></div>
               <div className="center">
                <div className="center-content">
                  <div className="simon-header">
                   <div className="text">SIMON</div>
                  </div>
                  <div className="button-wrapper">
                    <div className="counter-wrapper">
                      <p className="counter-text">Count</p>
                      <div className="counter-bg">
                        <Counter power={this.state.power} counter={this.state.count}/>
                      </div>
                   </div>
                   <div className="start-wrapper">
                    <p className="start-text">Start</p>
                    <div className="start-bg">
                      <StartButton clickHandle={this.handleStartClick.bind(this)}/>
                    </div>
                   </div>
                   <div className="strict-wrapper">
                    <p className="strict-text">Strict</p>
                    <div className="strict-active">
                      <StrictLight strict={this.state.strict}/>
                    </div>
                    <div className="strict-bg">
                      <StrictButton strict={this.state.strict} click={this.handleStrictClick.bind(this)}/>
                    </div>
                   </div>
                   <div className="power-wrapper">
                    <p className="on">ON</p>
                    <div className="power-bg">
                      <PowerButton clickHandle={this.handlePowerClick.bind(this)} power={this.state.power}/>
                    </div>
                    <p className="off">OFF</p>
                  </div>
                 </div>
                </div>
              </div>
            </div>
          </div>
  }
}






//ReactDOM.render(
//<App/>, document.getElementById('frame'));

export default App