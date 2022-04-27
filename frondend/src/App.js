import Vimal from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from 'react-router-dom';
import Main from './Components/Main/Main';
import Header from "./Components/Navigates/Header/Header";
import Footer from "./Components/Navigates/Fooder/Footer";
import { Provider } from 'react-redux';
import { store } from './Redux/StoreConfig/store';

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <Header/>
        <Main/>     
        <Footer/>
      </BrowserRouter>
    </Provider>
  );
}
const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement)
export default App;
