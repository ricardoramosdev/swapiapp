import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ItemsDetail } from './ItemsDetail/ItemsDetail';
import { ListItems } from './pages/ListItems/ListItems';

function App() {
  return (
  <>
    <Routes>
      <Route path={'/'} element={<ListItems/>}/>  
        <Route path={'/person/:URL'} element={<ItemsDetail/>}/>  
    </Routes>
  </>
  );
}

export default App;
