// Add this file to your project at .Jenkinsfile
//
// This Jenkins pipeline deploys your site on the Moovweb XDN.
//
// The site is deployed each time commits are pushed. The environment to which the changes are deployed
// is based on the following rules:
//
// 1.) When pushing to `master`, changes are deployed to the "staging" environment. This environment does not exist
//     by default. You must create it using moovweb.app.
// 2.) When pushing to any other branch, changes are deployed to the default environment. An unique URL is created
//     based on the branch and deployment number.
// 3.) To deploy to the "production" environment, use moovweb.app to promote the build. This environment does not 
//     exist by default, you must create it using moovweb.app.
//
// In order for this pipeline to deploy your site, you must create a deploy token from the site settings page
// in Moovweb.app and configure it as an environment variable called "xdn_deploy_token" in your Jenkins configuration.
// 
pipeline {
  agent { 
    docker {
      image 'node:12-alpine'
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
    HOME = '.'
  }
  stages {
    stage('Checking environment') {
      when {
        expression {
          env.xdn_deploy_token == null
        }
      }
      steps {
        echo "You must define the 'xdn_deploy_token' secret in your environment variables"
        sh 'exit 1'
      }
    }

    stage('Install packages') {
      steps {
        sh 'npm ci'
      }
    }

    stage('Deploy to XDN') {
      steps {
        script {
          def branch = env.GIT_BRANCH // typically referenced as `origin/{branch}`
          env.BRANCH_NAME = branch.tokenize("/").last()
          env.XDN_ENV_ARG = (env.BRANCH_NAME != "master") ? "--branch=$BRANCH_NAME" : "--environment=staging"
        }
        sh "npm run deploy -- --token=$xdn_deploy_token ${XDN_ENV_ARG}"
      }
    }
  }
}
