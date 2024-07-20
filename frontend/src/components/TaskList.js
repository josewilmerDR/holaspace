// src/components/TaskList.js
import React, { useState, useEffect } from 'react';
import { List, ListItem, ListItemText, Divider, Typography } from '@material-ui/core';
import axios from 'axios';

const TaskList = ({ setSelectedTask }) => {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/tasks');
        setTasks(response.data);
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div>
      <Typography variant="h6">Tareas</Typography>
      <List>
        {tasks.map((task) => (
          <div key={task.id}>
            <ListItem button onClick={() => setSelectedTask(task)}>
              <ListItemText primary={task.name} secondary={`Fecha: ${task.due_date}`} />
            </ListItem>
            <Divider />
          </div>
        ))}
      </List>
    </div>
  );
};

export default TaskList;



// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { List, ListItem, ListItemText, Button } from '@material-ui/core';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       try {
//         const response = await axios.get('http://localhost:5000/api/tasks'); // Asegúrate de que esta URL es correcta
//         setTasks(response.data);
//       } catch (error) {
//         console.error('Error fetching tasks:', error);
//       }
//     };
//     fetchTasks();
//   }, []);

//   const handleComplete = async (taskId) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/${taskId}`);
//       setTasks(tasks.filter(task => task.id !== taskId));
//     } catch (error) {
//       console.error('Error completing task:', error);
//     }
//   };

//   return (
//     <List>
//       {tasks.map(task => (
//         <ListItem key={task.id}>
//           <ListItemText
//             primary={task.name}
//             secondary={`Fecha: ${task.due_date} - Notas: ${task.notes}`}
//           />
//           <Button onClick={() => handleComplete(task.id)}>Completar</Button>
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default TaskList;


// // src/components/TaskList.js
// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { List, ListItem, ListItemText, Button } from '@material-ui/core';

// const TaskList = () => {
//   const [tasks, setTasks] = useState([]);

//   useEffect(() => {
//     const fetchTasks = async () => {
//       const response = await axios.get('/api/tasks');
//       setTasks(response.data);
//     };
//     fetchTasks();
//   }, []);

//   const handleComplete = async (taskId) => {
//     await axios.post(`/api/tasks/${taskId}/complete`);
//     setTasks(tasks.filter(task => task.id !== taskId));
//   };

//   return (
//     <List>
//       {tasks.map(task => (
//         <ListItem key={task.id}>
//           <ListItemText
//             primary={task.name}
//             secondary={`Fecha: ${task.due_date} - Notas: ${task.notes}`}
//           />
//           <Button onClick={() => handleComplete(task.id)}>Completar</Button>
//         </ListItem>
//       ))}
//     </List>
//   );
// };

// export default TaskList;


