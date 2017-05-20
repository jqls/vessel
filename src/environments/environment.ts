// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  isDebug: true,
  isMock: false,
  URL_Spark: 'http://10.5.0.222:8080/workflow/processor/0',
  URL_Spark_mock: 'app/spark_data',
  URL_Spark_redraw_mock: 'app/redraw',
  URL_Spark_run: 'http://10.5.0.222:8080/dispatcher/submit_mission/',
  URL_Spark_redraw: 'http://10.5.0.222:8080/workflow/workflow/?workflow_id=',
  dataAnalysisServer: '10.5.0.224:5000',
  URL_Spark_RUN_HISTORY: 'http://10.5.0.222:8080/workflow/mission/0/?workflow_id=',
  URL_Spark_save: 'http://10.5.0.222:8080/workflow/workflow/', // POST
  URL_Spark_Workflow_History: 'http://10.5.0.222:8080/workflow/workflow/?workflow_id=0',
  // 完整版GET http://10.5.0.222:8080/workflow/workflow/
  URL_Spark_visualisation: 'http://10.5.0.222:8080/dispatcher/visualization/',
  URL_Spark_processor_stat: 'http://10.5.0.222:8080/dispatcher/get_processor_status/', // 24-66
  URL_Spark_SQL: 'http://10.5.0.222:8080/workflow/sql/',
  // 新增自定义图表显示
  URL_VISUAL_CUSTOME: 'http://10.5.0.222:8080/dispatcher/custom_visualization/', // workflowId-missionID-processorID-flowID-portID
};
