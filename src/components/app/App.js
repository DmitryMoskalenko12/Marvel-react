import AppHeader from "../appHeader/AppHeader";
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import {MainPage, ComicsPage, Page404, SingleComicPage} from '../pages';

const App = () => {
 
    return (
      <Router>
      
       <div className="app">
          <AppHeader/>
          <main>
          <Routes>
            <Route path="/" element={<MainPage/>}/>
            <Route path="/Comic" element={<ComicsPage/>}/>
            <Route path="*" element={<Page404/>}/>
            <Route path="/Comic/:comicId" element={<SingleComicPage/>}/>
            
            
          </Routes> 
          </main>
          </div>
       
      </Router>
  )
  }
    


export default App;