import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main/Main';
import { Provider } from 'react-redux';
import { store } from './Redux/StoreConfig/store';
// import TestElement from './Components/Test_cases/DeleteMethod/testElement';

function App() {

  return (
    <Provider store={store}>
      <BrowserRouter>
        <Main />
      </BrowserRouter>
    </Provider>
  );
}
// const rootElement = document.getElementById('root');
// ReactDOM.render(<App />, rootElement)
export default App;
