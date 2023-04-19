let novaTarefa = document.getElementById("novaTarefa")
let listaTarefas = document.getElementById("listaTarefas")
let inputTarefa = document.getElementById("inputTarefa")
let tarefasArr = JSON.parse(localStorage.getItem("tarefas")) || []

tarefasArr.forEach((el) => {
  criaItem(el)
})

novaTarefa.addEventListener("submit", function(e) {
  e.preventDefault()

  criaItem(inputTarefa.value,)

  // add ao local storage
  tarefasArr.push(inputTarefa.value)
  localStorage.setItem("tarefas", JSON.stringify(tarefasArr)) 

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

    // remover item do local storage
    const textElement = divBtn.previousElementSibling.firstChild
    const indexElRemove = tarefasArr.indexOf(textElement.textContent)
    tarefasArr.splice(indexElRemove, 1)

    localStorage.setItem("tarefas", JSON.stringify(tarefasArr))
  })

  return divBtn
}

function criaItem(tarefa) {

  // cria div pai
  let novoItem = criarElemento("div") 
  novoItem.classList.add("tarefa_item")  

  // cria div do nome da tarefa
  let nomeTarefa = criarElemento("div")
  nomeTarefa.classList.add("nome_tarefa")
  
  // add texto na div da tarefa nova
  nomeTarefa.innerHTML += `<p>${tarefa}</p>`

  // add div do nome da tarefa ao novo item
  novoItem.appendChild(nomeTarefa)

  // add novo item à lista de tarefas
  listaTarefas.appendChild(novoItem)

  // add checkbox a div do nome da tarefa (funcionou)
  nomeTarefa.appendChild(criaCheckbox())

  // add botao de delete
  novoItem.appendChild(criaBtnDelete())
}

function criarElemento(tagName) {
  return document.createElement(tagName)
}