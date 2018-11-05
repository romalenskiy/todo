import Storage from './storage'
import Helper from './helper'

const Project = (() => {
    // Project factory
    const create = (name) => {
        const id = Storage.getProjectId() || Helper.random(1, 100000)
        return {id, name}
    }

    return{create}
})()

export default Project