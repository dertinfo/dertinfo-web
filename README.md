# DertInfo - Web

This is the main public facing website for DertInfo. It displays publically team attendances and scores to previous derts and then via login offers additional functionality for team administrators, event adminstrators and team members. 

It's an Angular static web app that houses most of the admin functionalty. 

The producton version of this solution is visible at [https://www.dertinfo.co.uk](https://www.dertinfo.co.uk)

> **Note:** If you are unfamilar with the collection of services that are part of DertInfo please refer to the repository dertinfo/dertinfo.

## Table of Contents

- [Technology](#technology)
- [Topology](#topology)
- [Installation](#installation)
- [Usage](#usage)
- [Features](#features)
- [Contributing](#contributing)
- [License](#license)

## Technology

### Azure Static Web Apps 

This project is a ["Azure Static Web App"](https://azure.microsoft.com/en-gb/products/app-service/static). 

This static web app consists of an ["Angular"](https://angular.dev/) client and a typescript ["function app"](https://azure.microsoft.com/en-gb/products/functions) combined into a single deployable unit where the running application is configurable from settings stored in ["Azure App Configuration"](https://azure.microsoft.com/en-us/products/app-configuration) and ["Azure Key Vault"](https://azure.microsoft.com/en-us/products/key-vault). 


### Docker 

This workload contains a Dockerfile at the root of the project that will build an image such that on launching that image it will spin up both parts of the Static Web App. 

You can then use this image independently to work with other parts of the application by running it in a docker container. 

The image is available at DockerHub under the user dertinfo at [dertinfo/dertinfo-web](https://hub.docker.com/repository/docker/dertinfo/dertinfo-web)

Pipelines will keep this image upto date with the main branch. 

You can build the image locally to use in you local envionments by using the command  

```
docker build -t dertinfo/dertinfo-web .
```

## Topology

![Application Containers](/docs/images/architecture-dertinfo-web-containerlevel.png)

## Installation

In order to get this project running you are going to need.

- The latest version of [Visual Studio Code](https://code.visualstudio.com/) installed.
- The [Azure Static Web Apps CLI](https://azure.github.io/static-web-apps-cli/) installed 
- The [NodeJs](https://nodejs.org/en/download/package-manager) version to support Angular
- The [Angular CLI](https://v17.angular.io/guide/setup-local) installed 

> **Note:** If you need multiple versions of node installed to support multiple projects consider using [nvm](https://github.com/nvm-sh/nvm).


## Running The Project

In order for this client to work in your local environment you will need to have the following services available:
- The DertInfo API running for access to the application data. 
- The client component of static web app for the intereface
- The function app component of the static web app to get the configuration
- The static web app itself to bind the client and the function app. 


### For the function app

You will need to first of all add a local settings file to your project. It is ignored by the git ignore hence you will not find it in the project. This file will contain settings that will allow the app to communicate to the configuration & the authentication services. 

The following file needs to be added to the location of the function app project. It will specify the envionment variables for the locally running function app. 

Create the file local.settings.json at the location /src/functions/ with the default settings below. 

**local.settings.json**
```
{
    "IsEncrypted": false,
    "Values": {
        "AzureWebJobsStorage": "",
        "FUNCTIONS_WORKER_RUNTIME": "node",
        "AZURE_APP_CONFIG": "",
        "ENVIRONMENT": "Development",
        "devonly_apiUrl": "MY_API_URL_HERE",
        "devonly_auth0ClientId": "AUTH0_CLIENTID_HERE",
        "devonly_auth0TenantDomain": "AUTH0_TENANT_DOMAIN_HERE",
        "devonly_auth0Audience": "AUTH0_AUDIENCE_HERE",
        "devonly_auth0CallbackUrl": "http://localhost:4280",
        "devonly_appInsightsTelemetryKey": ""
    }
}
```
To note with this configutation: 
- The setting AZURE_APP_CONFIG is empty. This allows the application when running locally to use the "devonly_" envionment variables as opposed to collecting them from Azure App Configuration. 
- The "ENVIRONMENT" is tagged as "Development" for running locally. 
- The setting "devonly_apiUrl" is the URL of a locally running API. This URL must be an API configured in the same envionment as the client app. (e.g. Development) else authentication between the client and API will fail. 
- The AUTH0_ settings are those for connecting to the Auth0 tenant and allows logging in using "Authorization Code Flow with Proof Key for Code Exchange (PKCE)"

> **note:** Please see documentaion/wiki for the values to add to the Json for the Auth0. Also provided are a number of logins that will allow access to preconfigured data to support contibution.

### To run the client (Angular)
In a command window at "/src/client"
```
ng serve
```
> The angular client should start on the standard angular port of http://localhost:4200

### To run the function app
In a command window at "/src/functions"
```
func start --port 7082
```
> The function app should start on the (non standard) port 7082

### To link them together as the static web app
In a command window at "/src"
```
swa start http://localhost:4200 --port 4290 --api-port 7082
```
> The running static web app should be available at http://localhost:4290

### To run the api.
When it comes to getting the data for the app there are a few options. 
- You can run the API locally by running the project at [dertinfo-api](https://github.com/dertinfo/dertinfo-api) locally in Visual Studio. 
- (Coming soon) You can connect to the hosted development services at https://dertinfo-dev-api-wa.azurewebsites.net.
- (Coming soon) You can deploy your own version and dependencies into your own Azure Subscription using the supplied Infrastucture As Code
- (Coming soon) You can run the API and dependencies as local containers. 


## Usage

When users launch the application they will see the homepage of the application which looks like this: 

![Screenshot of the homepage](/docs/images/screenshot-homepage-nouser.png)

Users can login to the application using th icon in the top right which will rediect he user a third party authentication system of [Auth0](https://auth0.com/). The user can login or signup.

Once there is a known user application will then confiure itself for appropraitely for the user and allow further actions. Please refer to the documentaiton on GitHub wiki for more usage information. 

## Features

These are the key functions of this app: 

#### For The Public

- View the attendance and collated results form previous years
- View the results for each of the awards
- Identify whos active in the community
- View any published notifications of traditional dances

#### For Team Admins
- Access team information including multiple teams and group members
- See attendance to previous Derts along with compeition entry and invoices
- Update team and member information
- Register for new DERT when registration opens.
- Update registrations and attendance inforamtion. 
- View scores and detailed comments from the judges when results are published

#### For Event Admins
- Keep track of teams regsitered for your DERT
- Manage and Issue invoices to teams
- Keep track of the number of teams at your DERT
- Keep track of the expected fianaces based on ticket prices and compeition entry
- Check and validate judge minder scores against score sheets
- Publish the results for each competition. 
- Define your DERTs tickets and pricing.
- Define your DERTs compeitions available for entry. 
- Define your Special Awards for each competition
- Issue invocies to teams. 

#### For Team Members
- Login to access scores and scoresheets for thier team. 

## Contributing

Please refer to [CONTRIBUTING.md](/CONTRIBUTING.md) and [CODE_OF_CONDUCT.md](/CODE_OF_CONDUCT.md) for information on how others can contribute to the project.

## License

This project is licenced under the GNU_GPLv3 licence. Please refer to the [LICENCE.md](/LICENCE.md) file for more information. 
