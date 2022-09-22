import AppHeader from "../appHeader/AppHeader";
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import {useState} from 'react';
import decoration from '../../resources/img/vision.png';
import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";


const App = () => {
 const [charId, setCharId] = useState(null)

 const onSetCharId = (charId) => {
    setCharId(charId)
  }

  
    return (
      <div className="app">
          <AppHeader/>
          <main>
             <ErrorBoundary>
               <RandomChar/>
            </ErrorBoundary>
              <div className="char__content">
                <ErrorBoundary>
                   <CharList charId = {onSetCharId}/>
                </ErrorBoundary>
                <ErrorBoundary>
                  <CharInfo charIdRes = {charId}/>
                </ErrorBoundary> 
              </div>
              <img className="bg-decoration" src={decoration} alt="vision"/>
                <AppBanner/>
                <ErrorBoundary>
                  <ComicsList/>
                </ErrorBoundary>
          </main>
      </div>
  )
  }
    


export default App;