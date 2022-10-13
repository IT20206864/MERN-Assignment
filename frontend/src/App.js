import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Components/home";
import Edit from "./Components/edit";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route path="/home" element = {<Home/>} exact/>
        <Route path="/edit" element = {<Edit/>} exact/>

        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
