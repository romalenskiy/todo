import Storage from './storage'
import Helper from './helper'

const Project = (() => {
    // Project factory
    const create = (name) => {
        const id = Storage.getId('project') || Helper.random(1, 100000)
        const todos = {}
        return {id, name, todos}
    }

    const addTodo = (projectId, todo) => {
        let project = Storage.findProject(projectId)
        Object.assign(project.todos, {[`todo-${Storage.getId('todo')}`]:todo})
        return project
    }

    const toggleTodoCompleteness = (projectId, todoId) => {
        let project = Storage.findProject(projectId)
        project.todos[`todo-${todoId}`].isCompleted = !project.todos[`todo-${todoId}`].isCompleted
        return project
    }

    return{create, addTodo, toggleTodoCompleteness}
})()

export default Project