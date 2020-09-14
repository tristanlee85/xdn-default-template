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
        sh 'printenv'
      }
    }

    // stage('Deploy to XDN:staging') {
    //   when { not { branch 'master' } }
    //   steps {
    //     sh "npm run xdn:deploy -- ${'--branch=$BRANCH_NAME' || ''} --token=$xdn_deploy_token --environment=staging"
    //   }
    // }

    // stage('Deploy to XDN:production') {
    //   when { branch 'master' }
    //   steps {
    //     sh 'printvn'
    //     // sh "npm run xdn:deploy -- --token=$xdn_deploy_token --environment=production"
    //   }
    // }


  }
}
