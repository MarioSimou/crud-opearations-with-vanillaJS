import Root from './Root.js'

export default class AddTask extends Root {
    constructor({ id  , cb }){
        super({ id })
        this.init( cb )
    }

    init( cb ){
        this.e.insertAdjacentHTML('beforeend' , 
        `<div class="add">
            <i class="fas fa-plus-circle"></i>
        </div>
        `)

        this.e.addEventListener('click' , function( e ){
            switch( e.target.classList.contains('fa-plus-circle') ){
                case true:
                    this.insertAdjacentHTML('afterend' , 
                    `
                    <div class="form">
                        <form>
                            <div class="field">
                                <label for="taskbar">Specify Task:</label>
                                <input type="text" maxlength="300" id="taskbar" name="taskbar">
                            </div>
                            <div class="field">
                                <button id="submitTask" >Add Task</button>
                            </div>
                        </form>
                    </div>
                    `)

                    // callback that will be given to load a task
                    this.nextElementSibling.querySelector('[id="submitTask"]').addEventListener('click' , cb )
                    break;
                default:
                    break;
            }
        })
    }
}
