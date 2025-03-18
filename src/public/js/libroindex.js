
document.querySelectorAll('.btn-volver-libro').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `http://localhost:8000/api/libros/principal`
    })
})

document.querySelector('.buscarLibro').addEventListener('click', async () => {
    const idInput = document.getElementById('IDLFINAL').value;
    if (idInput) {
        window.location.href = `http://localhost:8000/api/libros/${idInput}`;
    } else {
        alert('Error, ingrese el nombre del libro');
    }
})

document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-libro')
        try {
            const response = await fetch(`http://localhost:8000/api/libros/${id}`, {
                method: 'DELETE'
            })
            const result = await response.json()

            if (response.ok) {
                alert("Libro eliminado con exito")
                window.location.href = `http://localhost:8000/api/libros/principal`
            }
        } catch (error) {
            console.error('Error:', error)
            alert('Error al eliminar el autor')
        }
    }
    )
})

document.querySelectorAll('.btn-categorias').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/categorias/principal`

    })
})

document.querySelectorAll('.btn-autor').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/autores/principal`

    })
})

document.querySelectorAll('.btn-createautor').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/autores/crud`

    })
})

document.querySelectorAll('.btn-createcategoria').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/categorias/crud`

    })
})

document.querySelectorAll('.btn-createlibro').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/libros/crud`

    })
})

document.querySelector('#formC').addEventListener('submit', async () => {
    
    const form = document.getElementById('formC'); // Verifica que este ID sea correcto

        const data = {
            titulo: document.getElementById('titulo').value,
            descripcion: document.getElementById('descripcion').value,
            autor: document.getElementById('autor').value,
            precio: document.getElementById('precio').value,
            cantidad: document.getElementById('cantidad').value,
            categorias: document.getElementById('categorias').value
        };

        console.log("Enviando datos...");

        try {
            const response = await fetch('http://localhost:8000/api/libros', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });

            const result = await response.json();
            console.log("Respuesta recibida:", result);
            
            if (response.ok) {
                alert("Libro creado con éxito"); 
                form.reset(); // Limpia el formulario sin recargar la página
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear el libro');
        }
    })