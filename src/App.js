import "./App.css";
import Homepage from "./pages/Home";
import Nav from "./components/Nav";
import Capsules from "./components/Capsule";

function App() {
  return (
    <div className="App">
      <Nav />
      <Homepage />
      <Capsules />
    </div>
  );
}

export default App;
