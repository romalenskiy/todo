import Storage from './storage'
import Helper from './helper'

const Todo = (() => {
    // Todo factory
    const create = (header, body, importance) => {
        const id = Storage.getId('todo') || Helper.random(1, 100000)
        const isImportant = importance
        const isCompleted = false
        return {id, header, body, isImportant, isCompleted}
    }

    return {create}
})()

export default Todo