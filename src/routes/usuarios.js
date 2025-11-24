const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

// LOGIN DE USUARIOS
router.post('/login', (req, res) => {
    const { usuario, password } = req.body;

    // Ruta al JSON de usuarios
    const rutaUsuarios = path.join(__dirname, '../../data/usuarios.json');

    // Leer usuarios
    let usuarios;
    try {
        const raw = fs.readFileSync(rutaUsuarios, 'utf8');
        usuarios = JSON.parse(raw);
    } catch (err) {
        console.error('Error leyendo usuarios.json:', err);
        return res.status(500).json({ ok: false, error: 'Error al leer base de datos' });
    }

    // Buscar usuario (sin distinguir mayúsculas)
    const encontrado = usuarios.find(
        u => u.usuario.toLowerCase() === usuario.toLowerCase() && u.password === password
    );

    if (!encontrado) {
        return res.status(401).json({
            ok: false,
            error: 'Credenciales incorrectas'
        });
    }

    // Respuesta correcta
    res.json({
        ok: true,
        usuario: encontrado.usuario,
        rol: encontrado.rol
    });
});

module.exports = router;
