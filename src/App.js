import Column from './components/column';
import './styling/App.css';

function App() {
  return (
    <div className="App">
        <div className='columns-container'>
          <Column text="Orders"/>
          <Column text="In progress"/>
          <Column text="Done"/>
        </div>
    </div>
  );
}

export default App;
