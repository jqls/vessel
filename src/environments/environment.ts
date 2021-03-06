// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  isDebug: true,
  isMock: false,
  URL_Spark: 'http://10.5.0.223:8081/workflow/processor/0',
  URL_Spark_log: 'http://10.5.0.223:8081/dispatcher/log/',
  URL_Spark_mock: 'app/spark_data',
  URL_Spark_processor_stat: 'http://10.5.0.223:8081/dispatcher/get_processor_status/', // 24-66
  URL_Spark_redraw_mock: 'app/redraw',
  URL_Spark_run: 'http://10.5.0.223:8081/dispatcher/submit_mission/',
  URL_Spark_RUN_HISTORY: 'http://10.5.0.223:8081/workflow/mission/0/?workflow_id=',
  URL_Spark_redraw: 'http://10.5.0.223:8081/workflow/workflow/?workflow_id=',
  URL_Spark_save: 'http://10.5.0.223:8081/workflow/workflow/', // POST
  URL_Spark_socketlog: "ws://10.5.0.223:8081/?id=2-43-13",
  URL_Spark_SQL: 'http://10.5.0.223:8081/workflow/sql/',
  URL_Spark_visualisation: 'http://10.5.0.223:8081/dispatcher/visualization/',
  URL_Spark_Workflow_History: 'http://10.5.0.223:8081/workflow/workflow/?workflow_id=0',// 完整版GET http://10.5.0.223:8081/workflow/workflow/
  URL_VISUAL_CUSTOME: 'http://10.5.0.223:8081/dispatcher/custom_visualization/', // workflowId-missionID-processorID-flowID-portID
  URL_Upload_remove: "http://10.5.0.223:8081/workflow/category_delete/",
  URL_Upload_getdata: "http://10.5.0.223:8081/workflow/category/0/",
  URL_Upload_dataset: "http://10.5.0.223:8081/workflow/documents/",
  URL_Upload_save: "http://10.5.0.223:8081/workflow/category/",
  URL_Upload_File: "http://10.5.0.223:8081/workflow/processor/",
  URL_ETL_BASE: 'http://10.5.0.224:8090/TomcatTest',
  URL_ETL_newtask_rdb: 'http://10.5.0.224:8090/TomcatTest/rdb',
  URL_ETL_newtask_hdfs: 'http://10.5.0.224:8090/TomcatTest/hdfs-dir',
  dataAnalysisServer: '10.5.0.224:5000',
  URL_REST_API: 'http://10.5.0.222:8080/docs/',
  dataManager: 'http://10.5.0.222:9990/db_manager/dbmanager/index.do',
  dataStorage: 'http://10.5.0.222:10000/lvm/index.cgi',
  URL_GET_DIR: 'http://10.5.0.223:8081/workflow/get_directory_info/',
};
