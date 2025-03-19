document.querySelectorAll('.btn-categorias').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/categorias/principal`

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

document.querySelectorAll('.btn-autor').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/autores/principal`

    })
})

document.querySelectorAll('.btn-libro').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `http://localhost:8000/api/libros/principalGestion`

    })
})

