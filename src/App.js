import logo from './logo.svg';
import './App.css';
import Header from "./components/Header";
import Eth from "./components/Eth";
import Blocks from "./components/Blocks";
import Transaction from "./components/Transaction";
function App() {
  return (
    <div className="App">
      <Header />
      <br />
      <Eth />
      <br />
    </div>
  );
}

export default App;
