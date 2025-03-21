
document.getElementById('formC').addEventListener('submit', async function (event) {
    event.preventDefault()

    const usuario = document.getElementById('Usuario').value
    const password = document.getElementById('ConstraseniaUsuario').value
    console.log(usuario, password)
    
    try {
        // Hacer la solicitud para obtener el token
        const response = await fetch('/api/login/usuarioCrea', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username: usuario, password: password })
        })
        console.log(response)
        

        if (!response.ok) {
            const d = await response.json() 
            console.error(d.message) 
            return 
        }

        // Obtener el token de la respuesta
        const { token } = await response.json() 
        
        console.log(token.token)
        
        // Guardar el token en el localStorage
        localStorage.setItem('token', token) 
        localStorage.setItem('email', usuario) 

        //definir una cookies
        document.cookie = `token=${token}  max-age=3600  path=/`    

        window.location.href = `/api/usuarios/libros`

    } catch (err) {
        console.log('Error al realizar la solicitud:', err)
    }
})
document.querySelector('.buttonLoginUsuario').addEventListener('click', async () => {
  
    window.location.href = `/api/login/principal`  
})