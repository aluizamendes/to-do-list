let novaTarefa = document.getElementById("novaTarefa")
let listaTarefas = document.getElementById("listaTarefas")
let inputTarefa = document.getElementById("inputTarefa")

novaTarefa.addEventListener("submit", function(e) {
  e.preventDefault()
  //console.log("TAREFA CRIADA")

  // cria div pai
  let novoItem = criarElemento("div") 
  novoItem.classList.add("tarefa_item")  

  // cria div do nome da tarefa
  let nomeTarefa = criarElemento("div")
  nomeTarefa.classList.add("nome_tarefa")
  
  // add texto na div da tarefa nova
  nomeTarefa.innerHTML += `<p>${inputTarefa.value}</p>`

  // add div do nome da tarefa ao novo item
  novoItem.appendChild(nomeTarefa)

  // add novo item à lista de tarefas
  listaTarefas.appendChild(novoItem)

  // add checkbox a div do nome da tarefa (funcionou)
  nomeTarefa.appendChild(criaCheckbox())

  // add botao de delete
  novoItem.appendChild(criaBtnDelete())

  // limpa input
  inputTarefa.value = ""

})

function criaCheckbox() {

  const checkboxEl = criarElemento("input")
  checkboxEl.setAttribute("type", "checkbox")

  checkboxEl.addEventListener("click", function(e) {
    const isChecked = e.target.checked
    const textoTarefa = e.target.previousElementSibling

    if (isChecked) {
      textoTarefa.style.textDecoration = "line-through"

    } else {
      textoTarefa.style.textDecoration = "none"
    }
  })

  return checkboxEl
}

function criaBtnDelete() {
  const divBtn = criarElemento("div")

  const buttonEl = criarElemento("button")
  buttonEl.classList.add("delete-button")
  buttonEl.classList.add("outline")
  buttonEl.innerHTML += "X"

  divBtn.appendChild(buttonEl)

  // deletar tarefa
  buttonEl.addEventListener("click", function(e) {
    const parentEl = e.target.parentElement.parentElement
    parentEl.remove()
  })

  return divBtn
}

function criarElemento(tagName) {
  return document.createElement(tagName)
}