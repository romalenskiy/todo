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
            document.querySelector('#todo_header').focus()
        }});
    }

    // Initial rendering
    const initRendering = () => {
        if (Storage.storageAvailable()) {
            for (let i = 1; i <= Storage.getId('project'); i++) {
                let project = Storage.findProject(i)
                if (project) {
                    renderProject(project)
                }
            }
        }
    }

    // Rendering project in the projects-list section
    const renderProject = (project) => {
        let projectContainer = Helper.createElement('div', {class: 'project'})
        let projectName = Helper.createElement('h6', {class: 'project-name truncate', innerHTML: project.name})
        projectContainer.appendChild(projectName)
        let divider = Helper.createElement('div', {class: 'divider'})

        let wrapper = Helper.createElement('section', {class: 'project-wrapper', ['data-project-id']: project.id})
        wrapper = Helper.appendChildren(wrapper, projectContainer, divider)

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
    const renderProjectPage = (project) => {
        let projectNameTag = document.querySelector('.project-page-header h4')
        projectNameTag.innerHTML = project.name
        // Clear todo list
        let todoContainer = document.querySelector('.todo-container')
        Helper.deleteChildren(todoContainer)
        // Render todo list
        Object.keys(project.todos).forEach((todo) => {
            renderTodo(project.todos[todo])
        })
        
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

    // Rendering todo
    const renderTodo = (todo) => {
        let headerContainer = Helper.createElement('div', {class: 'collapsible-header'})
        let label = Helper.createElement('label')
        let checkbox = Helper.createElement('input', {type: 'checkbox'})
        if (todo.isCompleted) checkbox.setAttribute('checked', 'checked')
        let emptySpan = Helper.createElement('span')
        let importance = Helper.createElement('div', {class: 'importance'})
        if (todo.isImportant) importance.classList.add('important')
        let header = Helper.createElement('div', {class: 'todo-header', innerHTML: todo.header})
        label = Helper.appendChildren(label, checkbox, emptySpan)
        headerContainer = Helper.appendChildren(headerContainer, label, importance, header)

        let bodyContainer = Helper.createElement('div', {class: 'collapsible-body'})
        let body = Helper.createElement('div', {class: 'todo-body', innerHTML: todo.body})
        let todoBtns = Helper.createElement('div', {class: 'todo-btns'})
        let editBtn = Helper.createElement('a', {class: 'waves-effect btn-flat btn-small blue-grey lighten-5 todo-btn', id: 'edit-todo-btn', innerHTML: 'edit'})
        let deleteBtn = Helper.createElement('a', {class: 'waves-effect btn-flat btn-small blue-grey lighten-5 todo-btn', id: 'delete-todo-btn', innerHTML: 'delete'})
        todoBtns = Helper.appendChildren(todoBtns, editBtn, deleteBtn)  
        bodyContainer = Helper.appendChildren(bodyContainer, body, todoBtns) 
        
        let wrapper = Helper.createElement('li', {class: 'todo', ['data-todo-id']: todo.id})
        wrapper = Helper.appendChildren(wrapper, headerContainer, bodyContainer)

        let todoContainer = document.querySelector('.todo-container')
        todoContainer.appendChild(wrapper)
    }

    return{ initMaterialize, initRendering, renderProject, closeModal, makeProjectActive, showProjectPage, 
            hideProjectPage, renderProjectPage, editProject, updateProject, deleteProject, renderTodo}
})()

export default displayController