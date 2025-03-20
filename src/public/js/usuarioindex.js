document.querySelector('.buttonCrearUsuario').addEventListener('click', async () => {
  
        window.location.href = `/api/login/usuariosCrear`
   
})


document.getElementById('formCAS').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevenir el envío convencional del formulario

    // Obtener los datos del formulario
    const usuario = document.getElementById('U').value;
    const password = document.getElementById('Cu').value;

    try {
        // Hacer la solicitud para obtener el token
        const response = await fetch('/api/login/login', {
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
        localStorage.setItem('email', usuario)

        //definir una cookies
        document.cookie = `token=${token}; max-age=3600; path=/`
        
        // Redireccionar a la nueva página
        window.location.href =`/api/usuarios/perfil/${usuario}`

    } catch (err) {
        console.log('Error al realizar la solicitud:', err);
    }
})
