import './charList.scss';
import {Component} from 'react';
import MarvelService from '../../services/MarvelService';
import ErrorMessage from '../errorMessage/ErrorMessage';
import PropTypes from 'prop-types';
import Spinner from '../spinner/Spinner';

class CharList extends Component {
  state = {
    charList: [],
    loading: true,
    error: false,
    offset: 210,
    newItemLoading: false,
    charEnded: false
  }

  marvelService = new MarvelService();

componentDidMount(){
  this.onRequest();
  /* window.addEventListener('scroll', ()=> this.onScroll()) */
}
/* conponentWillUnmount(){
  window.removeEventListener('scroll', ()=> this.onScroll())
} */

onCharListLoaded = (newCharList) => {
  let ended = false;
  if(newCharList.length < 9){
    ended = true;
  }
  this.setState(({offset, charList})=>({
    charList: [...charList, ...newCharList],
    offset: offset + 9, 
    loading: false,
    newItemLoading: false,
    charEnded: ended
    }))
}

onCharListError = () =>{
  this.setState({loading: false, error: true})
}

onRequest = (offset) =>{
  this.onCharListLoading();
  this.marvelService.getAllCharacters(offset)
      .then(this.onCharListLoaded)
      .catch(this.onCharListError)

}

onCharListLoading = () =>{
  this.setState({
    newItemLoading: true
  })
}

/* onScroll = () =>{
  if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 3) {
    this.onRequest(this.state.offset);
  }
} */

renderItems(arr) {
  const items =  arr.map((item) => {
      let imgStyle = {'objectFit' : 'cover'};
      if (item.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
          imgStyle = {'objectFit' : 'unset'};
      }
      
      return (
          <li 
              className="char__item"
              onClick={() => this.props.charId(item.id)}
              key={item.id}>
                  <img src={item.thumbnail} alt={item.name} style={imgStyle}/>
                  <div className="char__name">{item.name}</div>
          </li>
      )
  });
  
  return (
      <ul className="char__grid">
          {items}
      </ul>
  )
}

  render(){
    const {charList, loading, error, offset, newItemLoading, charEnded} = this.state;
    const items = this.renderItems(charList);
    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    return (
        <div className="char__list">
            {errorMessage}
            {spinner}
            {content}
            <button onClick={() => this.onRequest(offset)} 
                    className="button button__main button__long"
                    disabled ={newItemLoading}
                    style = {{'display': charEnded ? 'none' : 'block'}}
            >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}
    
}
CharList.propTypes = {
  charId: PropTypes.func.isRequired
}

export default CharList;