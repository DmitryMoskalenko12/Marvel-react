import {useState} from 'react';
import RandomChar from "../randomChar/RandomChar";
import CharList from "../charList/CharList";
import CharInfo from "../charInfo/CharInfo";
import decoration from '../../resources/img/vision.png';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = () =>{

  const [charId, setCharId] = useState(null)

  const onSetCharId = (charId) => {
     setCharId(charId)
   }  
  return(
    <>
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
   </>
  )
}
export default MainPage;