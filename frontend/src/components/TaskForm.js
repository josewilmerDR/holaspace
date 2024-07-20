import React, { useState } from 'react';
import axios from 'axios';

const TaskForm = () => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [isCyclical, setIsCyclical] = useState(false);
  const [cycleDays, setCycleDays] = useState('');
  const [dependencyId, setDependencyId] = useState(null);
  const [lotId, setLotId] = useState(null);
  const [attachedImages, setAttachedImages] = useState([]);

  const handleFileChange = (e) => {
    setAttachedImages(e.target.files);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', name);
    formData.append('notes', notes);
    formData.append('due_date', dueDate);
    formData.append('is_cyclical', isCyclical);
    formData.append('cycle_days', cycleDays ? parseInt(cycleDays) : '');
    formData.append('dependency_id', dependencyId ? parseInt(dependencyId) : '');
    formData.append('lot_id', lotId ? parseInt(lotId) : '');

    for (let i = 0; i < attachedImages.length; i++) {
      formData.append('attached_images', attachedImages[i]);
    }

    try {
      const response = await axios.post('http://localhost:5000/api/tasks', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Task created:', response.data);
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
      <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Notes" />
      <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)} placeholder="Due Date" />
      <input type="checkbox" checked={isCyclical} onChange={(e) => setIsCyclical(e.target.checked)} /> Is Cyclical
      <input type="number" value={cycleDays} onChange={(e) => setCycleDays(e.target.value)} placeholder="Cycle Days" />
      <input type="number" value={dependencyId} onChange={(e) => setDependencyId(e.target.value)} placeholder="Dependency ID" />
      <input type="number" value={lotId} onChange={(e) => setLotId(e.target.value)} placeholder="Lot ID" />
      <input type="file" multiple onChange={handleFileChange} />
      <button type="submit">Create Task</button>
    </form>
  );
};

export default TaskForm;





// // src/components/TaskForm.js
// import React, { useState } from 'react';
// import { TextField, Button, Container } from '@material-ui/core';
// import axios from 'axios';

// const TaskForm = ({ onSubmit }) => {
//   const [name, setName] = useState('');
//   const [notes, setNotes] = useState('');
//   const [dueDate, setDueDate] = useState('');
//   const [lotId, setLotId] = useState('');

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     const task = { name, notes, dueDate, lot_id: lotId };
//     await axios.post('http://localhost:5000/api/tasks', task);
//     if (onSubmit) {
//       onSubmit();
//     }
//   };

//   return (
//     <Container>
//       <form onSubmit={handleSubmit}>
//         <TextField
//           label="Nombre"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           required
//         />
//         <TextField
//           label="Notas"
//           value={notes}
//           onChange={(e) => setNotes(e.target.value)}
//         />
//         <TextField
//           label="Fecha"
//           type="date"
//           value={dueDate}
//           onChange={(e) => setDueDate(e.target.value)}
//           InputLabelProps={{ shrink: true }}
//         />
//         <TextField
//           label="Lote ID"
//           value={lotId}
//           onChange={(e) => setLotId(e.target.value)}
//         />
//         <Button type="submit">Crear Tarea</Button>
//       </form>
//     </Container>
//   );
// };

// export default TaskForm;
