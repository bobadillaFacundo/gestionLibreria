
document.querySelectorAll('.btn-volver-libro').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `http://localhost:8000/api/libros/principal`
    })
})

document.querySelectorAll('.buttonCrearLibro').forEach(button => {
    button.addEventListener('click', async () => {
    
    const formCA = document.getElementById('formCALibro');
        event.preventDefault();
        
        const data = {
            titulo: document.getElementById('titulo').value,
            descripcion: document.getElementById('descripcion').value,
            autor: document.getElementById('autor').value,
            precio: document.getElementById('precio').value,
            cantidad: document.getElementById('cantidad').value,
            categorias: Array.from(document.getElementById('categorias').selectedOptions).map(option => option.value)

        };


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
                formCA.reset()
            } else {
                alert(result.message);
            }
        } catch (error) {
            console.error('Error:', error);
            alert('Error al crear el libro');
        }
    })
})
