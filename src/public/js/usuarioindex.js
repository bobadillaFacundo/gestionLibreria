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
        const response = await fetch('http://localhost:8000/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usuario, password: password })
        });

        if (!response.ok) {
            const d = await response.json();
            console.error(d.message);
            return;
        }

        // Obtener el token de la respuesta
        const { token } = await response.json();

        // Guardar el token en el localStorage
        localStorage.setItem('token', token);

        // Hacer la solicitud para obtener el perfil del usuario
        const perfilResponse = await fetch('http://localhost:8000/api/login/perfilU', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviar el token en los encabezados
            },
            body: JSON.stringify({ usuario: usuario, password: password })
        });

        if (!perfilResponse.ok) {
            const perfilError = await perfilResponse.json();
            console.error(perfilError.message);
        } else {
            // Mostrar el perfil o realizar alguna acción adicional
        }

    } catch (err) {
        console.error('Error al realizar la solicitud:', err);
    }
})

document.getElementById('formC').addEventListener('submit', async function (event) {
    event.preventDefault()

    const usuario = document.getElementById('Usuario').value
    const password = document.getElementById('ConstraseniaUsuario').value
    console.log(usuario, password)
    
    try {
        // Hacer la solicitud para obtener el token
        const response = await fetch('http://localhost:8000/api/login/usuariosCrear', {
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

        // Hacer la solicitud para obtener el perfil del usuario
        const perfilResponse = await fetch('http://localhost:8000/api/login/perfilU', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Enviar el token en los encabezados
            },
            body: JSON.stringify({ usuario: usuario, password: password })
        });

        if (!perfilResponse.ok) {
            const perfilError = await perfilResponse.json();
            console.error(perfilError.message);
        } else {
            // Mostrar el perfil o realizar alguna acción adicional
        }

    } catch (err) {
        console.error('Error al realizar la solicitud:', err);
    }
});