// Materialze core
import '../node_modules/materialize-css/dist/js/materialize.min.js'

// Custom styles
import './app.scss'

// Main stuff
import eventController from './modules/eventController'
import displayController from './modules/displayController'
import Seeds from './modules/seeds'

// Materialize initializing
displayController.initMaterialize()

// Seeds
Seeds.load()

// Initial rendering
displayController.initRendering()

// Event listeners
eventController.init()
