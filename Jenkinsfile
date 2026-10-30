
pipeline {
    agent any

    tools {
        nodejs 'Node'
    }

    environment {
        BASE_URL = 'https://demo.hospify.pro/login'
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Install Dependencies') {
            steps {
                bat 'npm install'
                bat 'npx playwright install chromium'

                bat 'if exist blob-report rmdir /s /q blob-report'
                bat 'if exist playwright-report rmdir /s /q playwright-report'
            }
        }

        stage('Run Shards in Parallel') {
            parallel {

                stage('Shard 1') {
                    steps {
                        withEnv([
                            'PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-report',
                            'PLAYWRIGHT_BLOB_OUTPUT_NAME=shard-1.zip',
                            'SHARD_ID=1'
                        ]) {
                            bat 'npx playwright test --shard=1/3 --reporter=blob'
                        }
                    }
                }

                stage('Shard 2') {
                    steps {
                        withEnv([
                            'PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-report',
                            'PLAYWRIGHT_BLOB_OUTPUT_NAME=shard-2.zip',
                            'SHARD_ID=2'
                        ]) {
                            bat 'npx playwright test --shard=2/3 --reporter=blob'
                        }
                    }
                }

                stage('Shard 3') {
                    steps {
                        withEnv([
                            'PLAYWRIGHT_BLOB_OUTPUT_DIR=blob-report',
                            'PLAYWRIGHT_BLOB_OUTPUT_NAME=shard-3.zip',
                            'SHARD_ID=3'
                        ]) {
                            bat 'npx playwright test --shard=3/3 --reporter=blob'
                        }
                    }
                }
            }
        }

        stage('Merge Shard Reports') {
            steps {
                bat 'npx playwright merge-reports --reporter=html blob-report'
            }
        }
    }

    post {
        always {
            script {
                if (fileExists('playwright-report/index.html')) {
                    publishHTML(target: [
                        reportDir: 'playwright-report',
                        reportFiles: 'index.html',
                        reportName: 'Playwright Sharded HTML Report',
                        alwaysLinkToLastBuild: true,
                        keepAll: true,
                        allowMissing: true
                    ])
                }
            }
        }
    }
}
