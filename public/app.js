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
