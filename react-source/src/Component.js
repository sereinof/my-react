export class Component {
    static isReactClassComponent = true;//用来与函数式组件区分开来
    constructor(props) {
        this.props = props;
    };
}