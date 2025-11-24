const API_URL = '/api/mediciones';

const form = document.getElementById('medicion-form');
const tablaBody = document.getElementById('tabla-mediciones');

// Cargar mediciones al entrar en la página
async function cargarMediciones() {
    const res = await fetch(API_URL);
    const mediciones = await res.json();

    tablaBody.innerHTML = '';

    mediciones.forEach(m => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${m.id}</td>
            <td>${m.cliente}</td>
            <td>${m.direccion}</td>
            <td>${m.valor}</td>
            <td>
                <button onclick="eliminarMedicion(${m.id})">Eliminar</button>
            </td>
        `;

        tablaBody.appendChild(tr);
    });
}

// Enviar formulario
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const cliente = document.getElementById('cliente').value;
    const direccion = document.getElementById('direccion').value;
    const valor = document.getElementById('valor').value;

    await fetch(API_URL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ cliente, direccion, valor })
    });

    form.reset();
    cargarMediciones();
});

// Función global para poder llamarla desde el botón
async function eliminarMedicion(id) {
    await fetch(`${API_URL}/${id}`, {
        method: 'DELETE'
    });
    cargarMediciones();
}

// Primera carga
cargarMediciones();
// app.js

document.addEventListener('DOMContentLoaded', () => {
    // ----- USUARIOS COMERCIALES -----
    const usuarios = [
        { nombre: 'Ana',  usuario: 'asanchez', clave: '1709', rol: 'Comercial' },
        { nombre: 'Gabi', usuario: 'gcalvo',   clave: '2803', rol: 'Comercial' },
        { nombre: 'Luis', usuario: 'lgarcia',  clave: '1990', rol: 'Comercial' }
    ];

    const loginContainer = document.getElementById('login-container');
    const deskComercial  = document.getElementById('desk-comercial');
    const loginBtn       = document.getElementById('btn-login');
    const loginError     = document.getElementById('login-error');
    const tituloDesk     = document.getElementById('titulo-escritorio');

    loginBtn.addEventListener('click', () => {
        const user = document.getElementById('user').value.trim();
        const pass = document.getElementById('pass').value.trim();

        const encontrado = usuarios.find(u => u.usuario === user && u.clave === pass);

        if (!encontrado) {
            loginError.textContent = 'Usuario o contraseña incorrectos';
            return;
        }

        if (encontrado.rol === 'Comercial') {
            loginContainer.style.display = 'none';
            deskComercial.style.display  = 'block';
            tituloDesk.textContent = 'ESCRITORIO ' + encontrado.nombre.toUpperCase();
        } else {
            loginError.textContent = 'Este rol todavía no tiene escritorio configurado.';
        }
    });

    // Permitir pulsar Enter para loguearse
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && deskComercial.style.display === 'none') {
            loginBtn.click();
        }
    });

    // ----- LÓGICA DE MEDICIONES -----
    const form = document.getElementById('medicion-form');
    const tablaBody = document.getElementById('tabla-mediciones');

    let contadorId = 1;

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        const cliente   = document.getElementById('cliente').value.trim();
        const direccion = document.getElementById('direccion').value.trim();
        const valor     = document.getElementById('valor').value;

        if (!cliente || !direccion || !valor) return;

        const fila = document.createElement('tr');

        fila.innerHTML = `
            <td>${contadorId++}</td>
            <td>${cliente}</td>
            <td>${direccion}</td>
            <td>${valor}</td>
            <td>
                <button class="btn-azul btn-eliminar">Eliminar</button>
            </td>
        `;

        tablaBody.appendChild(fila);
        form.reset();
    });

    // Delegación para botón eliminar
    tablaBody.addEventListener('click', (e) => {
        if (e.target.classList.contains('btn-eliminar')) {
            e.target.closest('tr').remove();
        }
    });
});
