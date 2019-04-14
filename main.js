const sp = (() => ({
    // initialization function
    init : function (){
        const ToDo =  new this.Todo( { id : 'content' ,lists : ['Code' , 'Eat' , 'Sleep' , 'Repeat' ]} )
        ToDo.render()
    },
    // routine that creates the Todo component
    Todo: class Todo {
            constructor({ id , lists  }){
                this.lists = lists
                this.id = id
            }

            render(){
                const todo = document.querySelector(`[id="${ this.id }"]`)
                // iterations
                this.lists.map( ( l , i) => {
                    // we can insert a List Class
                    const div = document.createElement('div')
                    div.textContent = l
                    todo.insertAdjacentElement('beforeend' , div )
            })
        }
    }
}))()



// loads the components after the DOM loads
document.addEventListener('DOMContentLoaded' , function( e ){
    sp.init()
})