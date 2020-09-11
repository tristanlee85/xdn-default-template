pipeline {
    agent {
        docker {
            image 'node:12'
        }
    }
    stages {
        stage('deploy to XDN') { 
            steps {
                sh 'npm install' 
            }
        }
    }
}
