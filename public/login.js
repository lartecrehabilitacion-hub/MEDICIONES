const formLogin = document.getElementById('login-form');
const mensajeLogin = document.getElementById('mensaje-login');

formLogin.addEventListener('submit', async (e) => {
    e.preventDefault();

    const usuario = document.getElementById('usuario').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch('/api/usuarios/login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ usuario, password })
        });

        const data = await res.json();

        if (!res.ok || !data.ok) {
            mensajeLogin.textContent = data.error || 'Error de acceso';
            mensajeLogin.style.color = 'red';
            return;
        }

        // Guardamos usuario y rol
        localStorage.setItem('usuario', data.usuario);
        localStorage.setItem('rol', data.rol);

        // Seleccionar destino según el rol
        let destino = '';

        switch (data.rol) {
            case 'ADMIN':
                destino = 'index.html';  // o admin/escritorio.html si lo haces
                break;

            case 'DIRECCION':
                destino = 'DIRECCION/escritorio.html';
                break;

            case 'RECEPCION':
                destino = 'RECEPCION/escritorio.html';
                break;

            case 'TECNICO':
                destino = 'TECNICO/escritorio.html';
                break;

            case 'COMERCIAL':
                destino = 'COMERCIAL/escritorio.html';
                break;

            default:
                destino = 'index.html';
        }

        window.location.href = destino;

    } catch (error) {
        console.error(error);
        mensajeLogin.textContent = 'Error de servidor';
        mensajeLogin.style.color = 'red';
    }
});
