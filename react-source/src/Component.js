import { simplyReplaceOldDom } from './react-dom'
class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.peddingState = [];//保存数据
    };
    addState(partialState) {
        this.peddingState.push(partialState);
        this.emmitUpdate();//更新
    }
    emmitUpdate() {
        //跟新组件
        this.updateComponent();
    }
    updateComponent() {
        //获取到最新的数据
        if (this.peddingState.length > 0) {
            shouldUpdate(this.classInstance, this.getState());
        }
    }
    getState() {
        debugger
        let { classInstance: { state } } = this;
        this.peddingState.forEach((nextState) => {
            state = { ...state, ...nextState };
        });
        this.peddingState.length = 0;
        return state;
    }
}
function shouldUpdate(classInstance, nextState) {
    classInstance.state = nextState;
    //这里后面需要加diff算法吗
    classInstance.forceUpdete()
};
export class Component {
    static isReactClassComponent = true;
    //用来与函数式组件区分开来
    constructor(props) {
        this.props = props;
        this.state = {};
        //还有一个更新器
        this.updater = new Updater(this);
    };
    setState(partialState) {
        //写了一个更新器
        this.updater.addState(partialState);
    }
    forceUpdete() {
        let newVnode = this.render();//这里直接调用render有很大的问题
        //一个是state的变化可以体现，但是样式信息就会失去，
        let oldVnode = this.oldVnode;    //初始化的时候有这个东西
        let oldDom = oldVnode.dom;
        debugger
        simplyReplaceOldDom(oldDom.parentNode,oldDom,newVnode)
    }
}
