import { InMemoryDbService } from 'angular2-in-memory-web-api';

export class InMemoryDataService implements InMemoryDbService{
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
      "sources": [
        {"description": "", "id": 1, "label": "KDDCUP1999_10"},
        {"description": "", "id": 2, "label": "KDDCUP1999"}
      ],
      "processes": [
        {
          "description": "",
          "id": 1,
          "parameters": [{"controlType": "int", "slug": "classNumber", "val": "0", "label": "classNumber"}],
          "label": "KDDCUPNormalization"
        },
        {
          "description": "",
          "id": 2,
          "parameters": [{
            "controlType": "float",
            "slug": "lambda",
            "val": "1.0",
            "label": "lambda"
          }, {
            "options": ["multi-nominal", "bernoulli"],
            "controlType": "select",
            "slug": "NBType",
            "val": "0",
            "label": "NBType"
          }],
          "label": "naiveBayes"
        },
        {
          "description": "",
          "id": 3,
          "parameters": [{"controlType": "text", "slug": "modelType", "val": "None", "label": "modelType"}],
          "label": "ModelEstimation"
        }
      ]
    };
    let submitJson = {
      "taskName": "1",
      "sources": [
        {
          "id": "1",
          "label": "KDDCUP1999_10",
          "description": "",
          "flowID": "0"
        },
        {
          "id": "2",
          "label": "KDDCUP1999",
          "description": "",
          "flowID": "1"
        }
      ],
      "processes": [
        {
          "id": "1",
          "label": "KDDCUPNormalization",
          "description": "It is a preprocessing",
          "flowID": "2",
          "parameters": [
            {
              "controlType": "int",
              "slug": "classNumber",
              "val": "1",
              "label": "classNumber"
            }
          ]
        },
        {
          "id": "1",
          "label": "KDDCUPNormalization",
          "description": "It is a preprocessing",
          "flowID": "3",
          "parameters": [
            {
              "controlType": "int",
              "slug": "classNumber",
              "val": "1",
              "label": "classNumber"
            }
          ]
        },
        {
          "id": "2",
          "label": "naiveBayes",
          "description": "It is a classification algorithm",
          "flowID": "4",
          "parameters": [
            {
              "controlType": "float",
              "slug": "lambda",
              "val": "1.0",
              "label": "lambda"
            },
            {
              "options": [
                "multinomial",
                "bernoulli"
              ],
              "controlType": "select",
              "slug": "NBType",
              "val": "0",
              "label": "NBType"
            }
          ]
        },
        {
          "id": "3",
          "label": "ModelEstimation",
          "description": "It is a test module",
          "flowID": "5",
          "parameters": [
            {
              "controlType": "text",
              "slug": "modelType",
              "val": "naivebayes",
              "label": "modelType"
            }
          ]
        },
        {
          "id": "4",
          "label": "Statistic",
          "description": "It is a statistic module",
          "flowID": "6",
          "parameters": []
        }
      ],
      "paths": [
        "0->2",
        "1->3",
        "2->5",
        "3->4",
        "4->5",
        "5->6"
      ]
    };
    return {json, submitJson};
  }
}
