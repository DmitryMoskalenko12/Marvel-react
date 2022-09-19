import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import {Component} from 'react';
import decoration from '../../resources/img/vision.png';

class App extends Component {
  state = {
    charId: null
  }

  onSetCharId = (charId) => {
  this.setState({charId})
  }

  render(){
    return (
      <div className="app">
          <AppHeader/>
          <main>
              <RandomChar/>
              <div className="char__content">
                  <CharList charId = {this.onSetCharId}/>
                  <CharInfo charIdRes = {this.state.charId}/>
              </div>
              <img className="bg-decoration" src={decoration} alt="vision"/>
          </main>
      </div>
  )
  }
    
}

export default App;