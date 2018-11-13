import Storage from './storage'
import Helper from './helper'

const Project = (() => {
  // Project factory
  const create = (name) => {
    const id = Storage.getId('project') || Helper.random(1, 100000)
    const todos = {}
    return { id, name, todos }
  }

  // Adding todo to existing project
  const addTodo = (projectId, todo) => {
    let project = Storage.findProject(projectId)
    Object.assign(project.todos, { [`todo-${Storage.getId('todo')}`]: todo })
    return project
  }

  // Editing todo in existing project
  const editTodo = (projectId, todoId, attributes) => {
    let project = Storage.findProject(projectId)
    Object.keys(attributes).forEach((attribute) => {
      project.todos[`todo-${todoId}`][attribute] = attributes[attribute]
    })
    return project
  }

  // Deleting todo in existing project
  const deleteTodo = (projectId, todoId) => {
    let project = Storage.findProject(projectId)
    delete project.todos[`todo-${todoId}`]
    return project
  }

  // Marking todo as completed
  const toggleTodoCompleteness = (projectId, todoId) => {
    let project = Storage.findProject(projectId)
    project.todos[`todo-${todoId}`].isCompleted = !project.todos[`todo-${todoId}`].isCompleted
    return project
  }

  return { create, addTodo, editTodo, deleteTodo, toggleTodoCompleteness }
})()

export default Project
