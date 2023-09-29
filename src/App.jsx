// import './App.css';
// import './components/editor.css';
import Editor from './components/editor';
import Navbar from './components/navbar/navbar';
import Signup from './components/signup';
import Login from './components/login';
import Problem from "./components/problem"
function App() {
  return (
    <div className="App">
      <Navbar/>
      <Problem />
      <Editor/>
    </div>
  );
}

export default App;
