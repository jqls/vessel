export const environment = {
  production: true,
  isDebug: false,
  isMock: false,
  URL_Spark: 'http://10.5.0.222:8080/workflow/processor/0',
  URL_Spark_mock: 'app/spark_data',
  dataAnalysisServer: '10.5.0.224:5000',
  djangoServer: 'http://10.5.0.222:8080',
  URL_Spark_log: 'http://10.5.0.222:8080/processinformation?',

  URL_Spark_redraw_mock: 'app/redraw',
  URL_Spark_run: 'http://10.5.0.222:8080/dispatcher/submit_mission/',
  URL_Spark_redraw: 'http://10.5.0.222:8080/workflow/workflow/?workflow_id=',
  URL_Spark_RUN_HISTORY: 'http://10.5.0.222:8080/workflow/mission/0/?workflow_id=',
  URL_Spark_save: 'http://10.5.0.222:8080/workflow/workflow/', // POST
  URL_Spark_Workflow_History: 'http://10.5.0.222:8080/workflow/workflow/?workflow_id=0',
  // 完整版GET http://10.5.0.222:8080/workflow/workflow/
  URL_Spark_visualisation: 'http://10.5.0.222:8080/dispatcher/visualization/',
  URL_Spark_processor_stat: 'http://10.5.0.222:8080/dispatcher/get_processor_status/', // 24-66
  URL_Spark_SQL: 'http://10.5.0.222:8080/workflow/sql/',
  // 新增自定义图表显示
  URL_VISUAL_CUSTOME: 'http://10.5.0.222:8080/custom_visualization/', // workflowId-missionID-processorID-flowID-portID
};
