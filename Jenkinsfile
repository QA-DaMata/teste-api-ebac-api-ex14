pipeline {
    agent any

    stages {
        stage('Clonar repositorio') {
            steps {
                git branch: 'main', url: 'https://github.com/QA-DaMata/teste-api-ebac-api-ex14'
                bat 'npm install'
            }
        }
        stage('Executar teste') {
            steps {
               bat '''NO_COLOR=1 npx cypress run'''
            }
        }
    }
}