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