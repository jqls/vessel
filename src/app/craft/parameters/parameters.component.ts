import { Component, OnInit } from '@angular/core';
import { CraftService } from "../craft.service";
import { WorkflowNode } from "../drawboard/internal/node-basic";
import { Relation } from "../drawboard/internal/relation";
import { mydebug } from "../../share/my-log";
import { QuestionControlService } from "../../share/dynamic-form/question-control.service";
import { QuestionBase } from "../../share/dynamic-form/questions";
import { FormGroup } from "@angular/forms";
import {
  ParameterType, ParametersType, DatabaseRequest1, DatabaseRequest1_Para,
  DatabaseRequest2_Para, DatabaseRequest2
} from "../../share/json-types";
import { ProcessorNode } from "../drawboard/internal/node-processor";
import { handleError } from "../../share/my-handler";
import * as d3 from "d3";
@Component({
  selector: 'app-parameters',
  templateUrl: './parameters.component.html',
  styleUrls: ['./parameters.component.sass']
})
export class ParametersComponent implements OnInit {
  private debug_location: string = "ParametersComponent";
  private selectedNode: WorkflowNode;
  private selectedRelation: Relation;
  private parameters: ParameterType[];
  questions: QuestionBase<any>[];
  form: FormGroup;
  private selectDBName: string;
  private sql_stage: number = 0;
  private databaseRequestTable = {};

  private databaseRequestColum = {};

  constructor(private craftService: CraftService,
              private qcs: QuestionControlService) {
    //订阅selectedNode和selectedRelation
    this.craftService.bookSelectedNode((node: WorkflowNode) => {
      this.selectedNode = node;
      // this.parameters = node instanceof AlgorithmNode ?
      //   (<AlgorithmNode>this.selectedNode).nodetype.parameters:
      //   [];
      this.parameters = node instanceof ProcessorNode ?
        (<ProcessorNode>this.selectedNode).nodetype.parameters :
        // node.
        [];
      console.log(this.parameters);
      if (this.parameters == null)
        this.parameters = [];
      console.log(this.parameters);
      mydebug(this.debug_location, "bookSelectedNode", String(node instanceof ProcessorNode));
      this.questions = this.qcs.toQuestions(this.parameters);
      console.log(this.questions);
      this.form = this.qcs.toFormGroup(this.questions);
      console.log(this.form);
    });

    this.craftService.bookSelectedRelation((relation: Relation) => {
      this.selectedRelation = relation;
    });

  }

  ngOnInit() {
  }

  onSubmit(question: QuestionBase<any>) {
    mydebug(this.debug_location, "onSubmit", "update parameters");
    let node = <ProcessorNode>this.selectedNode;
    console.log(node);

    //多节点更新
    // if (node != null && node.nodetype.parameters != [])
    //   node.nodetype.parameters.forEach(parameter => {
    //     parameter.value = this.form.value[parameter.key];
    //     console.log(parameter.value);
    //   });

    //单节点更新
    // if (node != null) {
    let key = question.key;
    let tempPara = node.nodetype.parameters.filter(parameter => parameter.key == key)[0];
    tempPara.value = this.form.value[key];
    // console.log(question.value);
    question.value = tempPara.value;
    // console.log(question.value);

    // }
    console.log("sql stage------------------------");
    console.log(this.sql_stage);
    console.log(tempPara.stage);
    if (tempPara.stage < this.sql_stage) {
      this.selectedNode.nodetype.parameters = this.selectedNode.nodetype.parameters.filter((item) => item.stage <= tempPara.stage);
      this.parameters = this.selectedNode.nodetype.parameters;
      // console.warn(this.selectedNode.nodetype.parameters);
      // console.warn(this.parameters);
      this.questions = this.qcs.toQuestions(this.parameters);
      // console.log(this.questions);
      this.form = this.qcs.toFormGroup(this.questions);
      // console.log(this.form);
    }
    console.log("--------excuse-------");
    switch (tempPara.stage) {
      case 0:
        if (question.controlType == "database")
          this.onDatabaseParaSet(question);
        break;
      case 1:
        this.setDatabaseAttr(question.key, question.value);
        break;
      case 2:
        this.setTable(question.key, question.value);
        break;
    }

  }

  closeRight() {
    this.craftService.setRightPaneStat(false);
  }

  onDatabaseParaSet(question: QuestionBase<any>) {
    // console.log("---------onDatabaseParaSet------------");
    this.selectDBName = question.value;
    this.craftService.getDatabasePara(question.value, this.selectedNode.nodetype.id)
      .then(res => {
        // console.log(res);
        // console.log(JSON.stringify(res));
        return res as ParametersType[];
      })
      .then((res: ParametersType[]) => {
        this.databaseRequestTable = {};
        this.databaseRequestColum = {};
        console.log(this.databaseRequestTable);
        res.map(param => {
          let newPara = {};
          newPara['key'] = param.key;
          this.databaseRequestTable[param.key] = '';
          this.databaseRequestColum[param.key] = '';
          newPara['label'] = param.label;
          newPara['value'] = param.value;
          newPara['controlType'] = param.controlType;
          newPara['required'] = param.required;
          newPara['options'] = param.choices;
          newPara['filelist'] = param.filelist;
          newPara['database'] = param.database;
          newPara['stage'] = param.stage;
          newPara['description'] = param.description;
          newPara['order'] = 1;
          mydebug(this.debug_location, "onDatabaseParaSet", JSON.stringify(<ParameterType>newPara));
          this.selectedNode.nodetype.parameters.push(<ParameterType>newPara);
          this.sql_stage = param.stage;
          mydebug(this.debug_location, "onDatabaseParaSet: sql_stage", String(this.sql_stage));

        });
        // console.log(this.selectedNode.nodetype.parameters);
        // console.warn(this.selectedNode.nodetype.parameters);
        // console.warn(this.parameters);
        this.questions = this.qcs.toQuestions(this.parameters);
        console.log(this.databaseRequestTable);
        console.log(JSON.stringify(this.databaseRequestTable));
        this.form = this.qcs.toFormGroup(this.questions);
        // console.log(this.form);
      }).catch(handleError);
  }

