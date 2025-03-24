

document.querySelectorAll('.buttonPagar').forEach( async button => {
    event.preventDefault();
    
    try {
     
        const email = localStorage.getItem('mail')
        const monto = fetch(`/api/compras/busacarMontoCarrito/${email}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
        })
        
            const datosPago = {
            nombre: document.getElementById('nombre').value,
            numero: document.getElementById('numero').value,
            vencimiento: document.getElementById('vencimiento').value,
            cvv: document.getElementById('cvv').value,
            monto: monto
        };
        
        const respuesta = await fetch('/api/mercadopago/procesar-pago', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(datosPago)
        })
        
        const resultado = await respuesta.json()
        if (!respuesta.ok) {
            fetch(`/api/compras/registrarcompra`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ idCarrito })
                })
        } else {
            alert('Pago procesado sin exito')
        }
        window.location.href = `/api/libros/libros`    

    } catch (error) {    
        console.error('Error:', error)
        alert('Error al procesar el pago')
    }
})

document.querySelectorAll('.btn-volver-libros').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/libros`
    })
})