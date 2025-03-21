document.querySelectorAll('.btn-categorias').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/categorias/principal`

    })
})

document.querySelectorAll('.btn-createautor').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/autores/crud`

    })
})

document.querySelectorAll('.btn-createcategoria').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/categorias/crud`

    })
})

document.querySelectorAll('.btn-createlibro').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/libros/crud`

    })
})

document.querySelectorAll('.btn-autor').forEach(button => {
    button.addEventListener('click', async () => {
        const email = localStorage.getItem('email') 
        window.location.href = `/api/autores/principal/${email}`
    })
})

document.querySelectorAll('.btn-libro').forEach(button => {
    button.addEventListener('click', async () => {
        window.location.href = `/api/libros/principalGestion`

    })
})

