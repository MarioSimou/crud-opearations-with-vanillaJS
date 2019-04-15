import { Root } from './Root.js'

class Todo extends Root {
    constructor({ id, tasks }) {
        super({ id })
        this._tasks = tasks

        // populates the todo list with the initial tasks
        for (let t of tasks) {
            this.addElement('beforeend', t )
        }
    }

    get tasks() {
        return this._tasks
    }
}


export { Todo }