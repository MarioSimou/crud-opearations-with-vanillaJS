import Root  from './Root.js'

export default class Task extends Root {
    constructor({ id, content }) {
        super({ id })
        this._content = content
        this.e.classList.add('task')
        this.init()
    }

    init() {
        this.e.insertAdjacentHTML('afterbegin', `
                            <div class="header">
                                <div class="close-icon floated right">
                                <i class="far fa-times-circle"></i>
                                </div>
                            </div>
                            <div class="content">
                                <div>${ this.textContent}</div>
                            </div>
                            <div class="footer">
                                <div class="edit icon">
                                    <i class="fas fa-pencil-alt floated right"></i>
                                </div>
                            </div>
                        `)


        // assign event listeners
        this.e.addEventListener('click', function (e) {
            const { target } = e

            switch (target.className ) {
                case 'far fa-times-circle':
                    this.remove()
                    break;
                case 'fas fa-pencil-alt floated right':
                        const content = this.querySelector('.content')
                        content.removeChild( content.firstElementChild)  
                        content.insertAdjacentHTML( 'afterbegin', `
                            <form id="edit-form" class="d-flex">
                                <div class="field">
                                    <input type="text" id="edit-task" />
                                </div>
                            </form>
                        `)
                        // focus to edit-task
                        const editTask = content.querySelector( '[id="edit-task"]' )
                        editTask.focus()

                        // event listener for submitting the form
                        content.querySelector('[id="edit-form"]').addEventListener( 'submit' , function( e ){
                            // prevents default behavior      
                            e.preventDefault();
                            // removes edit-form
                            content.removeChild( content.firstElementChild )
                            // populates the edited values
                            content.insertAdjacentHTML('beforeend' , `<div>${ editTask.value }</div>`)
                           
                        })
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