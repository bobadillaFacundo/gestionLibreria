
document.querySelectorAll('.btn-delete').forEach(button => {
    button.addEventListener('click', async () => {
        const id = button.getAttribute('data-id-categoria')
            try {
                const response = await fetch(`http://localhost:8000/api/categorias/${id}`, {
                    method: 'DELETE'
                })
                const result = await response.json()
                alert(result.message)
                if (response.ok) {
                    window.location.href = `http://localhost:8000/api/categorias/principal`
                }
            } catch (error) {
                console.error('Error:', error)
                alert('Error al eliminar el autor')
            }
        }
    )
})