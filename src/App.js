import React from 'react';
// import Tab from './components/Tab/Tab.jsx'; 
import TabCollection from './components/TabCollection/TabCollection.jsx';
import './App.css';

function App() {
  // const task = {
  //   id: 0,
  //   description: "Complete the new project for card design",
  //   priorityLevel: "Critical"
  // };

  return (
    <div className="App">
      <h1>Task List</h1>
      <TabCollection /> 
    </div>
  );
}

export default App;
