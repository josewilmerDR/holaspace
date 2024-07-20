// src/components/LotForm.js
import React, { useState } from 'react';
import { TextField, Button, Container } from '@material-ui/core';
import axios from 'axios';

const LotForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [notes, setNotes] = useState('');
  const [customFields, setCustomFields] = useState({});

  const handleChange = (e) => {
    setCustomFields({
      ...customFields,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const lot = { name, notes, custom_fields: customFields };
    await axios.post('/api/lots', lot);
    if (onSubmit) {
      onSubmit();
    }
  };

  return (
    <Container>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <TextField
          label="Notas"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
        <TextField
          label="Campo Personalizado 1"
          name="customField1"
          onChange={handleChange}
        />
        <TextField
          label="Campo Personalizado 2"
          name="customField2"
          onChange={handleChange}
        />
        {/* Añade más campos personalizados según sea necesario */}
        <Button type="submit">Crear Lote</Button>
      </form>
    </Container>
  );
};

export default LotForm;
