// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.

export const environment = {
  production: false,
  isDebug: true,
  isMock: false,
  URL_Spark: "http://10.5.0.222:8080/sendinformation/",
  URL_Spark1: "http://10.5.0.222:8080/workflow/processor/",
  URL_Spark_mock: "app/spark_data",
  URL_Spark_submit: "http://10.5.0.222:8080/submit/",
  URL_Spark_redraw: "http://10.5.0.222:8080/redraw?",
  dataAnalysisServer: "10.5.0.224:5000",
  djangoServer: "http://10.5.0.222:8080",
};
