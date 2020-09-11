pipeline {
  agent { 
    docker {
      image 'node:12-alpine'
    }
   }
  stages {
    stage('deploy to XDN') {
      steps {
        sh 'node --version' 
      }
    }
  }
}
