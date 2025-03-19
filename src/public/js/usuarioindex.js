document.querySelector('.buttonCrearUsuario').addEventListener('click', async () => {
  
        window.location.href = `http://localhost:8000/api/usuarios/usuariosCrear`;
   
})
document.getElementById('formC').addEventListener('submit', function (event) {
        event.preventDefault(); // Prevenir que el formulario se envíe de forma convencional
    
        // Obtener los datos del formulario
        const usuario = document.getElementById('U').value;
        const password = document.getElementById('Cu').value;
    
        // Obtener el token (puede estar en localStorage, cookies, etc.)
        const token = localStorage.getItem('token'); // O desde donde guardes el token
    
        // Crear el objeto con los datos a enviar
        const data = {
            usuario: usuario,
            password: password
        };
    
        // Enviar la solicitud usando Fetch API
        fetch('/api/usuarios/perfil', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}` // Agregar el token en los encabezados
            },
            body: JSON.stringify(data)
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                // Maneja la respuesta exitosa, por ejemplo, redirigir a otra página
                console.log('Usuario validado correctamente');
            } else {
                // Maneja el error, muestra un mensaje
                console.log('Error de validación', data.message);
            }
        })
        .catch(error => console.error('Error:', error));
    })
