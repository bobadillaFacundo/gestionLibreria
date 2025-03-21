
document.querySelectorAll('.btn-volver-libro').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/gestion`
    })
})

document.querySelectorAll('.buttonCrearLibro').forEach(button => {
    button.addEventListener('click', async () => {
    
    const formCA = document.getElementById('formCALibro') 
        event.preventDefault() 
        
        const data = {
            titulo: document.getElementById('titulo').value,
            descripcion: document.getElementById('descripcion').value,
            autor: document.getElementById('autor').value,
            precio: document.getElementById('precio').value,
            cantidad: document.getElementById('cantidad').value,
            categorias: Array.from(document.getElementById('categorias').selectedOptions).map(option => option.value)

        } 


        try {
            const response = await fetch('/api/libros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            }) 

            const result = await response.json() 
            
            if (response.ok) {
                alert("Libro creado con éxito")  
                formCA.reset()
            } else {
                alert(result.message) 
            }
        } catch (error) {
            console.error('Error:', error) 
            alert('Error al crear el libro') 
        }
    })
})


document.querySelectorAll('.buttonCrearLibro').forEach(button => {
    button.addEventListener('click', async () => {
    
    const formCA = document.getElementById('formC') 
        event.preventDefault() 
        
        const data = {
            Usuario: document.getElementById('Usuario').value,
            Contrasenia: document.getElementById('ContraseniaUsuario').value
        } 


        try {
            const response = await fetch('/api/usuarios/libros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            })

            const result = await response.json()
            
            if (response.ok) {
                alert("Libro creado con éxito")
                formCA.reset()
            } else {
                alert(result.message)
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error al crear el libro')
        }
    })
})
