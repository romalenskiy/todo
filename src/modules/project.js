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

    return{create, addTodo}
})()

export default Project