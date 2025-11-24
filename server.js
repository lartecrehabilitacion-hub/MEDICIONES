const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
const PORT = 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Servimos los archivos del frontend
app.use(express.static(path.join(__dirname, 'public')));

// Rutas API
const medicionesRouter = require('./src/routes/mediciones');
const usuariosRouter = require('./src/routes/usuarios');

app.use('/api/mediciones', medicionesRouter);
app.use('/api/usuarios', usuariosRouter);

// Arrancar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
