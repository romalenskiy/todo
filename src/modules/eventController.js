import Storage from './storage'
import Project from './project'
import Todo from './todo'
import displayController from './displayController'

const eventController = (() => {
    const init = () => {
        // New project form
        const newProjectForm = document.querySelector('#new-project-modal')
        newProjectForm.addEventListener('submit', (e) => {
            e.preventDefault(); // prevent from page refresh
            let projectName = document.querySelector('#project_name').value.trim()
            if (!/.*\S.*/.test(projectName)) return
            let project = Project.create(projectName)
            Storage.saveProject(project)
            Storage.setId('project')
            displayController.renderProject(project)
            displayController.closeModal('#new-project-modal', () => {
                document.querySelector('#project_name').value = ''
            })
            // Rendering project page right after creating
            let projectWrapper = document.querySelector(`.project-wrapper[data-project-id="${project.id}"`)
            displayController.makeProjectActive(projectWrapper)
            displayController.showProjectPage() // (for mobile)
            displayController.renderProjectPage(project)

        })

        // Edit project button
        const editProjectBtn = document.querySelector('#edit-project-btn')
        editProjectBtn.addEventListener('mousedown', displayController.editProject)

        // Edit project form
        const editProjectForm = document.querySelector('#edit-project-modal')
        editProjectForm.addEventListener('submit', (e) => {
            e.preventDefault(); // prevent from page refresh
            let newProjectName = document.querySelector('#edit_project_name').value.trim()
            if (!/.*\S.*/.test(newProjectName)) return
            let currentProjectId = document.querySelector('.project-active').getAttribute('data-project-id')
            Storage.editProject(currentProjectId, {name: newProjectName})
            displayController.updateProject(newProjectName)
            displayController.closeModal('#edit-project-modal')
        })

        // Delete project form
        const deleteProjectForm = document.querySelector('#delete-project-modal')
        deleteProjectForm.addEventListener('submit', deleteProjectFormHandler)
        window.addEventListener('keypress', (e) => {
            if (deleteProjectForm.classList.contains('open') && e.key === 'Enter') {
                deleteProjectFormHandler()
            }
        })
        function deleteProjectFormHandler() {
            let currentProject = document.querySelector('.project-active')
            let currentProjectId = currentProject.getAttribute('data-project-id')
            Storage.deleteProject(currentProjectId)
            displayController.deleteProject(currentProject)
            displayController.closeModal('#delete-project-modal')
        }

        // Open project page
        const projectsList = document.querySelector('.projects-list')
        projectsList.addEventListener('click', (e) =>{
            let projectWrapper = e.target.closest('.project-wrapper')
            if (projectWrapper) {
                displayController.makeProjectActive(projectWrapper)
                displayController.showProjectPage() // (for mobile)
                displayController.renderProjectPage(Storage.findProject(projectWrapper.getAttribute('data-project-id')))
            }
        })

        // New todo form
        const newTodoForm = document.querySelector('#new-todo-modal')
        newTodoForm.addEventListener('submit', (e) => {
            e.preventDefault() // prevent from page refresh
            let todoHeader = document.querySelector('#todo_header').value.trim()
            if (!/.*\S.*/.test(todoHeader)) return
            let todoBody = document.querySelector('#todo_body').value.trim()
            let todoImportance = document.querySelector('#todo_importance').checked
            let todo = Todo.create(todoHeader, todoBody, todoImportance)
            let currentProjectId = document.querySelector('.project-active').getAttribute('data-project-id')
            let updatedProject = Project.addTodo(currentProjectId, todo)
            Storage.saveProject(updatedProject)
            Storage.setId('todo')
            displayController.closeModal('#new-todo-modal', () => {
                document.querySelector('#todo_header').value = ''
                document.querySelector('#todo_body').value = ''
                M.textareaAutoResize(document.querySelector('#todo_body')) // triggering autoresize for textarea
                document.querySelector('#todo_importance').checked = false
            })
            // Render todo right after creating
            displayController.renderTodo(todo)
        })

        // (for mobile) Back to projects list
        const backToProjectsListBtn = document.querySelector('#back-to-projects-list-btn')
        backToProjectsListBtn.addEventListener('click', () => {
            displayController.hideProjectPage()
        })
    }

    return {init}
})()

export default eventController