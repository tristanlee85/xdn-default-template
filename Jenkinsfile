pipeline {
  agent { label 'dockerserver' }
  stages {
    stage('deploy to XDN') { 
      agent {
        docker {
          label 'dockerserver'
          image 'node:12-alpine'
        }
      }
      steps {
        sh 'node --version' 
      }
    }
  }
}
