import Helper from './helper'

const displayController = (() => {
    // Initalizing Materialize JS features
    const initMaterialize = () => {
        let collapsible = document.querySelectorAll('.collapsible.expandable');
        let collInstances = M.Collapsible.init(collapsible, {accordion: false});

        let modals = document.querySelectorAll('.modal');
        let modalInstances = M.Modal.init(modals, {onOpenEnd: () => {
            document.querySelector('#project_name').focus()
        }});
    }

    // Rendering project in the projects-list section
    const renderProject = (project) => {
        let wrapper = Helper.createElement('section', {class: 'project-wrapper', ['data-project-id']: project.id})
        let projectContainer = Helper.createElement('div', {class: 'project'})
        let projectName = Helper.createElement('h6', {class: 'project-name', innerHTML: project.name})
        projectContainer.appendChild(projectName)
        let divider = Helper.createElement('div', {class: 'divider'})
        wrapper.appendChild(projectContainer)
        wrapper.appendChild(divider)

        let projectsList = document.querySelector('.projects-list')
        projectsList.appendChild(wrapper)
    }

    // Close New project modal after project creation
    const closeNewProjectModal = () => {
        let modal = document.querySelector('#new-project-modal')
        let instance = M.Modal.getInstance(modal)
        instance.close()
        document.querySelector('#project_name').value = ''
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

    return{initMaterialize, renderProject, closeNewProjectModal, makeProjectActive}
})()

export default displayController