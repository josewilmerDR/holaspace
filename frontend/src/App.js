// src/App.js
import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container, Grid, CssBaseline, Typography } from '@material-ui/core';
import TaskForm from './components/TaskForm';
import LotForm from './components/LotForm';
import TaskList from './components/TaskList';
import TaskDetail from './components/TaskDetail';
import './App.css';

function App() {
  const [selectedTask, setSelectedTask] = useState(null);

  return (
    <Router>
      <Container maxWidth="lg">
        <CssBaseline />
        <Typography variant="h4" gutterBottom>Gestión de Labores Agrícolas</Typography>
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <TaskList setSelectedTask={setSelectedTask} />
          </Grid>
          <Grid item xs={8}>
            <Routes>
              <Route path="/tasks" element={<TaskDetail task={selectedTask} />} />
              <Route path="/create-task" element={<TaskForm />} />
              <Route path="/create-lot" element={<LotForm />} />
            </Routes>
          </Grid>
        </Grid>
      </Container>
    </Router>
  );
}

export default App;


// // src/App.js
// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import { Container, Typography } from '@material-ui/core';
// import TaskForm from './components/TaskForm';
// import LotForm from './components/LotForm';
// import TaskList from './components/TaskList';

// function App() {
//   return (
//     <Router>
//       <Container>
//         <Typography variant="h4">Gestión de Labores Agrícolas</Typography>
//         <Routes>
//           <Route path="/tasks" element={<TaskList />} />
//           <Route path="/create-task" element={<TaskForm />} />
//           <Route path="/create-lot" element={<LotForm />} />
//         </Routes>
//       </Container>
//     </Router>
//   );
// }

// export default App;
