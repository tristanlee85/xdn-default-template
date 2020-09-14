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
    stage('deploy to XDN') {
      steps {
        echo 'Installing packages...'
        sh 'npm i' 
      }
    }
  }
}
