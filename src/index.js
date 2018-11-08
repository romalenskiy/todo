// Materialze core
import '../node_modules/materialize-css/dist/js/materialize.min.js'

// Custom styles
import './app.scss'

// Main stuff
import eventController from './modules/eventController'
import displayController from './modules/displayController'


// Materialize initializing
displayController.initMaterialize()

// Initial rendering
displayController.initRendering()

// Event listeners
eventController.init()

// import Project from './modules/project'
// import Todo from './modules/todo'
// import Storage from './modules/storage'
// import Helper from './modules/helper'

// let project = Project.create('Test')
// console.log(project)
// Storage.saveProject(project)
// let todo = Todo.create()
// console.log(todo)
// let updatedProject = Project.addTodo(project.id, todo)
// console.log(updatedProject)
// Storage.saveProject(updatedProject)