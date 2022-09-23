import { useParams, Link } from 'react-router-dom';
import useMarvelService from '../../services/MarvelService';
import { useState, useEffect } from 'react';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './singleComic.scss';


const SingleComicPage = () => {
  const {comicId} = useParams();

  const [comic, setComic] = useState(null);
  
  const {loading, error, getComic, clearError} =  useMarvelService();

  useEffect(() => {
    comicInfoUpdate();
    //eslint-disable-next-line
  }, [comicId])
 

  const comicInfoUpdate = () =>{
    clearError();
         getComic(comicId)
        .then(setComicInfoId)
  }

  const setComicInfoId = (comic) =>{
    setComic(comic);
  }
  
 
   const fail = error ? <ErrorMessage/> : null;
   const spinner = loading ? <Spinner/> : null;
   const content = !(error || loading || !comic) ? <View comic = {comic}/> : null;
   
    return (
       <>
       {fail}
       {spinner}
       {content}
       </>
    )
}
const View = ({comic}) =>{
  const {id, title, language, description, pageCount, thumbnail, price} = comic;
  return(
    <div key={id} className="single-comic">
    <img src={thumbnail} alt={title} className="single-comic__img"/>
    <div className="single-comic__info">
        <h2 className="single-comic__name">{title}</h2>
        <p className="single-comic__descr">{description}</p>
        <p className="single-comic__descr">{pageCount}</p>
        <p className="single-comic__descr">Language:{language}</p>
        <div className="single-comic__price">{price}</div>
    </div>
    <Link to="/comic" className="single-comic__back">Back to all</Link>
     </div>
  )
}
export default SingleComicPage;