  setDatabaseAttr(key: string, value: string) {
    let newParamster;
    this.databaseRequestTable[key] = value;
    this.databaseRequestColum[key] = value;
    console.log(JSON.stringify(this.databaseRequestTable));
    let tag = true;
    for (let item in this.databaseRequestTable) {
      // console.log(item);
      if (this.databaseRequestTable[item] == '')
        tag = false;
    }
    console.log(this.databaseRequestTable);
    // console.log(tag);
    if (tag) {
      let content = {
        ac_id: null,
        db_id: null,
        parameters: null
      };
      content['ac_id'] = this.selectedNode.nodetype.ac_id;
      let database_para = this.selectedNode.nodetype.parameters.filter(item => item.controlType == "database")[0];
      content['db_id'] = database_para.database.filter(item => item.db_name == this.selectDBName)[0].db_id;
      content['parameters'] = this.databaseRequestTable;
      this.craftService.getDatabaseTable(this.selectDBName, this.selectedNode.nodetype.id)
        .then(res => {
          console.log(res);
          // console.log(JSON.stringify(res));
          return res as ParametersType[];
        })
        .then((res: ParametersType[]) => {
          res.map(param => {
            let newPara = {};
            newPara['key'] = param.key;
            this.databaseRequestColum[param.key] = '';
            newPara['label'] = param.label;
            newPara['value'] = param.value;
            newPara['controlType'] = param.controlType;
            newPara['required'] = param.required;
            newPara['options'] = param.choices;
            newPara['filelist'] = param.filelist;
            newPara['database'] = param.database;
            newPara['stage'] = param.stage;
            newPara['description'] = param.description;
            newPara['order'] = 1;
            // mydebug(this.debug_location, "onDatabaseParaSet", JSON.stringify(<ParameterType>newPara));
            this.selectedNode.nodetype.parameters.push(<ParameterType>newPara);
            this.sql_stage = param.stage;
            // mydebug(this.debug_location, "onDatabaseParaSet: sql_stage", String(this.sql_stage));

            newParamster = newPara;
          });
          this.craftService.onDatabaseAttrSet(content)
            .then(res => {
              // console.warn(res);
              if (!res.table_list)
                d3.select('#errorMessage').text(res);
              else {
                d3.select('#errorMessage').text('');
                console.log(newParamster);
                newParamster.options = res.table_list;
                // console.log(this.selectedNode.nodetype.parameters);
                this.questions = this.qcs.toQuestions(this.parameters);
                // console.log(this.questions);
                this.form = this.qcs.toFormGroup(this.questions);
                // console.log(this.form);
              }
            });
        }).catch(handleError);
    }
  }

  setTable(key: string, value: string) {
    let newPatameter;
    this.databaseRequestColum[key] = value;
    console.log(JSON.stringify(this.databaseRequestTable));
    let tag = true;
    for (let item in this.databaseRequestTable) {
      console.log(item);
      if (this.databaseRequestTable[item] == null)
        tag = false;
    }
    console.log(this.databaseRequestTable);
    if (tag) {
      let content = {
        ac_id: null,
        db_id: null,
        parameters: null
      };
      content['ac_id'] = this.selectedNode.nodetype.ac_id;
      let database_para = this.selectedNode.nodetype.parameters.filter(item => item.controlType == "database")[0];
      content['db_id'] = database_para.database.filter(item => item.db_name == this.selectDBName)[0].db_id;
      content['parameters'] = this.databaseRequestColum;

      this.craftService.getDatabaseColum(this.selectDBName, this.selectedNode.nodetype.id)
        .then(res => {
          console.log(res);
          console.log(JSON.stringify(res));
          return res as ParametersType[];
        })
        .then((res: ParametersType[]) => {
          res.map(param => {
            let newPara = {};
            newPara['key'] = param.key;
            newPara['label'] = param.label;
            newPara['value'] = param.value;
            newPara['controlType'] = param.controlType;
            newPara['required'] = param.required;
            newPara['options'] = param.choices;
            newPara['filelist'] = param.filelist;
            newPara['database'] = param.database;
            newPara['stage'] = param.stage;
            newPara['description'] = param.description;
            newPara['order'] = 1;
            mydebug(this.debug_location, "onDatabaseParaSet", JSON.stringify(<ParameterType>newPara));
            this.selectedNode.nodetype.parameters.push(<ParameterType>newPara);
            this.sql_stage = param.stage;
            mydebug(this.debug_location, "onDatabaseParaSet: sql_stage", String(this.sql_stage));

            newPatameter = newPara;
          });

          this.craftService.onTableSelect(content)
            .then(res => {
              console.log(res.col_list);
              newPatameter.options = res.col_list;
              console.log(this.selectedNode.nodetype.parameters);
              this.questions = this.qcs.toQuestions(this.parameters);
              console.log(this.questions);
              this.form = this.qcs.toFormGroup(this.questions);
              console.log(this.form);
            });
        }).catch(handleError);
    }
  }

}
