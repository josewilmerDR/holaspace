// src/components/TaskDetail.js
import React from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';

const TaskDetail = ({ task }) => {
  if (!task) {
    return (
      <Card>
        <CardContent>
          <Typography variant="h5">Selecciona una tarea</Typography>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardContent>
        <Typography variant="h5">{task.name}</Typography>
        <Typography variant="body2" color="textSecondary">
          Fecha: {task.due_date}
        </Typography>
        <Typography variant="body1">{task.notes}</Typography>
        {/* Agrega más detalles según sea necesario */}
      </CardContent>
    </Card>
  );
};

export default TaskDetail;
