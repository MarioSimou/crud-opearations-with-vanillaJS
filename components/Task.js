import { Root } from './Root.js'

class Task extends Root {
    constructor({ id, content }) {
        super({ id })
        this._content = content
        this.e.setAttribute( 'class' , 'task')
        this.init()
    }

    init() {
        this.e.insertAdjacentHTML('afterbegin', `
                            <div class="header">
                                <div class="close-icon">
                                <i class="far fa-times-circle"></i>
                                </div>
                            </div>
                            <div class="content">
                                <div>${ this.textContent}</div>
                            </div>
                            <div class="footer"></div>
                        `)


        // assign event listeners
        this.e.addEventListener('click', function (e) {
            const { target } = e

            switch (target.classList.contains('fa-times-circle')) {
                case true:
                    this.remove()
                    break;
                default:
                    break;
            }
        })

    }

    // getter method that returns the content of a Task
    get textContent() {
        return this._content
    }
}

export { Task }