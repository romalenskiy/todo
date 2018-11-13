const Storage = (() => {
  // Testing for Storage API availability
  const storageAvailable = function () {
    let storage = window['localStorage']
    try {
      let x = '__storage_test__'
      storage.setItem(x, x)
      storage.removeItem(x)
      return true
    } catch (e) {
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
        storage.length !== 0
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

  // Save id for next entity creation
  const setId = (entity, id = null) => {
    if (storageAvailable()) {
      let oldId = localStorage.getItem(entity + 'Id') || 1
      let newId = id || ++oldId
      localStorage.setItem(entity + 'Id', newId)
    }
  }

  // Get entity id
  const getId = (entity) => {
    if (storageAvailable()) {
      let id = JSON.parse(localStorage.getItem(entity + 'Id')) || 1
      return id
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

  return {
    storageAvailable,
    saveProject,
    setId,
    getId,
    findProject,
    editProject,
    deleteProject
  }
})()

export default Storage
