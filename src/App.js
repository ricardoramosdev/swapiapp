import { Routes, Route } from 'react-router-dom';
import './App.css';
import { ItemsDetail } from './ItemsDetail/ItemsDetail';
import { ListItems } from './pages/ListItems/ListItems';

function App() {
  return (
  <>
    <Routes>
      <Route path={'/'} element={<ListItems/>}/>  
        <Route path={'/detail'} element={<ItemsDetail/>}/>  
    </Routes>
  </>
  );
}

export default App;
