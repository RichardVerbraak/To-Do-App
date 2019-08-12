"use strict"

// Gets the stringified todos from localStorage -> converts back to an object and put in todos arr
const getSavedTodos = () => {
    const todoJSON = localStorage.getItem("todos")
    
    try {
        return todoJSON ? JSON.parse(todoJSON) : []
    } catch (e) {
        return []
    }   
    
}

// The todos that are pushed into todos arr -> converted to string for localStorage to save
const saveTodos = (todos) => localStorage.setItem("todos", JSON.stringify(todos))

// Remove todo
const removeTodo = (id) => {
    const todoIndex = todos.findIndex((todo) => todo.id === id)
    
    if (todoIndex > -1) {
        todos.splice(todoIndex, 1)
    }

}

// Toggle todo
const toggleTodo = (id) => {
    const todo = todos.find((todo) => todo.id === id)

    // Flip true or false, !true or !false everytime its clicked (SMARTTT)
    if (todo){
        todo.completed = !todo.completed
    }
    
}

// Render application todos based on filters
const renderTodos = (todos, filters) => {   
    const todosBlock = document.querySelector("#todos")
    let filteredToDo = todos.filter((todo) => todo.text.toLowerCase().includes(filters.searchText.toLowerCase()))

    // Filters the already filtered array even based on checkbox
    filteredToDo = filteredToDo.filter((todo) => {
        // return !filters.hideCompleted || !todo.completed  The 1st one gives shows all items when not checked, the second gives back the remaining todos when checked
        if (filters.hideCompleted) {
            return !todo.completed      // If checkbox is checked (filter.hideCompleted set to true), show all the todos that are NOT completed
        } else {
            return true                 // Else if it isnt checked, just show all of the todos
        }
    })

    const incompleteTodos = filteredToDo.filter((todo) => !todo.completed)    
    
    // Empty the <div> after adding todo in input and todos left summary
    todosBlock.innerHTML = ""    
    todosBlock.appendChild(GenerateSummaryDOM(incompleteTodos) )
           

    // Render filtered todos
    if (filteredToDo.length > 0) {
        filteredToDo.forEach((todo) => {
            todosBlock.appendChild(generateTodoDOM(todo))
        })
    } else {
        const emptyMessage = document.createElement("p")
        emptyMessage.classList.add("empty-message")
        emptyMessage.textContent = "There are no to-dos to show"
        todosBlock.appendChild(emptyMessage)
    }
    
}

// Get the DOM elemenets for an individual note
const generateTodoDOM = (todo) => {
    const todoEl = document.createElement("label")
    const containerEl = document.createElement("div")
    const checkbox = document.createElement("input")
    const span = document.createElement("span")
    const button = document.createElement("button")
    
    // Setup todo checkbox
    checkbox.type = "checkbox"            // or checkbox.setAttribute("type", "checkbox")
    if (todo.completed) {
        checkbox.checked = true
    }
    containerEl.appendChild(checkbox)
    checkbox.addEventListener("change", () => {
        toggleTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })
    
    // Added unnamed todo if note didnt have any text
    // if (todo.text.length > 0) {
    //     span.textContent = todo.text
    // } else {
    //     span.textContent = "Unnamed"
    // }
    
    // Setup todo text
    span.textContent = todo.text
    containerEl.appendChild(span) 
    
    //Setup container
    todoEl.classList.add("list-item")
    containerEl.classList.add("list-item__item__container")
    todoEl.appendChild(containerEl)

    // Setup remove button
    button.textContent = "Remove"
    button.classList.add("button" , "button--text")
    todoEl.appendChild(button)
    button.addEventListener("click", () => {
        removeTodo(todo.id)
        saveTodos(todos)
        renderTodos(todos, filters)
    })    

    return todoEl
}

// Get the DOM elements for list summary
const GenerateSummaryDOM = (incompleteTodos) => {
    const summary = document.createElement("h2")
    const plural = incompleteTodos.length === 1 ? "" : "s"

    // My solution (very clean lol)
    // if (incompleteTodos.length === 0) {
    //     summary.textContent = `You have zero todos left`
    // } else if (incompleteTodos.length === 1) {
    //     summary.textContent = `You have ${incompleteTodos.length} todo left`
    // } else {
    //     summary.textContent = `You have ${incompleteTodos.length} todos left`
    // }
    
    summary.textContent = `You have ${incompleteTodos.length} todo${plural} left`
    summary.classList.add("list-title")
    
    return summary    
}



