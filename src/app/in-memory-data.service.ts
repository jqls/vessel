import {ResultJSON} from "./craft/result.component/internal/resultType";
import {ProcessNodeTypeJSON} from "./craft/drawboard.component/internal/drawboard.node-types";
export class InMemoryDataService {
    createDb() {
    //     let results:ResultJSON[] = [
    //         {id: '11', flowID: 1, result: 'Mr. Nice'},
    //         {id: '12', flowID: 2, result: 'Narco'},
    //         {id: '13', flowID: 3, result: 'Bombasto'},
    //         {id: '14', flowID: 4, result: 'Celeritas'},
    //         {id: '15', flowID: 5, result: 'Magneta'},
    //         {id: '16', flowID: 6, result: 'RubberMan'},
    //         {id: '17', flowID: 7, result: 'Dynama'},
    //         {id: '18', flowID: 8, result: 'Dr IQ'},
    //         {id: '19', flowID: 9, result: 'Magma'},
    //         {id: '10', flowID: 0, result: 'Tornado'}
    //     ];
    // let processes: ProcessNodeTypeJSON[] = [
    //         {
    //             'id': '1',
    //             'label': "朴素贝叶斯",
    //             'description': 'naive 的贝叶斯算法',
    //             "parameters": [
    //                 {
    //                     "label": "特征数",
    //                     "controlType": "text",
    //                     "val": "5",
    //                 },
    //                 {
    //                     "label": "学习率",
    //                     "controlType": "float",
    //                     "val": "1.0",
    //                 },
    //                 {
    //                     "label": "模型类型",
    //                     "controlType": "select",
    //                     "val": "0",
    //                     "options": [
    //                         "multi-nominal",
    //                         "bernoulli"
    //                     ],
    //                 }
    //             ],
    //         },
    //         {
    //             'id': '2',
    //             'label': "tf-idf",
    //             'description': '',
    //             "parameters": [
    //                 {
    //                     "label": "参数A",
    //                     "controlType": "text",
    //                     "val": "5",
    //                 },
    //                 {
    //                     "label": "参数B",
    //                     "controlType": "float",
    //                     "val": "1.0",
    //                 }
    //             ]
    //         },
    //         {
    //             'id': '3',
    //             'label': "关联分析",
    //             'description': '',
    //             "parameters": [
    //                 {
    //                     "label": "参数A",
    //                     "controlType": "text",
    //                     "val": "5",
    //                 },
    //                 {
    //                     "label": "参数B",
    //                     "controlType": "float",
    //                     "val": "1.0",
    //                 }
    //             ],
    //         }
    //     ];
        let json = {
            "sources":[
                {"description":"","id":1,"label":"KDDCUP1999_10"},
                {"description":"","id":2,"label":"KDDCUP1999"}
            ],
            "processes":[
                {"description":"","id":1,"parameters":[{"controlType":"int","slug":"classNumber","val":"0","label":"classNumber"}],"label":"KDDCUPNormalization"},
                {"description":"","id":2,"parameters":[{"controlType":"float","slug":"lambda","val":"1.0","label":"lambda"},{"options":["multi-nominal","bernoulli"],"controlType":"select","slug":"NBType","val":"0","label":"NBType"}],"label":"naiveBayes"},
                {"description":"","id":3,"parameters":[{"controlType":"text","slug":"modelType","val":"None","label":"modelType"}],"label":"ModelEstimation"}
            ]
        };
        return {json};
    }
}