import Root from './Root.js'
import Task from './Task.js'

export default class AddTask extends Root {
    constructor({ id, parent , cClasses }) {
        super({ id , cClasses })
        this._parent = parent
        this.init(parent)
    }

    get parent() {
        return this._parent
    }
    set parent(parent) {
        this._parent = parent
    }

    init(p) {
        this.e.insertAdjacentHTML('beforeend',
            `<div class="add d-flex w-100 justify-content-flex-end align-items-flex-start">
            <i class="fas fa-plus-circle"></i>
        </div>
        `)

        this.e.addEventListener('click', function (e) {
            switch (e.target.classList.contains('fa-plus-circle')) {
                case true:
                    switch (this.nextElementSibling.classList.contains('form')) {
                        case false:
                            this.insertAdjacentHTML('afterend',
                                `
                                <div class="form w-100">
                                    <form>
                                        <div class="field d-flex d-column">
                                            <input type="text" maxlength="300" id="taskbar" name="taskbar" class="painted" placeholder="Your task">
                                        </div>
                                        <div class="field">
                                            <button id="submitTask" class="btn floated right" >Add Task</button>
                                        </div>
                                    </form>
                                </div>
                                `)

                                // callback function that issues the parent element to appennd a task
                                const cb = function (p) {
                                    return function (e) {
                                        // prevents default behavior
                                        e.preventDefault();

                                        // gets the inserted value 
                                        const v = this.closest('.form').querySelector('[id="taskbar"]').value
                                        switch (v ? true : false) {
                                            case true:
                                                // add one more taks
                                                p.addElement('beforeend', new Task({ id: v, content: v }))

                                                break;
                                            case false:
                                                window.alert('fill all the values')
                                        }
                                    }
                                }
                                // event
                                this.nextElementSibling.querySelector('[id="submitTask"]').addEventListener('click', cb(p))
                            break;
                        default:
                            break;
                    }
                    break;
                default:
                    break;
            }
        })
    }
}
