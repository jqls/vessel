import {InMemoryDbService} from "angular2-in-memory-web-api";
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    let spark_data = [
      {
        "category": "root1>child1>child3",
        "inputs": [
          {
            "processor_id": 12,
            "id": 9
          }
        ],
        "name": "DataNorm",
        "outputs": [
          {
            "processor_id": 12,
            "id": 16
          },
          {
            "processor_id": 12,
            "id": 17
          }
        ],
        "params": [
          {
            "parameterType": "text",
            "controlType": "text",
            "description": "",
            "key": "label1",
            "hint": "",
            "required": true,
            "optional": true,
            "id": 19,
            "value": "",
            "label": "label1"
          },
          {
            "parameterType": "selection",
            "description": "",
            "hint": "",
            "required": true,
            "value": "",
            "label": "whatever",
            "controlType": "selection",
            "key": "whatever",
            "choices": [
              "A",
              "B",
              "C"
            ],
            "optional": true,
            "id": 20
          },
          {
            "parameterType": "filelist",
            "description": "",
            "hint": "",
            "required": true,
            "value": "",
            "label": "file",
            "controlType": "filelist",
            "key": "file",
            "filelist": [
              {
                "file_name": "KDDCUP99_train",
                "file_id": 1
              },
              {
                "file_name": "KDDCUP99_test",
                "file_id": 2
              },
            ],
            "optional": true,
            "id": 9
          }
        ],
        "id": 12
      },
      {
        "category": "root1>child1>child2",
        "inputs": [],
        "name": "DataIO",
        "outputs": [
          {
            "processor_id": 13,
            "id": 18
          }
        ],
        "params": [],
        "id": 13
      },
      {
        "category": "root1>test1",
        "inputs": [],
        "name": "Documents",
        "outputs": [
          {
            "processor_id": 28,
            "id": 28
          }
        ],
        "params": [
          {
            "parameterType": "text",
            "controlType": "text",
            "description": "",
            "key": "filePath",
            "hint": "",
            "required": true,
            "optional": true,
            "id": 30,
            "value": "",
            "label": "filePath"
          }
        ],
        "id": 28
      },
      {
        "category": "root1>test2",
        "inputs": [
          {
            "processor_id": 29,
            "id": 18
          }
        ],
        "name": "KcupNormal",
        "outputs": [
          {
            "processor_id": 29,
            "id": 29
          }
        ],
        "params": [],
        "id": 29
      },
      {
        "category": "root1>test3",
        "inputs": [
          {
            "processor_id": 30,
            "id": 19
          },
          {
            "processor_id": 30,
            "id": 20
          }
        ],
        "name": "NaiveBayes",
        "outputs": [
          {
            "processor_id": 30,
            "id": 30
          }
        ],
        "params": [
          {
            "parameterType": "text",
            "controlType": "text",
            "description": "",
            "key": "lambda",
            "hint": "",
            "required": true,
            "optional": true,
            "id": 31,
            "value": "",
            "label": "lambda"
          },
          {
            "parameterType": "selection",
            "description": "",
            "hint": "",
            "required": true,
            "value": "",
            "label": "modelType",
            "controlType": "selection",
            "key": "modelType",
            "choices": [
              "multinomial",
              "bernoulli"
            ],
            "optional": true,
            "id": 32
          }
        ],
        "id": 30
      }
    ];
    let redraw = {
      "processors": [
        {
          "inputs": [],
          "outputs": [
            18
          ],
          "flow_id": "4",
          "loc_x": 10,
          "loc_y": 20,
          "id": 13
        },
        {
          "inputs": [
            9
          ],
          "outputs": [
            16,
            17
          ],
          "flow_id": "2",
          "loc_x": 0,
          "loc_y": 0,
          "id": 12
        }
      ],
      "parameters": [
        {
          "processor_id": 12,
          "label": "label1",
          "val": "test",
          "flow_id": 2
        },
        {
          "processor_id": 12,
          "label": "whatever",
          "val": "A",
          "flow_id": 2
        }
      ],
      "connections": [
        {
          "output_processor_flow_id": "4",
          "input": {
            "processor_id": 12,
            "id": 9
          },
          "input_processor_flow_id": "2",
          "id": 1,
          "output": {
            "processor_id": 13,
            "id": 18
          }
        }
      ],
      "submitTime": "2016-12-07T07:20:02.109306+00:00",
      "id": 2,
      "name": "simple_workflow_post_test"
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
    let visualise = ["multihop,102", "loadmodule,86", "ftp_write,4477", "guess_passwd,41581", "rootkit,245", "phf,14910", "spy,5255", "warezclient,650", "nmap,9690", "back,6951", "smurf,280996", "satan,1675", "pod,3776", "buffer_overflow,214", "land,199", "imap,794", "warezmaster,39", "normal,6254", "perl,79", "teardrop,1990", "ipsweep,6293", "neptune,107719", "portsweep,46"];
    let processor_stat = [{"processor_id": 28, "status": 3, "flow_id": "6"}, {
      "processor_id": 28,
      "status": 3,
      "flow_id": "1"
    }, {"processor_id": 29, "status": 3, "flow_id": "7"}, {
      "processor_id": 29,
      "status": 3,
      "flow_id": "2"
    }, {"processor_id": 30, "status": 3, "flow_id": "5"}, {"processor_id": 32, "status": 3, "flow_id": "8"}];
    return {spark_data, datashow_data, redraw, visualise, processor_stat};
    //redraw:http://10.5.0.222:8080/workflow/workflow/?workflow_id=2

  }
}
