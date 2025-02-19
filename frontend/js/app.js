const BASE_URL = `http://localhost:3333/api`;

const formCadastro = document.getElementById('item-form');

// Função utilitárias
const resetForm = () => {
    document.getElementById('name').value = ''
    document.getElementById('description').value = ''
}

/* Inicio do cadastro do item */
const handleFormSubmit = (event) => {
    event.preventDefault();

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;

    console.log(name)
    console.log(description)

    const item = {
        name: name,
        description: description
    }

    await sendItem(item)
    resetForm()

}

const sendItem = async (objItem) => {
    try {
        const res = await fetch(`${BASE_URL}/items`, {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(objItem) // Transformar um obj JS em obj JSON
        })

        if(!res.ok) {
            console.log('Erro ao enviar dados')
            return
        }
        
        console.log('Item Cadastrado com sucesso!')
        resetForm()
    } catch (error) {
        console.log(error)
    }
}
/* Fim do cadastro do item */



// Eventos de interação
formCadastro.addEventListener('submit', handleFormSubmit);