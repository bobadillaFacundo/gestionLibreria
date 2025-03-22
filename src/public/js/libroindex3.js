

document.querySelector('.perfil').addEventListener('click', async () => {
    const usuario = localStorage.getItem('email') 
    window.location.href = `/api/usuarios/perfil/${usuario}` 
})

document.querySelector('.carrito').addEventListener('click', async () => {
    const usuario = localStorage.getItem('email') 
    window.location.href = `/api/carritos/principal/${usuario}` 
})

document.querySelectorAll('.btn-autor').forEach(button => {
    button.addEventListener('click', async () => {
        const email = localStorage.getItem('email') 
        window.location.href = `/api/autores/principal/${email}`

    })
})
document.querySelectorAll('.sesion').forEach(button => {
    button.addEventListener('click', () => {
        localStorage.removeItem('email')
        window.location.href = `/api/login/principal`
    })
})
document.querySelectorAll('.btn-comprarLibro').forEach(button => {
    button.addEventListener('click', async () => {
            const usuario = localStorage.getItem('email')
    if (!usuario) {
        alert("No hay usuario registrado. Inicia sesión primero.")
        return
    }
    
    const libro = button.getAttribute('data-id-Libro')
    if (!libro) {
        alert("El libro no tiene un ID válido.")
        return
    }

    try {
        const respuesta = await fetch(`/api/carritos/agregarCarrito`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ usuario: usuario, libro: libro })
        })

        const resultado = await respuesta.json()
        if (respuesta.ok) {
            alert(` ${resultado.mensaje}`)
        } else {
            alert(`Error: ${resultado.error}`)
        }
    } catch (error) {
        console.error("Error:", error)
        alert("Hubo un problema al procesar la petición.")
    }
})
})


