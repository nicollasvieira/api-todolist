const BASE_URL = `http://localhost:3333/api`;

const formCadastro = document.getElementById('item-form');

// Função utilitárias
const resetForm = () => {
    document.getElementById('name').value = ''
    document.getElementById('description').value = ''
}

/* Inicio do cadastro do item */
const handleFormSubmit = async (event) => {
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
                "Content-Type": "application/json",
                Connection: 'close'
            },
            body: JSON.stringify(objItem) // Transformar um obj JS em obj JSON
        })

        if (!res.ok) {
            console.log('Erro ao enviar dados')
            return
        }

        console.log('Item Cadastrado com sucesso!')
        resetForm()
    } catch (error) {
        console.log(error)
    }
}

/**Inicio de buscasr items */

const listItems = async () => {
    try {
        const res = await fetch(`${BASE_URL}/items`, {
            method: 'GET',
            headers: {
                'Content-type': 'application/json'
            }
        })

        if (!res.ok) {
            console.log('Erro ao buscar dados')
            return
        }

        const items = await res.json()
        showItems(items)


    } catch (error) {
        console.log(error)
    }
}

const showItems = async (arrayItems) => {
    const itemList = document.getElementById('item-list')
    itemList.innerHTML = ''

    const cards = arrayItems.map((item) => `
                <article class="item-card">
                    <header class="item-card__header">
                        <h1 class="item-card__title">${item.name}</h1>
                    </header>

                    <section class="item-card__body">
                        <p class="item-card__description">${item.description}</p>
                    </section>

                    <footer class="item-card__footer">
                        <button onclick="editItem(${item.id})" class="item-card__button item-card__button--edit">Editar</button>
                        <button onclick="deleteItem(${item.id})" class="item-card__button item-card__button--delete">Excluir</button>
                    </footer>
                </article>
    
    `).join("")
    itemList.innerHTML = cards

    console.log(arrayItems)
}




/* Fim do cadastro do item */



const deleteItem = async (objId) => {
    try {
        const res = await fetch(`${BASE_URL}/items/${objId}`, {
            method: 'DELETE'
        })

        if(!res.ok) {
            console.log('Erro ao excluir')
            return
        }

    } catch (error) {
        console.log(error)
    }
}

const editItem = (objId) => {
    const url = `./pages/item.html?id=${objId}`
    window.location = url
}


// Eventos de interação
formCadastro.addEventListener('submit', handleFormSubmit);
document.addEventListener('DOMContentLoaded', listItems)