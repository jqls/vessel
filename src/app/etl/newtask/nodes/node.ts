export class NodeMenu{

}

export class node{//定义所有节点的共有属性
    flow_id: number;
    position: any;//节点位置
    label: string;
    node_menu: NodeMenu;//定义右键"删除"菜单

    constructor(flow_id: number, label: string, position: any){
        this.flow_id = flow_id;
        this.label = label;
        this.position = position;
    }

    render(){//绘制这个节点
        //****render****
    }
}