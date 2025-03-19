document.querySelector('.buttonCrearUsuario').addEventListener('click', async () => {
  
        window.location.href = `http://localhost:8000/api/usuarios/usuariosCrear`;
   
})


document.querySelectorAll('.buttonUsuarioCrear').forEach(button => {
        button.addEventListener('click', async () => {
    
            event.preventDefault()
            const data = {
                email: document.getElementById('Usuario').value,
                contrasenia: document.getElementById('ConstraseniaUsuario').value
            }
    
            try {
                const result = await fetch('http://localhost:8000/api/usuarios', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(data)
                })
                document.getElementById('formC').reset()
                alert('usuario creado con exito', result)
                location.reload();
    
            } catch (error) {
                console.error('Error:', error)
                alert('Error al crear el usuario')
            }
        })
    })