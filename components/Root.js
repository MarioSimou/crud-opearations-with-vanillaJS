export default class Root {
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
