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
    stage('deploy to XDN') {
      steps {
        sh 'npm i' 
      }
    }
  }
}
