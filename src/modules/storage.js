const Storage = (() => {
    // Testing for Storage API availability 
    const storageAvailable = function() {
        try {
            let storage = window['localStorage'],
                x = '__storage_test__';
            storage.setItem(x, x);
            storage.removeItem(x);
            return true;
        }
        catch(e) {
            return e instanceof DOMException && (
                // everything except Firefox
                e.code === 22 ||
                // Firefox
                e.code === 1014 ||
                // test name field too, because code might not be present
                // everything except Firefox
                e.name === 'QuotaExceededError' ||
                // Firefox
                e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
                // acknowledge QuotaExceededError only if there's something already stored
                storage.length !== 0;
        }
    }
    // Saving project to localStorage
    const saveProject = (project) => {
        if (storageAvailable()) {
            let projectJSON = JSON.stringify(project)
            localStorage.setItem(`project-${project.id}`, projectJSON)
            console.log(localStorage)
        }
    }

    // Save id for next project creation
    const setProjectId = () => {
        if (storageAvailable()) {
            let oldProjectId = localStorage.getItem('projectId') || 1
            let newProjectId = ++oldProjectId
            localStorage.setItem('projectId', newProjectId)
        }
    }

    // Get project id 
    const getProjectId = () => {
        if (storageAvailable()) {
            let projectId = JSON.parse(localStorage.getItem('projectId')) || 1
            return projectId
        }
    }

    // Find project by id
    const findProject = (projectId) => {
        if (storageAvailable()) {
            let project = JSON.parse(localStorage.getItem(`project-${projectId}`))
            return project
        }
    }

    // Edit existing project
    const editProject = (projectId, attributes) => {
        if (storageAvailable()) {
            let project = findProject(projectId)
            Object.keys(attributes).forEach((attribute) => {
                project[attribute] = attributes[attribute]
            })
            saveProject(project)
        }
    }

    // Delete project
    const deleteProject = (projectId) => {
        if (storageAvailable()) {
            localStorage.removeItem(`project-${projectId}`)
            console.log(localStorage)
        }
    }

    return {storageAvailable, saveProject, setProjectId, getProjectId, findProject, editProject, deleteProject}
})()

export default Storage