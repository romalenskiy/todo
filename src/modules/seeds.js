import Storage from './storage'

const Seeds = (() => {
    // Data seeds
    const data = [{
        "id": 1,
        "name": "Explore all features!",
        "todos": {
            "todo-1": {
                "id": 1,
                "header": "1) Hello! Click on me!",
                "body": "In this application you can create projects.\nEach project can contain any number of tasks (todos)",
                "isImportant": false,
                "isCompleted": false
            },
            "todo-2": {
                "id": 2,
                "header": "2) Projects",
                "body": "To create a project click on \"Add new project...\" button in projects section.\nIf you are on mobile, then click back button (in left upper corner), and then \"+\" button.",
                "isImportant": false,
                "isCompleted": false
            },
            "todo-3": {
                "id": 3,
                "header": "3) Todos",
                "body": "Press \"+ Add new todo\" button to create new one!",
                "isImportant": false,
                "isCompleted": false
            },
            "todo-4": {
                "id": 4,
                "header": "4) Default todo",
                "body": "Body can be empty, by the way.",
                "isImportant": false,
                "isCompleted": false
            },
            "todo-5": {
                "id": 5,
                "header": "5) Important todo",
                "body": "Important todos have yellow flags.",
                "isImportant": true,
                "isCompleted": false
            },
            "todo-6": {
                "id": 6,
                "header": "6) Completed todo",
                "body": "To mark todo as complete, just press on appropriate checkbox! (and then press again to uncheck)",
                "isImportant": false,
                "isCompleted": true
            }
        }
    }]

    // Load seeds to localStorage
    const load = () => {
        // If localStorage available and no one project has been created yet
        if (Storage.storageAvailable() && localStorage.length === 0) {
            data.forEach((seed) => {
                Storage.saveProject(seed)
            })
            Storage.setId('project', data.length + 1)
            Storage.setId('todo', Object.keys(data[data.length - 1].todos).length + 1)
        }
    }

    return {load}
})()

export default Seeds