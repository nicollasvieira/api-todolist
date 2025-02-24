const BASE_URL = 'http://localhost:3333/api';

const pegarParametroDaURL = (name) => {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(name)
}

const itemId = pegarParametroDaURL('id');

const buscarItem = async (id) => {
    try {

        const res = await fetch(`${BASE_URL}/items/${id}`, {
            method: 'GET',
            headers: {
                "Content-Type": "application/json"
            }
        })

        if (!res.ok) {
            throw new Error('Erro na requisição')
        }

        const item = await res.json()
        mostrarItem(item)


    } catch (error) {
        console.log(error)
    }
}

const mostrarItem = (objItem) => {
    const formContainer = document.getElementById('form-container');

    formContainer.innerHTML = `
    
                <h2 class="form-container__title">Editar Atividade</h2>
                <form id="item-form" action="#" method="post">
                    <input type="text" name="name" id="name" class="item-form__input" placeholder="Digite a atividade" value="${objItem.name}">
                    <textarea id="description" class="item-form__textarea" placeholder="Descreva sua atividade">${objItem.description}</textarea>
                    <button type="submit" class="item-form__button">Atualizar</button>
                </form>
                
                <div id="message" class="message">Mensagem de retorno</div>
    
    `

    const form = document.getElementById('item-form')

    form.addEventListener('submit', (event) => {
        event.preventDefault()

        atualizarItem(objItem.id)

    })



}

const atualizarItem = async (id) => {
    console.log(id)

    const name = document.getElementById('name').value;
    const description = document.getElementById('description').value;
    console.log(name, description)


    try {
        const res = await fetch(`${BASE_URL}/items/${id}`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, description})
        })

        if(!res.ok) {
            throw new Error("Erro na requisição");
        }
    } catch (error) {
        console.log(error)
    }
}

document.addEventListener('DOMContentLoaded', () => {
    if(itemId) {
        buscarItem(itemId)
    } else {
        console.log('ID da atividade não encontrado.')
    }
})
