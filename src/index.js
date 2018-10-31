// Using foundation only for Grid layout
import './foundation.min.css'

// Materialze core
import '../node_modules/materialize-css/sass/materialize.scss'
import '../node_modules/materialize-css/dist/js/materialize.min.js'

// Custom styles
import './app.scss'

// Expandable accordion initializing
const collapsible = document.querySelectorAll('.collapsible.expandable');
let instances = M.Collapsible.init(collapsible, {
    accordion: false
});

// Main stuff
