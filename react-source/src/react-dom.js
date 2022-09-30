function render(vnode,container){
let newDom = createDom(vnode);
container.appendChild(newDom);

}
const ReactDOM = {
    render,
}
export default ReactDOM;