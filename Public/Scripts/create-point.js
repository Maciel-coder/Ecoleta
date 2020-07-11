

function populateUf(){
  const ufSelect = document.querySelector("select[name = uf]")
  
  fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
  .then(res => res.json())
  .then(states =>{
      for(const state of states){
        ufSelect.innerHTML +=  `<option value="${state.id}">${state.nome}</option>`
      }
  })
    
}
populateUf()

function getCities(event){
  const citySelect = document.querySelector("select[name = city]")
  const stateInput = document.querySelector("input[name=state]")
  
  const ufValue = event.target.value

  const indexOfSelectedState = event.target.selectedIndex
  stateInput.value = event.target.options[indexOfSelectedState].text

  const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios/`

  citySelect.innerHTML = "" //limpa os options(campo city) quando ele seleciona outro estado
  citySelect.disabled =true;
  fetch(url)
  .then(res => res.json())
  .then(cities =>{
      for(const city of cities){
        citySelect.innerHTML +=  `<option value="${city.nome}">${city.nome}</option>`
      }
      citySelect.disabled =false
  })

}

//acessando documentos html
document 
    .querySelector("select[name = uf]") //seleciona elemento select cujo name é uf
    .addEventListener("change", getCities) //adiciona um ouvidor de eventos change(que ouve mudancas) e chama a funçao anonima que tem como retorno um consolo.log
    
//itens de coleta
//pegar todos os li"s
const itensToCollect = document.querySelectorAll(".item-grid li")

//percorendo todos li's e adicionando o evento click
for( item of itensToCollect){
  item.addEventListener("click", handleSelectedItem)

}

const collectedItems = document.querySelector("input[name=items]")

let selectItens = []

//função qu dispara o evento
function handleSelectedItem(event){
  const itemLi = event.target

  //adicionar ou remover uma classe com JS com toggle
  itemLi.classList.toggle("selected")
  const itemId = itemLi.dataset.id

  console.log("item id",itemId)


  //verificar se exitem tems selecionados. se sim 
  //pegar os items selecionado
  /*
  *essa mesma função de uma forma mais enchuta(chamada arron function) usada em casos onde necessita uma função anonima (sem parametros)
  * lembrando que nesse tipo de função não é necessario o uso da palavra reservada return
  * e como item e itemId quer tru or false não a necessidade de armazenalas em uma variavel
  * tbm n há necessidade de {}
  const alreadySelected = selectedItens.findIndex(intem => item ===itemId)
  */
 const alreadySelected = selectItens.findIndex(item =>{
  const itemFound = item == itemId //isso sera tru or false
  return itemFound
})
 
  //se ja estiver selecionado
  if(alreadySelected>=0){
    //tirar seleção
    const filteredItems = selectItens.filter(item =>{
      const itemIsDifferent = item != itemId //false
      return itemIsDifferent

    })
    selectItens = filteredItems
  
  }else{
    //se não estiver selecionado, adicionar à seleção 
    selectItens.push(itemId)
   
  }
  console.log("selectItens: ",selectItens)
  //atualizar o campo escodido com os itens selecionados 
  collectedItems.value = selectItens
}
    