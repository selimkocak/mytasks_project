// frontend\src\App.js
import React from 'react';
import SharedTasks from './components/tasks/SharedTasks';

const App = () => {
  const tasks = [
    { id: 1, title: 'Task 1', description: 'This is task 1', assignedUser: 'User1' },
    { id: 2, title: 'Task 2', description: 'This is task 2', assignedUser: 'User2' },
    // ...
  ];

  return (
    <div className="App">
      <SharedTasks tasks={tasks} />
    </div>
  );
};

export default App;
