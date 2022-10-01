import { REACT_TEXT } from "./stants";

function render(vnode, container) {
    let newDom = createDom(vnode);//感觉这里应该返回一个document Fragment才好
    debugger
    container.appendChild(newDom);
};

function createDom(vdom) {
    let { type, props, content } = vdom;
    let dom;//真实的dom;
    //判断type是文本还是元素
    if (type == REACT_TEXT) {
        dom = document.createTextNode(content)
    } else if (typeof type === 'function') {
        //处理函数式组件
        return renderFunctionalComponent(vdom);
    } else {//元素
        dom = document.createElement(type);
    };
    if (props) {//添加属性

        updateProps(dom, {}, props);//真实的dom,旧的属性，新的属性
        let children = props.children;
        if (children) {
            processChildren(children, dom);
        }
    };
    return dom;
};

function renderFunctionalComponent(functionComponent) {
    let { type, props } = functionComponent;
    let functionalVnode = type(props);
    debugger
    return createDom(functionalVnode);

}

function processChildren(children, dom) {
    //有一个儿子，或者有多个儿子
    if (typeof children === 'object' && children.type) {
        //一个儿子，注意文 本节点也会被包装成对象
        render(children, dom);
    } else if (Array.isArray(children)) {
        children.forEach((child) => {
            render(child, dom);
        });
    }else if(typeof children==='string'){
         let newDom =  document.createTextNode(children);
         dom.appendChild(newDom);
    };
}

function updateProps(dom, oldProps, newProps) {
    for (let key in newProps) {
        if (key == 'children') {
            continue;
        } else if (key == 'style') {
            let styleObject = newProps[key];
            for (let styleKey in styleObject) {
                dom.style[styleKey] = styleObject[styleKey];
            };
        } else {//其他属性

        };
    };
    //需要处理旧属性
    if (oldProps) {
        //旧的属性新的里面没有就删除掉
        for (let key in oldProps) {
            if (!newProps[key]) {
                dom[key] = null;
            }
        }
    }
}

const ReactDOM = function () {
    this.createRoot = (root) => {
        this.container = root;
        return this;
    };
    this.render = (vnode) => {
        if (!this.container) {
            console.warn('没有传入真实的dom')
        }
        render(vnode, this.container)
    };
    return this;
}
export default new ReactDOM();;