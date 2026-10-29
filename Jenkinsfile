pipeline {
    agent any

   tools {
    nodejs 'Node'
}

    stages {

        stage('Check Node') {
            steps {
                bat 'node -v'
                bat 'npm -v'
                bat 'where node'
                bat 'where npm'
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
            }
        }

        stage('Install Playwright Browser') {
            steps {
                bat 'npx playwright install chromium'
            }
        }

        stage('Run Tests') {
            steps {
                script {
                    def status = bat(
                        script: 'npx playwright test',
                        returnStatus: true
                    )

                    if (status != 0) {
                        echo "Tests failed, but continuing to generate reports..."
                    }
                }
            }
        }
    }

    post {
        always {
            echo 'Generating HTML reports...'

            publishHTML(target: [
                reportDir: 'playwright-report',
                reportFiles: 'index.html',
                reportName: 'Playwright HTML Report',
                alwaysLinkToLastBuild: true,
                keepAll: true,
                allowMissing: true
            ])
        }
    }
}
