function populateUFs(){
    const ufSelect = document.querySelector("select[name=uf]")

        fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
        .then(res => res.json())
        .then(states => {
            for(const state of states){
                ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
            }
        })
}

populateUFs()

function getCities(event){
    //const eventValue = event.target.value
    const citySelect = document.querySelector("select[name=city]")
    const stateInput = document.querySelector("input[name=state]")
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text
    
    const ufValue = event.target.value
    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`

    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then(res => res.json())
    .then(cities => {
        for( const city of cities){
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false 
    })
}
document
    .querySelector("select[name=uf]")
    .addEventListener("change", getCities)


//Itens de coleta
const itemsToCollect = document.querySelectorAll(".items-grid li")

for(const item of itemsToCollect){
    item.addEventListener("click", handleSelectedItem)
}

//Atualizar o campo escondido com os itens selecionados 
const collectedItems = document.querySelector(".items-grid li")

let selectedItems = []

function handleSelectedItem(event){
    const itemLi = event.target

    //Adicionar ou remover uma classe com javascript
    itemLi.classList.toggle("selected")

    const itemId = itemLi.dataset.id
    
    //pegar os item selecionados 
    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId
        return itemFound
    })
    
    //Se ja estiver selecionado tirar da seleção 
    if(alreadySelected != -1){
        //Tirar da seleção
        const filteredItems = selectedItems.filter( item =>{
            const itemIsDifferent = item != itemId
            return itemIsDifferent
        })
        selectedItems = filteredItems
    }
    else{
        //Se não estiver selecionado 
        //adiciona a seleção
        selectedItems.push(itemId)
    }

    //Atualizar o campo escondido com os itens selecionados 
    collectedItems.value=selectedItems
    
}