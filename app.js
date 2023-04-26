let novaTarefa = document.getElementById("novaTarefa")
let listaTarefas = document.getElementById("listaTarefas")
let inputTarefa = document.getElementById("inputTarefa")
let tarefasArr = JSON.parse(localStorage.getItem("tarefas")) || []

tarefasArr.forEach((tarefa) => {
  criaItem(tarefa)
})

novaTarefa.addEventListener("submit", function(e) {
  e.preventDefault()

  // validação
  if (inputTarefa.value != "") {

    const tarefaAtual = {
      nome: inputTarefa.value,
      marcada: false
    }
  
    tarefaAtual.id = tarefasArr[tarefasArr.length - 1] ? (tarefasArr[tarefasArr.length - 1]).id + 1 : 0
  
    criaItem(tarefaAtual)
  
    // add ao local storage
    tarefasArr.push(tarefaAtual)
    localStorage.setItem("tarefas", JSON.stringify(tarefasArr)) 
  }   

  // limpa input
  inputTarefa.value = ""
})

function criaCheckbox(tarefa) {
  const checkboxEl = criarElemento("input")
  checkboxEl.setAttribute("type", "checkbox")

  checkboxEl.addEventListener("click", function(e) {

    const isChecked = e.target.checked
    const textoTarefa = e.target.previousElementSibling

    if (isChecked) {
      textoTarefa.style.textDecoration = "line-through"

      // altera propriedade `marcada` do objeto identificando se foi marcada 
      tarefa.marcada = true

    } else {
      textoTarefa.style.textDecoration = "none"
      tarefa.marcada = false
    }

    // reescrevo o local storage para salvar marcada
    localStorage.setItem("tarefas", JSON.stringify(tarefasArr)) 
  })

  // checkbox continuar marcado e texto riscado após atualizar a página de acordo com o local storage  
  window.addEventListener("load", function() {
    if (tarefa.marcada == true) {

      checkboxEl.checked = true
      const pElement = checkboxEl.previousSibling
      pElement.style.textDecoration = "line-through" 
    }
  })

  return checkboxEl
}

function criaBtnDelete() {
  const divBtn = criarElemento("div")

  const buttonEl = criarElemento("button")
  buttonEl.classList.add("delete-button")
  buttonEl.classList.add("outline")
  buttonEl.innerHTML += `<img src="assets/trash-2.svg">`

  divBtn.appendChild(buttonEl)

  // deletar tarefa
  buttonEl.addEventListener("click", function(e) {
    const divTarefa = e.target.parentElement.parentElement.parentElement
    divTarefa.remove()

    // pega o id da div da tarefa correspondente
    let divTarefaId = divTarefa.dataset.id

    deletaElemento(divTarefaId)
  })

  return divBtn
}

function deletaElemento(id) {
  // acha o index do objeto que a propriedade id é igual ao dataset id da div da tarefa
  let elRemoveIndex = tarefasArr.findIndex((obj) => obj.id == id)
  tarefasArr.splice(elRemoveIndex, 1)

  localStorage.setItem("tarefas", JSON.stringify(tarefasArr))
}

function criaItem(tarefa) {

  // cria div pai
  let novoItem = criarElemento("div") 
  novoItem.classList.add("tarefa_item")  
  novoItem.dataset.id = tarefa.id

  // cria div do nome da tarefa
  let nomeTarefa = criarElemento("div")
  nomeTarefa.classList.add("nome_tarefa")
  
  // add texto na div da tarefa nova
  let textoTarefa = criarElemento("p")
  textoTarefa.innerText = tarefa.nome

  nomeTarefa.appendChild(textoTarefa)

  // add div do nome da tarefa ao novo item
  novoItem.appendChild(nomeTarefa)

  // add novo item à lista de tarefas
  listaTarefas.appendChild(novoItem)

  // add checkbox a div do nome da tarefa (funcionou)
  nomeTarefa.appendChild(criaCheckbox(tarefa))

  // add botao de delete
  novoItem.appendChild(criaBtnDelete(tarefa))
}

function criarElemento(tagName) {
  return document.createElement(tagName)
}