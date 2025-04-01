pipeline {
    agent any

    environment {
        NETLIFY_SITE_ID = '6ad10dd3-bb7b-4cf7-842f-8abec7c83f8a'
        NETLIFY_AUTH_TOKEN = credentials('NETLIFY_AUTH')
    }

    stages {
        stage('Check Node.js Installation') {
            steps {
                script {
                    // ตรวจสอบว่า Node.js ติดตั้งอยู่หรือไม่
                    def nodeInstalled = sh(script: "which node || echo 'not installed'", returnStdout: true).trim()

                    if (nodeInstalled == 'not installed') {
                        echo "❌ Node.js not found, installing..."
                        // ติดตั้ง Node.js ถ้ายังไม่มี
                        sh '''
                            curl -sL https://deb.nodesource.com/setup_16.x | sudo -E bash -
                            sudo apt install -y nodejs
                        '''
                    } else {
                        echo "✅ Node.js is already installed."
                    }
                }
            }
        }
        stage('Git Pull') {
            steps {
                sh 'git pull origin main'
            }
        }

        stage('Auto Commit & Push') {
            steps {
                sh '''
                    cd $WORKSPACE
                    node auto_commit.js
                '''
            }
        }
        stage('Build') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo "🔧 Checking required files..."
                sh '''
                    test -f index.html || (echo "❌ Missing index.html" && exit 1)
                    test -f netlify/functions/quote.js || (echo "❌ Missing quote function" && exit 1)
                    echo "✅ Build check passed."
                '''
            }
        }

        stage('Test') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo "🧪 Testing quote function load..."
                sh '''
                    node -e "require('./netlify/functions/quote.js'); console.log('✅ Function loaded successfully')"
                '''
            }
        }

        stage('Deploy') {
            agent {
                docker {
                    image 'node:18-alpine'
                    reuseNode true
                }
            }
            steps {
                echo "🚀 Deploying to Netlify..."
                sh '''
                    npm install netlify-cli
                    node_modules/.bin/netlify deploy \
                      --auth=$NETLIFY_AUTH_TOKEN \
                      --site=$NETLIFY_SITE_ID \
                      --dir=. \
                      --prod
                '''
            }
        }

        stage('Post Deploy') {
            steps {
                echo "✅ Deployment complete! Your app is live."
            }
        }
    }

    post {
        success {
            echo "🎉 CI/CD pipeline finished successfully."
        }
        failure {
            echo "❌ Pipeline failed. Check logs for details."
        }
    }
}
