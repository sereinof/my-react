import { REACT_TEXT } from "./stants";
import addEvent from './event';

function render(vnode, container) {
    let newDom = createDom(cloneBabelVnode(vnode));//感觉这里应该返回一个document Fragment才好
    container.appendChild(newDom);
};

function createDom(vdom) {
    if (typeof vdom === 'string' || typeof vdom === 'number') {
        return document.createTextNode(vdom);
    };
    let { type, props, content } = vdom;
    let dom;//真实的dom;
    //判断type是文本还是元素
    if (type == REACT_TEXT) {
        dom = document.createTextNode(content)
    } else if (typeof type === 'function') {//函数式组件和类组件都会进来，看如何区分
        //处理函数式组件
        if (type.isReactClassComponent) {
            dom = renderClassComponent(vdom);
        } else {
            dom = renderFunctionalComponent(vdom);

        }
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
    vdom.dom = dom;//这里比较难以理解，就是平级的对应，因为dom就是由vnode产生了，所以dom是vnode的一种
    //实体，而vnode是对dom的一种高度抽象概括，
    return dom;//
};

function renderClassComponent(classComponent) {
    let { type, props } = classComponent;
    //此处的type应该是一个类；
    let classInstance = new type(props);
    let classVnode = classInstance.render();
    let fixVnode = {};//由于使用的是Babel编译的vnode所以则需要拷贝，因为Babel做了freeze处理
    for (let i in classVnode) {
        fixVnode[i] = classVnode[i];
    };
    classInstance.oldVnode = fixVnode;//保存静态vnode
    return createDom(fixVnode);
}

function renderFunctionalComponent(functionComponent) {
    let { type, props } = functionComponent;
    let functionalVnode = type(props);
    return createDom(cloneBabelVnode(functionalVnode));

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
    } else if (typeof children === 'string' || typeof children === 'number') {
        let newDom = document.createTextNode(children);
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
        } else if (key.startsWith('on')) {//处理事件
            //react有强大的事件委托机制，需要实现一下
            debugger
            addEvent(dom, key.toLowerCase(), newProps[key]);
            // dom.addEventListener('click', newProps[key])
        } else {

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
};

export function simplyReplaceOldDom(parentDom, oldDom, newVnode) {
    let newDom = createDom(newVnode);//老的dom是存储在老的vnode里面的，
    parentDom.replaceChild(newDom, oldDom);//🤔️
}

export function cloneBabelVnode(BableVnode) {
    if (typeof BableVnode === 'string' || typeof BableVnode === 'number') {
        return BableVnode;
    }
    let ret = {};
    Object.keys(BableVnode).forEach((key) => {
        ret[key] = BableVnode[key];
    })
    return ret;
}
export default new ReactDOM();;