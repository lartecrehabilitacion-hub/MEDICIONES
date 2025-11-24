const express = require('express');
const router = express.Router();

const { leerUsuarios } = require('../db_usuarios');

// POST /api/usuarios/login
router.post('/login', (req, res) => {
  const { usuario, password } = req.body;

  const usuarios = leerUsuarios();
  const encontrado = usuarios.find(
    u => u.usuario === usuario && u.contrasena === password
  );

  if (!encontrado) {
    return res.status(401).json({ ok: false, error: 'Credenciales incorrectas' });
  }

  return res.json({
    ok: true,
    usuario: encontrado.usuario,
    rol: encontrado.tipo
  });
});

module.exports = router;
