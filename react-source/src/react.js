import { REACT_ELEMENT } from "./stants";
import { toObject } from "./util";
import { Component } from "./Component";

function createElement(type, config, children) {
    let props = { ...config };
    let key,ref=null;
    key = null
    if(config){
        key = config.key??null;
        ref = config.ref??null;
        Reflect.deleteProperty(config,'key');
        Reflect.deleteProperty(config,'ref');
    }
    if (config) {
        //1. 没有children
        //2.有一个儿子 ，文本或者元素
        //多个儿子，数组形式
        if (arguments.length > 3) {
            //多个儿子
            props.children = Array.prototype.slice.call(arguments, 2).map(toObject);
        } else if (arguments.length === 3) {
            props.children = toObject(children);
        } else {

        }
    }
    return {//传说中的vnode
        $$typeof:REACT_ELEMENT,
        key,
        ref,
        type,
        props,
    }
};

const React = {
    createElement,
    Component,
}
export default React;
