import Storage from './storage'
import Helper from './helper'

const displayController = (() => {
    // Initalizing Materialize JS features
    const initMaterialize = () => {
        let collapsible = document.querySelectorAll('.collapsible.expandable');
        let collInstances = M.Collapsible.init(collapsible, {accordion: false});

        let modals = document.querySelectorAll('.modal');
        let modalInstances = M.Modal.init(modals, {onOpenEnd: () => {
            document.querySelector('#project_name').focus()
            document.querySelector('#edit_project_name').focus()
        }});
    }

    // Rendering project in the projects-list section
    const renderProject = (project) => {
        let wrapper = Helper.createElement('section', {class: 'project-wrapper', ['data-project-id']: project.id})
        let projectContainer = Helper.createElement('div', {class: 'project'})
        let projectName = Helper.createElement('h6', {class: 'project-name truncate', innerHTML: project.name})
        projectContainer.appendChild(projectName)
        let divider = Helper.createElement('div', {class: 'divider'})
        wrapper.appendChild(projectContainer)
        wrapper.appendChild(divider)

        let projectsList = document.querySelector('.projects-list')
        projectsList.appendChild(wrapper)
    }

    // Close particular modal and fire the callback
    const closeModal = (modalSelector, callback = function() {}) => {
        let modal = document.querySelector(modalSelector)
        let instance = M.Modal.getInstance(modal)
        instance.close()
        callback()
    }

    // Mark project as active
    const makeProjectActive = (project) => {
        deactivateProjects() // removing .project-active class from all projects
        project.classList.add('project-active') // adding .project-active class to particular project
    }

    // Deactivate projects
    const deactivateProjects = () => {
        const projects = document.querySelectorAll('.project-wrapper')
        projects.forEach((project) => {
            project.classList.remove('project-active')
        })
    }

    // (for mobile) Show project page and hide projects list
    const showProjectPage = () => {
        const projectPage = document.querySelector('.project-page')
        const projectsList = document.querySelector('.projects-list')
        projectPage.classList.add('show')
        projectsList.classList.add('hide-for-small-only')
        hidePlaceholderPage()
    }

    // (for mobile) Hide project page and show projects list
    const hideProjectPage = () => {
        const projectPage = document.querySelector('.project-page')
        const projectsList = document.querySelector('.projects-list')
        projectPage.classList.remove('show')
        projectsList.classList.remove('hide-for-small-only')
    }

    // Rendering project page 
    const renderProjectPage = (projectId) => {
        let project = Storage.findProject(projectId)
        let projectName = document.querySelector('.project-page-header h4')
        projectName.innerHTML = project.name
    }

    // Insert current project attributes to appropriate tags
    const editProject = () => {
        let projectName = document.querySelector('#edit_project_name')
        projectName.value = document.querySelector('.project-active .project-name').innerHTML
    }

    // Update project attributes
    const updateProject = (projectName) => {
        let projectNameList = document.querySelector('.project-active .project-name')
        let projectNamePage = document.querySelector('.project-page-header h4')
        projectNameList.innerHTML = projectNamePage.innerHTML = projectName
    }

    // Delete project
    const deleteProject = (project) => {
        project.remove()
        hideProjectPage() //for mobile
        displayPlaceholderPage()
    }

    // Rendering placeholder (default) page
    const displayPlaceholderPage = () => {
        let placeholderPage = document.querySelector('.placeholder-page')
        placeholderPage.classList.remove('hide')
    }

    // Hiding placeholder (default) page
    const hidePlaceholderPage = () => {
        let placeholderPage = document.querySelector('.placeholder-page')
        placeholderPage.classList.add('hide')
    }

    return{ initMaterialize, renderProject, closeModal, makeProjectActive, showProjectPage, 
            hideProjectPage, renderProjectPage, editProject, updateProject, deleteProject }
})()

export default displayController