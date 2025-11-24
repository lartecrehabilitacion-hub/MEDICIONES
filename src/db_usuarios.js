const fs = require('fs');
const path = require('path');

const rutaUsuarios = path.join(__dirname, '../data/usuarios.json');

function leerUsuarios() {
  try {
    const data = fs.readFileSync(rutaUsuarios, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

module.exports = {
  leerUsuarios
};
