import './charInfo.scss';
import {Component} from 'react';
import Skeleton from '../skeleton/Skeleton';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import PropTypes from 'prop-types';


class CharInfo extends Component {
  state = {
    charId: null,
    error: false,
    loading: false
  }

  marvelServis = new MarvelService();

  componentDidMount(){
    this.CharInfoUpdate();
  }

  componentDidUpdate(prevProps){
    if(this.props.charIdRes !== prevProps.charIdRes){
     this.CharInfoUpdate();
    }
  }

  CharInfoUpdate = () =>{

    if(!this.props.charIdRes){
      return
    }

    this.onCharLoading();

    this.marvelServis
        .getCharacter(this.props.charIdRes)
        .then(this.setCharInfoId)
        .catch(this.onSetErrorInfo)
  }

  setCharInfoId = (charId) =>{
    this.setState({charId, loading: false})
  }

  onSetErrorInfo = () =>{
    this.setState({error: true, loading: false})
  }

  onCharLoading = () =>{
    this.setState({loading: true})
  }
  render(){
   const {charId, error, loading} = this.state;

   const skeleton = charId || error || loading ? null : <Skeleton/>;
   const fail = error ? <ErrorMessage/> : null;
   const spinner = loading ? <Spinner/> : null;
   const content = !(error || loading || !charId) ? <View charId = {charId}/> : null;
   
    return (
      <div className="char__info">
         {skeleton}
         {fail}
         {spinner}
         {content}
      </div>
  )
  } 
}
const View = ({charId}) => {
const {name, description, thumbnail, comics, homepage, wiki} = charId;
const comic = comics.map((elem, i) =>{
  /* eslint-disable-next-line */
  if (i > 9) return
  
  return (
    <li key={i} className="char__comics-item">
    {elem.name}
   </li>
  )
})

const imageStyle = thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg' ? {objectFit: 'contain'} : {objectFit: 'cover'} ;

return(
  <>
     <div className="char__basics">
              <img style={imageStyle} src={thumbnail} alt={name}/>
              <div>
                  <div className="char__info-name">{name}</div>
                  <div className="char__btns">
                      <a href={homepage} className="button button__main">
                          <div className="inner">homepage</div>
                      </a>
                      <a href={wiki} className="button button__secondary">
                          <div className="inner">Wiki</div>
                      </a>
                  </div>
              </div>
          </div>
          <div className="char__descr">
              {description}
          </div>
          <div className="char__comics">Comics:</div>
          <ul className="char__comics-list">
            {comics.length === 0 ? 'The character has no comics' : null}
            {comic}
            
          </ul>
  </>
)

}

CharInfo.propTypes = {
  charIdRes: PropTypes.number
}

export default CharInfo;