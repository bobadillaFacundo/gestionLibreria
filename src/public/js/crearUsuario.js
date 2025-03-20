
document.getElementById('formC').addEventListener('submit', async function (event) {
    event.preventDefault()

    const usuario = document.getElementById('Usuario').value
    const password = document.getElementById('ConstraseniaUsuario').value
    console.log(usuario, password)
    
    try {
        // Hacer la solicitud para obtener el token
        const response = await fetch('http://localhost:8000/api/login/usuarioCrea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usuario, password: password })
        })
        console.log(response)
        

        if (!response.ok) {
            const d = await response.json();
            console.error(d.message);
            return;
        }

        // Obtener el token de la respuesta
        const { token } = await response.json();
        
        console.log(token)
        
        // Guardar el token en el localStorage
        localStorage.setItem('token', token);

        await fetch('http://localhost:8000/api/usuarios/perfilU', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviar el token en los encabezados
            },
            body: JSON.stringify({ usuario: usuario, password: password })
        })

    } catch (err) {
        console.log('Error al realizar la solicitud:', err)
    }
})