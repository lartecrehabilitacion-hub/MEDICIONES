<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Login MEDICIONES</title>
    <link rel="stylesheet" href="styles.css">
</head>
<body>

    <!-- LOGO ARRIBA A LA DERECHA -->
    <img src="imagenes/logo.png" class="logo-app" alt="Lartec">

    <div class="panel panel-login">
        <h1>Acceso MEDICIONES</h1>

        <form id="login-form">
            <input
                type="text"
                id="usuario"
                placeholder="Usuario"
                required
            >
            <input
                type="password"
                id="password"
                placeholder="Contraseña"
                required
            >
            <button type="submit" class="btn-mostaza">Entrar</button>
        </form>

        <p id="mensaje-login"></p>
    </div>

    <script src="login.js"></script>
</body>
</html>
