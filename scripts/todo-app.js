"use strict"

const todos = getSavedTodos()

const filters = {
    searchText: "",
    hideCompleted: false
}

const body = document.querySelector("body")
renderTodos(todos, filters)

// ********* Event Listeners ***********

document.querySelector("#search-text").addEventListener("input", (e) => {
    filters.searchText = e.target.value
    renderTodos(todos, filters)
})

document.querySelector("#add-todo").addEventListener("submit", (e) => {
    e.preventDefault()
    if(e.target.elements.text.value.length > 0) {
        todos.push({
            id: uuidv4(),
            text: e.target.elements.text.value.trim(),
            completed: false
        })
        renderTodos(todos, filters)
        saveTodos(todos)
        e.target.elements.text.value = "" 
    }           
})

// Or make a variable called text storing e.target.elem...trim() and check if greater > 0 and push that like so todos.text: text
// The shorthand is just text, it looks for a local variable called text and makes a property with the name text with that as it value

document.querySelector("#hide-completed").addEventListener("change", (e) => {
    filters.hideCompleted = e.target.checked
    renderTodos(todos, filters)
})

