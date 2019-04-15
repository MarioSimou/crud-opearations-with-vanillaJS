import { Root } from './components/Root.js'
import { Task } from './components/Task.js'
import { Todo } from './components/Todo.js'
import { AddTask } from './components/AddTask.js'

{   
    const sp = (()=>({
        addTaskCb : function( e ) {
            e.preventDefault();
            const form = this.closest('.form')
            const v = form.querySelector('[id="taskbar"]').value

            switch( v ? true : false ){
                case true:
                    // add one more taks
                        console.log(toDo)
                        const t = new Task({  id : 'football' , content : 'football' })
                        console.log( t )
                        // removes existing form 
                        form.remove()
                    break;
                case false:
                window.alert('fill all the values')
            }
        }
    }))()

    // loads the components after the DOM loads
    document.addEventListener('DOMContentLoaded', function (e) {
        (() => {
            // instances
            const root = new Root({ id: 'content' })
            const tasks = ['Code', 'Eat', 'Sleep', 'Repeat'].map(v => new Task({ id: v.toLocaleLowerCase(), content: v }))
            const toDo = new Todo({ id: 'todoList', tasks })
            const addTask = new AddTask({ id: 'add-task' , cb : sp.addTaskCb })

            // loads todo list into the root element
            root.addElement('afterbegin', addTask)
            root.addElement('beforeend', toDo)

            // loads the root class to wrapper class
            document.querySelector('.wrapper').insertAdjacentElement('beforeend', root.render())
        })()
    })
}