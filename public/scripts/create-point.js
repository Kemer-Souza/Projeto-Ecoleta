/*
fetch("https://servicodados.ibge.gov.br/api/v1/localidades/distritos") //FETCH faz a requisiçao dos dados.
.then(function(res){return res.json()}) //THEN(entao) vai executar depois colocando o que encontrou em uma funçao , res.json() é para transformar em json. 
.then( function(res){console.log(res)} ) //1° THEN funciona como um filtro para tranformar o objeto em json retornando o objeto formatado
                                          //e ja que o 1° THEN retornou algo ele tbm virou uma promessa podendo tbm ter um THEN
    document.querySelector("select[name=uf]") //QuerySelector seleciona um elemento, nesse caso é o select com o nome uf da pagina.
    .addEventListener("change",()=>{console.log("mudei")}) //addEventListener é o ouvinte a espera da change(mudança)

*/

function populateUfs(){
  
const ufselect = document.querySelector("select[name=uf]"); // a variavel UFSELECT vai se tornar a referencia para o select que tem o nome uf

fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then(function(estados){return estados.json()})
      .then( function(estados){ 
             for( const estado of estados) {
             ufselect.innerHTML +=  `<option value="${estado.id}">${estado.nome}</option>`
                        }
            
          })
}

populateUfs()


function pegarcidades(event){
  
  const cityselect = document.querySelector("select[name=city]"); //selecionando o elemento select que vamos mexer
  cityselect.disabled = true
  const inputSelectEstado = document.querySelector("input[name=estado]"); //selecionando o elemento input que vamos mexer
  console.log(event.target.value)
  const ufvalue = event.target.value //adicionar o id que foi pegado do event para uma variavel
  
  inputSelectEstado.value = event.target.options[event.target.selectedIndex].text
  
  const url = `http://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufvalue}/municipios`
  console.log(url)
  
  cityselect.innerHTML= `<option value="">Selecione a Cidade</option>`
  fetch(url)
    .then(function(res){return res.json()})
      .then( function(cidades){ 
             for( const cidade of cidades) {
            
             cityselect.innerHTML +=  `<option value="${cidade.nome}">${cidade.nome}</option>`
                        }
                        cityselect.disabled = false
            
          })
  

}

document.querySelector("select[name=uf]")
    .addEventListener("change",pegarcidades) //Pegar cidades é uma referencia da funçao para n executar imediatamente, e pode-se passar o evento por parametro



//-----------------------itens de coleta----------------------------------------- 

//pegar todos os li's

const itensToCollect = document.querySelectorAll(".itens-grid li")

for(const i of itensToCollect){
  i.addEventListener("click", handleSelectedItem) // handleSelectedItem é uma função mas esta sem o () para n execultar imediatamente
}

let selectedItens = []; //variavel fora da função 

let inputItens = document.querySelector("input[name=itens]")

function handleSelectedItem(event){

  const itensLi = event.target; //colocando o item em uma variavel

  itensLi.classList.toggle("selected"); // adicionar ou remover classe css

  const itemId = itensLi.dataset.id //selecionar o id da li  que foi colocado no html

  
  //VERIFICAR SE EXISTE ITENS SELCIONADOS SE EXISTIR COLOCAR NA VARIAVEL

  const isSelected = selectedItens.findIndex((i)=>{ //coloca o index do numero encontrado na variavel
       return i == itemId
     })
      if(isSelected>=0){
         const filtrado = selectedItens.filter((i)=>{
          const itemdiferente = i != itemId
          return itemdiferente
        })     
        
      selectedItens = filtrado
    }else{
      selectedItens.push(itemId)
    }
  
  console.log(selectedItens)
  inputItens.value = selectedItens
  }









