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
        sh 'npm ci'
      }
    }

    stage('Deploy to XDN') {
      
      steps {
        sh 'printenv'
        // sh "npm run xdn:deploy -- ${'--branch=$BRANCH_NAME' || ''} --token=$xdn_deploy_token ${{github.event_name == 'push' && env.BRANCH_NAME == 'master' && '--environment=staging' || ''}} ${{github.event_name == 'release' && '--environment=production' || ''}}"
      }
    }


  }
}
