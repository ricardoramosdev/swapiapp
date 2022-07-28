import { Routes, Route } from 'react-router-dom';

import { ItemsDetail } from './ItemsDetail/ItemsDetail';
import { ListItems } from './pages/ListItems/ListItems';

function App() {
  return (
  <>
    <Routes>
      <Route path={'/'} element={<ListItems/>}/>  
      {/* <Route exact path={':URL'} element={<ItemsDetail/>}/>   */}
    </Routes>
  </>
  );
}

export default App;
