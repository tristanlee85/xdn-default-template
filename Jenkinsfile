pipeline {
  agent {
    label 'docker'
  }

  stages {
    stage('deploy to XDN') { 
      agent {
        docker {
          label 'docker'
          image 'node:12-alpine'
        }
      }
      steps {
        sh 'npm install' 
      }
    }
  }
}
