

document.querySelectorAll('.buttonPagar').forEach(button => {
    button.addEventListener('click', async event => {
        event.preventDefault();
        
        try {            
            const monto = document.getElementById('monto').value
            
            const datosPago = {
                nombre: document.getElementById('nombre').value,
                numero: document.getElementById('numero').value,
                vencimiento: document.getElementById('vencimiento').value,
                cvv: document.getElementById('cvv').value,
                monto: monto
            };

            // Procesar el pago con Mercado Pago
            const respuesta = await fetch('/api/mercadopago/procesar-pago', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(datosPago)
            })

            const resultado = await respuesta.json()
            console.log('Resultado del pago:', resultado); // Agrega esto para depurar

            if (resultado.ok) {
                // Registrar la compra después de un pago exitoso
                await fetch(`/api/compras/registrarcompra`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ idCarrito }) // Asegúrate de que idCarrito esté definido
                })

                alert('Pago procesado con éxito')
                window.location.href = `/api/libros/libros`// Redirige a la página de libros después del pago
            } else {
                alert('Pago procesado sin éxito')
            }

        } catch (error) {
            console.error('Error:', error)
            alert('Error al procesar el pago')
        }
    })
})


document.querySelectorAll('.btn-volver-libros').forEach(button => {
    button.addEventListener('click', () => {
        window.location.href = `/api/usuarios/libros`
    })
})