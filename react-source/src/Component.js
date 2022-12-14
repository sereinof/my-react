import { simplyReplaceOldDom } from './react-dom';
import { cloneBabelVnode } from './react-dom';

export const updateQueue = {
    isBatchData: false,//标识是同步还是异步更新
    updaters: [],//需要更新的数组
    batchUpdate() {
        updateQueue.updaters.forEach((updater) => {
            updater.updateComponent();
            updateQueue.isBatchData = false;
            updateQueue.updaters.length = 0;
        })
    },

}

class Updater {
    constructor(classInstance) {
        this.classInstance = classInstance;
        this.peddingState = [];//保存数据
    };
    addState(partialState) {
        this.peddingState.push(partialState);
        this.emitUpdate();//更新
    }
    emitUpdate() {
        //跟新组件
        if (updateQueue.isBatchData) {//异步？
            updateQueue.updaters.push(this);
        } else {
            this.updateComponent();

        };
    }
    updateComponent() {
        //获取到最新的数据
        if (this.peddingState.length > 0) {
            shouldUpdate(this.classInstance, this.getState());
        }
    }
    getState() {
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
        this.state = props;//先这样吧
        //还有一个更新器
        this.updater = new Updater(this);
    };
    setState(partialState) {
        //写了一个更新器
        this.updater.addState(partialState);
    }
    forceUpdete() {
        let newVnode = cloneBabelVnode(this.render());//这里直接调用render有很大的问题
        //由于render方法返回的是一个Babelvnode,需要自己拷贝一下
        //一个是state的变化可以体现，但是样式信息就会失去，
        let oldVnode = this.oldVnode;    //初始化的时候有这个东西
        let oldDom = oldVnode.dom;

        simplyReplaceOldDom(oldDom.parentNode, oldDom, newVnode);
        //需要跟新vnode上的dombi
        this.oldVnode = newVnode;
    }
}
