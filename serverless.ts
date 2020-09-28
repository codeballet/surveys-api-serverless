import type { Serverless } from 'serverless/aws';

const serverlessConfiguration: Serverless = {
  service: {
    name: 'surveys-api-serverless',
    // app and org for use with dashboard.serverless.com
    // app: your-app-name,
    // org: your-org-name,
  },
  frameworkVersion: '2',
  configValidationMode: 'error',
  custom: {
    webpack: {
      webpackConfig: './webpack.config.js',
      includeModules: true,
    },
  },
  // Add the serverless-webpack plugin
  plugins: ['serverless-webpack'],
  provider: {
    name: 'aws',
    runtime: 'nodejs12.x',
    apiGateway: {
      minimumCompressionSize: 1024,
    },
    stage: "${opt:stage, 'dev'}",
    region: "${opt:region, 'us-east-1}",
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: '1',
    },
  },
  functions: {
    home: {
      handler: 'src/lambda/http/home.handler',
      events: [
        {
          http: {
            method: 'get',
            path: '/',
          },
        },
      ],
    },
  },
};

module.exports = serverlessConfiguration;
