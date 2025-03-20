document.querySelector('.buttonCrearUsuario').addEventListener('click', async () => {
  
        window.location.href = `http://localhost:8000/api/login/usuariosCrear`;
   
})


document.getElementById('formCAS').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevenir el envío convencional del formulario

    // Obtener los datos del formulario
    const usuario = document.getElementById('U').value;
    const password = document.getElementById('Cu').value;

    try {
        // Hacer la solicitud para obtener el token
        const response = await fetch('http://localhost:8000/api/login/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usuario, password: password })
        })

        if (!response.ok) {
            const d = await response.json()
            console.error(d.message)
            return
        }

        // Obtener el token de la respuesta
        const { token } = await response.json()

        // Guardar el token en el localStorage
        localStorage.setItem('token', token)

        // Hacer la solicitud para obtener el perfil del usuario
        await fetch('http://localhost:8000/api/usuarios/perfilU', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviar el token en los encabezados
            },
            body: JSON.stringify({ usuario: usuario, password: password })
        })

    } catch (err) {
        console.log('Error al realizar la solicitud:', err);
    }
})
