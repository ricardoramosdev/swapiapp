import { Routes, Route } from 'react-router-dom';

import { ListItems } from './pages/ListItems/ListItems';

function App() {
  return (
  <>
    <Routes>
      <Route path={'/'} element={<ListItems/>}/>  
    </Routes>
  </>
  );
}

export default App;
