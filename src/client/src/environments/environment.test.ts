// Note that the settings here are used when the application deploys via
// The Azure pipelines to the test envionment. 
// This deployment does not use docker containers and teh deployment builds the application
// using the Angular CLI.

export const environment = {
  production: true,
  apiUrl: 'https://di-vjne-apim-integration-stg.azure-api.net/api',
  auth0CallbackUrl: "https://staging.dertinfo.co.uk",
  allowedDomains: [
    "di-vjne-apim-integration-stg.azure-api.net",
  ]
};
