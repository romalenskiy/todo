// Materialze core
import '../node_modules/materialize-css/dist/js/materialize.min.js'

// Custom styles
import './app.scss'

// Main stuff
import Storage from './modules/storage'
import Project from './modules/project'
import displayController from './modules/displayController'

(() => {
    // Materialize initializing
    displayController.initMaterialize()

    // Event listeners
        // New project form
    let newProjectForm = document.querySelector('#new-project-modal')
    newProjectForm.addEventListener('submit', () => {
        let projectName = document.querySelector('#project_name').value
        if (projectName.length < 3) return
        let project = Project.create(projectName)
        Storage.saveProject(project)
        Storage.setProjectId()
        displayController.renderProject(project)
        displayController.closeNewProjectModal()
    })

        // Open project page
    let projectsList = document.querySelector('.projects-list')
    projectsList.addEventListener('mousedown', (e) =>{
        let projectWrapper = e.target.closest('.project-wrapper')
        if (projectWrapper) {
            displayController.makeProjectActive(projectWrapper)
        }
    })

    // Initial rendering
    if (Storage.storageAvailable()) {
        for (let i = 1; i <= localStorage.getItem('projectId'); i++) {
            let project = localStorage.getItem(`project-${i}`)
            if (project) {
                displayController.renderProject(JSON.parse(project))
            }
        }
    }

})()