const sp = (() => ({
    // initialization function
    init: async function () {
        // Components
        const ToDo = this.getTodoClass() // ToDo class
        const Task = this.getTaskClass(); // CHTMLLiElement
        const tasks = ['Code', 'Eat', 'Sleep', 'Repeat'].map( v => new Task({ id : v.toLocaleLowerCase()  , content: v })) 
        const toDo = new ToDo({ id: 'todoList', tasks })

        toDo.render()
        toDo.addElement( 'afterbegin' , new Task({ id : 'gaming' , content : 'Gaming' }) )
        
        
    },
    getRootClass: function () {
        return class Root {
            constructor({ id }) {
                this._id = id
                this.ref = document.querySelector(`[id="${this.id}"]`)
            }
            // getter of instance id
            get id(){
                return this._id  
            }

            // method that renders a given element within the parent element
            addElement( p , t ){
                this.ref.insertAdjacentElement(  p , t.render() )
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
            }

            get tasks(){
                return this._tasks
            }

            // rendering functionality specific to Todo class
            render() {
                // append the tasks
                for(let t of this.tasks){
                    this.ref.insertAdjacentElement( 'beforeend' , t.render() )
                }
             }
        }

        return Todo
    },
    getTaskClass: function(){
        const Root = this.getRootClass()

        class Task extends Root {
            constructor( { id , content } ){
                super ( { id } )
                this._content = content
            }

            // getter method that returns the content of a Task
            get textContent(){
                return this._content
            }

            // rendering functionality specific to Task class
            render(){
                // task element
                const task = document.createElement('div')
                task.setAttribute('id' , this.id )
                task.classList.add('task')
                task.insertAdjacentHTML('afterbegin' , `
                    <div class="header">
                        <div class="close-icon">
                        <i class="far fa-times-circle"></i>
                        </div>
                    </div>
                    <div class="content">
                        <div>${ this.textContent }</div>
                    </div>
                    <div class="footer"></div>
                `)


                // assign event listeners
                task.addEventListener( 'click' , function( e ){
                    const { target } = e

                    switch( target.className ){
                        case 'task':
                            break;
                        case 'far fa-times-circle':
                            this.remove()
                            break;
                        default:
                            break;
                    }
                })

                return task
            }
        }

        // removes propert ref
        delete Task.prototype.ref

        return Task
    },
}))()



// loads the components after the DOM loads
document.addEventListener('DOMContentLoaded', function (e) {
    sp.init()
})