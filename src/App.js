import './App.css';
import ReactDOM from 'react-dom';
import React from 'react';

const SoundBank = [
  {
    keyCode: 81,
    keyTrigger: 'Q',
    id: 'Heater-1',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-1.mp3'
  },
  {
    keyCode: 87,
    keyTrigger: 'W',
    id: 'Heater-2',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-2.mp3'
  },
  {
    keyCode: 69,
    keyTrigger: 'E',
    id: 'Heater-3',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 65,
    keyTrigger: 'A',
    id: 'Heater-4',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-3.mp3'
  },
  {
    keyCode: 83,
    keyTrigger: 'S',
    id: 'Clap',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Heater-6.mp3'
  },
  {
    keyCode: 68,
    keyTrigger: 'D',
    id: 'Open-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Dsc_Oh.mp3'
  },
  {
    keyCode: 90,
    keyTrigger: 'Z',
    id: 'Kick-n-Hat',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Kick_n_Hat.mp3'
  },
  {
    keyCode: 88,
    keyTrigger: 'X',
    id: 'Kick',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/RP4_KICK_1.mp3'
  },
  {
    keyCode: 67,
    keyTrigger: 'C',
    id: 'Closed-HH',
    url: 'https://s3.amazonaws.com/freecodecamp/drums/Cev_H2.mp3'
  }
]

//onClick={() => sound.play()}
class DrumPad extends React.Component {
  constructor(props) {
    super(props);
    this.playSound = this.playSound.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }
  componentDidMount() {
    document.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    document.removeEventListener('keydown', this.handleKeyPress);
  }

  handleKeyPress(e) {
    if (e.keyCode === this.props.keyCode) {
      this.playSound();
    }
  }

  playSound() {
    const sound = new Audio(this.props.clip);
    sound.currentTime = 0;
    sound.play();
    this.props.updateDisplay(this.props.clipId.replace(/-/g, ' '));
  }



  render() {
    return(
      <div
        className='drum-pad'
        id={this.props.clipId}
        onClick={this.playSound}
        >
        <audio
          className='clip'
          id={this.props.keyTrigger}
          src={this.props.clip}
        />
        {this.props.keyTrigger}
      </div>
    );
  }
}

class PadBank extends React.Component {

  render () {
    let padBank;
    padBank = this.props.currentPadBank.map((drumObj, i, padBankArr) => {
      return (
        <DrumPad
          clip={padBankArr[i].url}
          clipId={padBankArr[i].id}
          keyCode={padBankArr[i].keyCode}
          keyTrigger={padBankArr[i].keyTrigger}
          updateDisplay={this.props.updateDisplay}
        />
      )
    });
    console.log(padBank)
    return <div className='pad-bank'>{padBank}</div>;
  }
}

class App extends React.Component{
  constructor(props) {
    super(props);
    this.state = {
      display: String.fromCharCode(160),
      currentPadBank: SoundBank
    };
    this.displayClipName = this.displayClipName.bind(this); //I dont understand this? see https://stackoverflow.com/questions/31045716/react-this-setstate-is-not-a-function
  }

  displayClipName(name) {
    this.setState({display: name});
  }

  render() {
    return (
      <div>
        <div>
          <PadBank
            currentPadBank={SoundBank}
            updateDisplay={this.displayClipName}
          />
        </div>
          <p id='display'>{this.state.display}</p>
      </div>
    );
  }
}

export default App;
ReactDOM.render(<App />, document.getElementById('root'));
