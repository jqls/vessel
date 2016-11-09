// The file for the current environment will overwrite this one during build
// Different environments can be found in config/environment.{dev|prod}.ts
// The build system defaults to the dev environment

const DATA_ANALYSIS_ADDRESS = "http://127.0.0.1:5000";

export const environment = {
    production: false,
    dataAnalysisServer: "127.0.0.1:8000",
    djangoServer: "127.0.0.1:8080",
};
