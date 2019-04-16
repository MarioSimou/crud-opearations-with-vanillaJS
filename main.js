import Root from './components/Root.js'
import Task from './components/Task.js'
import Todo from './components/Todo.js'
import AddTask from './components/AddTask.js'

{
    // loads the components after the DOM loads
    document.addEventListener('DOMContentLoaded', function (e) {
        (() => {
            // instances
            const root = new Root({ id: 'content' , cClasses :  'd-flex w-100 d-column justify-content-center align-items-center' })
            const tasks = ['Code', 'Eat', 'Sleep', 'Repeat'].map(v => new Task({ id: v.toLocaleLowerCase(), content: v }))
            const toDo = new Todo({ id: 'todoList', tasks })
            const addTask = new AddTask({ id: 'add-task', parent: toDo , cClasses: 'd-flex justify-content-center align-items-center' })

            // loads todo list into the root element
            root.addElement('afterbegin', addTask)
            root.addElement('beforeend', toDo)

            // loads the root class to wrapper class
            document.querySelector('.wrapper').insertAdjacentElement('beforeend', root.render())
        })()
    })
}