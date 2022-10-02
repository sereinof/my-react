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

    let SyntheticBaseEvent = createBaseEvent(event);

    updateQueue.isBatchData = true;
    handler && handler(SyntheticBaseEvent);
    updateQueue.isBatchData = false;
    updateQueue.batchUpdate();
};
//事件对象需要做兼容 兼容IE浏览器
function createBaseEvent(nativeEvent) {
    let SyntheticBaseEvent = {};
    for (let key in nativeEvent) {
        SyntheticBaseEvent[key] = nativeEvent[key];

    };
    SyntheticBaseEvent.nativeEvent = nativeEvent;
    SyntheticBaseEvent.preventDefault = preventDefault(nativeEvent)
    return SyntheticBaseEvent;
}
function preventDefault(event) {
    if (!event) {
        window.event.returnValue = false
    }
    if (event.preventDefault) {
        event.preventDefault();
    }
}