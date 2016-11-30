import {InMemoryDbService} from "angular2-in-memory-web-api";
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let spark_data = {
      "sources": [
        {"description": "", "id": 1, "label": "KDDCUP1999_10"},
        {"description": "", "id": 2, "label": "KDDCUP1999"}
      ],
      "processes": [
        {
          "description": "1",
          "id": 1,
          "parameters": [{"controlType": "textbox", "key": "classNumber", "val": "0", "label": "classNumber"}],
          "label": "KDDCUPNormalization"
        },
        {
          "description": "2",
          "id": 2,
          "parameters": [{
            "controlType": "textbox",
            "type": "float",
            "key": "lambda",
            "val": "1.0",
            "label": "lambda"
          }, {
            "options": [{"key":"multi-nominal","value":"multi-nominal"},{"key":"bernoulli","value":"bernoulli"}],
            "controlType": "dropdown",
            "key": "NBType",
            "val": "0",
            "label": "NBType"
          }],
          "label": "naiveBayes"
        },
        {
          "description": "3",
          "id": 3,
          "parameters": [{"controlType": "textbox", "type": "text", "key": "modelType", "val": "None", "label": "modelType"}],
          "label": "ModelEstimation"
        }
      ]
    };

    let datashow_data = [
      {
        "NAME": "衬衫",
        "VAL": "53"
      },
      {
        "NAME": "羊毛衫",
        "VAL": "20"
      },
      {
        "NAME": "雪纺衫",
        "VAL": "33"
      },
      {
        "NAME": "裤子",
        "VAL": "43"
      },
      {
        "NAME": "高跟鞋",
        "VAL": "28"
      },
      {
        "NAME": "袜子",
        "VAL": "29"
      }
    ];
    return {spark_data, datashow_data};
  }
}
