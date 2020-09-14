pipeline {
  agent { 
    docker {
      image 'node:12-alpine'
    }
  }
  environment {
    npm_config_cache = 'npm-cache'
  }
  stages {
    stage('Checking environment') {
      when {
        expression {
          env.xdn_deploy_token == null
        }
      }
      steps {
        echo "You must define the 'xdn_deploy_token' secret in your environment"
        sh 'exit 1'
      }
    }

    stage('Install packages') {
      steps {
        sh 'npm i'
      }
    }

    stage('Setup environment') {
      steps {
        script {
          def branch = env.GIT_BRANCH
          env.BRANCH_NAME = branch.tokenize("/").last()
          env.XDN_BRANCH_ARG = (env.BRANCH_NAME != "master") ? "--branch=$BRANCH_NAME" : ""
          env.XDN_ENV_ARG = (env.BRANCH_NAME == "master") ? "--environment=production" : "--environment=staging"
        }
        sh 'printenv'
      }
    }

    stage('Deploy to XDN') {
      steps {
        sh "npm run xdn:deploy -- --token=$xdn_deploy_token ${XDN_BRANCH_ARG} ${XDN_ENV_ARG}"
      }
    }
  }
}
