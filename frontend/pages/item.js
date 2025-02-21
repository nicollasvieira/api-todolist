const updateData = async (id) => {
    try {
        const res = await fetch(`http://localhost:3333/api/item/${id}`)

        if(!res.ok) {
            throw new Error('Erro na requisição')
        }

        const data = await res.json()
        return data

    } catch (error) {
        console.log(error)
    }
}



const updateDataId = async (item) => {

}

