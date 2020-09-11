pipeline {
  agent { 
    docker {
      image 'node:12-alpine'
      args '-u 502:20'
    }
   }
  stages {
    stage('deploy to XDN') {
      steps {
        sh 'npm i' 
      }
    }
  }
}
