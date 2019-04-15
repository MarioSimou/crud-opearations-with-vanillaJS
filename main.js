const sp = (() => ({
    // initialization function
    init: async function () {
        // Components
        const ToDo = this.getTodoClass() // ToDo class
        const Task = this.getTaskClass(); // CHTMLLiElement
        const Root = this.getRootClass();
        const root = new Root({ id: 'content' })
        // initial tasks
        const tasks = ['Code', 'Eat', 'Sleep', 'Repeat'].map(v => new Task({ id: v.toLocaleLowerCase(), content: v }))
        // todo list is initialized with some tasks
        const toDo = new ToDo({ id: 'todoList', tasks })

        // loads todo list into the root element
        root.addElement('beforeend' , toDo )

        // loads the root class to wrapper class
        document.querySelector('.wrapper').insertAdjacentElement('beforeend', root.render())


    },
    getRootClass: function () {
        return class Root {
            constructor({ id }) {
                this._id = id
                this.e = document.createElement('div')
                this.e.setAttribute('id', this.id)
                this.e.setAttribute('class' , this.id )
            }
            // getter of instance id
            get id() {
                return this._id
            }

            // method that renders a given element within the parent element
            addElement(p, t) {
                this.e.insertAdjacentElement(p, t.render())
            }
            // function that is shared between element to render itself
            render() {
                return this.e
            }
        }
    },
    // routine that creates the Todo component
    getTodoClass: function () {
        const Root = this.getRootClass()

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

        return Todo
    },
    getTaskClass: function () {
        const Root = this.getRootClass()

        return class Task extends Root {
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

                    switch (target.className) {
                        case 'task':
                            break;
                        case 'far fa-times-circle':
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
    }

}))()



// loads the components after the DOM loads
document.addEventListener('DOMContentLoaded', function (e) {
    sp.init()
})