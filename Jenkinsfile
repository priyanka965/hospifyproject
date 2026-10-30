pipeline {
    agent any

    tools {
        nodejs 'Node'
    }

    environment {
        BASE_URL = 'https://demo.hospify.pro/login'
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

        stage('Run Shards in Parallel') {

            parallel {

                stage('Shard 1') {
                    steps {
                        dir('shard-1') {
                            checkout scm

                            bat 'npm install'
                            bat 'npx playwright install chromium'

                            script {
                                def result = bat(
                                    script: 'npx playwright test --shard=1/3 --reporter=blob',
                                    returnStatus: true
                                )

                                stash(
                                    name: 'blob-shard-1',
                                    includes: 'blob-report/**',
                                    allowEmpty: true
                                )

                                if (result != 0) {
                                    error('Shard 1 failed')
                                }
                            }
                        }
                    }
                }

                stage('Shard 2') {
                    steps {
                        dir('shard-2') {
                            checkout scm

                            bat 'npm install'
                            bat 'npx playwright install chromium'

                            script {
                                def result = bat(
                                    script: 'npx playwright test --shard=2/3 --reporter=blob',
                                    returnStatus: true
                                )

                                stash(
                                    name: 'blob-shard-2',
                                    includes: 'blob-report/**',
                                    allowEmpty: true
                                )

                                if (result != 0) {
                                    error('Shard 2 failed')
                                }
                            }
                        }
                    }
                }

                stage('Shard 3') {
                    steps {
                        dir('shard-3') {
                            checkout scm

                            bat 'npm install'
                            bat 'npx playwright install chromium'

                            script {
                                def result = bat(
                                    script: 'npx playwright test --shard=3/3 --reporter=blob',
                                    returnStatus: true
                                )

                                stash(
                                    name: 'blob-shard-3',
                                    includes: 'blob-report/**',
                                    allowEmpty: true
                                )

                                if (result != 0) {
                                    error('Shard 3 failed')
                                }
                            }
                        }
                    }
                }
            }
        }

        stage('Merge Shard Reports') {
            steps {
                script {
                    bat 'if exist all-blob-reports rmdir /s /q all-blob-reports'
                    bat 'mkdir all-blob-reports'

                    dir('all-blob-reports') {
                        unstash 'blob-shard-1'
                        unstash 'blob-shard-2'
                        unstash 'blob-shard-3'
                    }

                    bat 'npx playwright merge-reports --reporter=html all-blob-reports/blob-report'
                }
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

