import { updateQueue } from './Component';

//关于react事件委托的代码在这里
/**
 * 
 * @param {*} dom z真实dom
 * @param {*} eventType 事件类型，
 * @param {*} handler 事件回调
 */
export default function addEvent(dom, eventType, handler) {
    let store = dom.store || (dom.store = {});
    store[eventType] = handler;
    if (store[eventType]) {
        document[eventType] = dispatchEvent;
    }
}

function dispatchEvent(event) {
    debugger
    let { target, type } = event;
    let eventType = `on${type}`;
    let { store } = target;
    let handler = store && store[eventType];
    updateQueue.isBatchData = true;
    handler && handler(event);
    updateQueue.isBatchData = false;
    updateQueue.batchUpdate();
};