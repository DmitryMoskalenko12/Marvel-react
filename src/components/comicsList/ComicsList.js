import './comicsList.scss';
import {useState, useEffect} from 'react'
import useMarvelService from '../../services/MarvelService';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import './comicsList.scss';


const ComicsList = () => {

  const [comic, setComic] = useState([]);
  const [offset, setOffset] = useState(0);
  const [newItemLoading, setNewItemLoading] = useState(false);
  const [comicEnded, setComicEnded] = useState(false);
  
  const {loading, error, getAllComic} = useMarvelService();

  useEffect(() =>{
    onRequest(offset, true);
    //eslint-disable-next-line
  },[])

  const onRequest = (offset, initial) =>{
    initial ? setNewItemLoading(false) : setNewItemLoading(true);
     getAllComic(offset)
    .then(onComicLoaded)
  }

  const onComicLoaded = (newComic) =>{
    let ended = false;
    if(newComic.length < 8){
      ended = true;
  }
    setComic(comic => [...comic, ...newComic]);
    setOffset(offset => offset + 8);
    setNewItemLoading(false);
    setComicEnded(ended);
}
  const renderItems = (comic) => {
   const items = comic.map((elem, i) => {
    let imgStyle = {'objectFit' : 'cover'};
      if (elem.thumbnail === 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available.jpg') {
          imgStyle = {'objectFit' : 'unset'};
      }
     return (
      <li key={i} className="comics__item" style={imgStyle}>
        <a href="#">
            <img src={elem.thumbnail} alt={elem.title} className="comics__item-img"/>
            <div className="comics__item-name">{elem.title}</div>
            <div className="comics__item-price">{elem.price}</div>
        </a>
      </li>
     )
    })

    return(
      <ul className="comics__grid"> 
      {items}
      </ul>
    )
  }
  const content = renderItems(comic);
  const spinner = loading && !newItemLoading ? <Spinner/> : null;
  const fail = error ? <ErrorMessage/> : null;

  return (
    <div className="comics__list">          
            {content}
            {spinner}
            {fail}       
        <button onClick={() => onRequest(offset)} 
                className="button button__main button__long"
                tabIndex={0}
                style = {{'display': comicEnded ? 'none' : 'block'}}
                disabled ={newItemLoading}
                >
            <div className="inner">load more</div>
        </button>
    </div>
  )
}

export default ComicsList;