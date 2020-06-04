function populateUfs() {
 const ufSelect =  document.querySelector("select[name=uf]");

  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then( response => response.json())
  .then( states => {
    for(state of states) {
      ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`;
    }

  })
}

populateUfs()

function getCities(event) {
  const citySelect = document.querySelector("select[name=city]");
  const stateInput = document.querySelector("input[name=state]");

  const ufValue = event.target.value;  

  const indexOfSelected = event.target.selectedIndex

  stateInput.value = event.target.options[indexOfSelected].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`;

  citySelect.innerHTML = "<option value> Selecione a Cidade</option>";
  citySelect.disabled = true;


  fetch(url)
  .then( response => response.json())
  .then( cities => {
    for(city of cities) {
     citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`;
    }

    citySelect.disabled = false

  } )
}

document
  .querySelector("select[name=uf]")
  .addEventListener("change", getCities);

//Itens de coleta
//Pegar todos os <li>

const itemsCollect = document.querySelectorAll('.items-grid li');

for (const item of itemsCollect) {
  item.addEventListener("click", handleSelectedItem);
}

const collectedItems = document.querySelector('input[name="items"]')

let selectedItems = [];

function handleSelectedItem(event) {
  const itemLi = event.target;

  //adicionar ou remover classe
  itemLi.classList.toggle("selected");

  const itemId = event.target.dataset.id;

  //verificar se existem itens selecionados
  //se sim, pegar os itens selecionados
  const alreadySelected = selectedItems.findIndex(item => {
    const itemFound = item == itemId;
     return itemFound;
  })

  //se já estiver selecionado, tirar da seleção
  if (alreadySelected >= 0 ) {
    const filteredItems = selectedItems.filter(item => {
      const itemIsDifferent = item != itemId
      return itemIsDifferent
    })
    selectedItems = filteredItems
  } else {
  //se não estiver selecionado, adicionar a seleção
    selectedItems.push(itemId)
  }  
  //atualizar o campo  escondio com o s itens selecionados 
  collectedItems = selectedItems
}

