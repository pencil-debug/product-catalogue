pipeline {
    agent any

    environment {
        IMAGE_NAME = "product-catalogue"
    }

    stages {

        stage('Checkout') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                sh '''
                    docker build --no-cache \
                    -t ${IMAGE_NAME}:${BUILD_NUMBER} .
                '''
            }
        }

        stage('Docker Login and Push') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        echo "$DOCKER_PASS" | docker login \
                            -u "$DOCKER_USER" \
                            --password-stdin

                        docker tag \
                            ${IMAGE_NAME}:${BUILD_NUMBER} \
                            $DOCKER_USER/${IMAGE_NAME}:${BUILD_NUMBER}

                        docker push \
                            $DOCKER_USER/${IMAGE_NAME}:${BUILD_NUMBER}
                    '''
                }
            }
        }

        stage('Deploy Kubernetes') {
            steps {
                withCredentials([
                    usernamePassword(
                        credentialsId: 'dockerhub-creds',
                        usernameVariable: 'DOCKER_USER',
                        passwordVariable: 'DOCKER_PASS'
                    )
                ]) {
                    sh '''
                        kubectl apply -f k8s/configmap.yaml
                        kubectl apply -f k8s/service.yaml

                        kubectl set image deployment/product-catalogue \
                            product-catalogue=$DOCKER_USER/$IMAGE_NAME:${BUILD_NUMBER}

                        kubectl rollout status deployment/product-catalogue
                    '''
                }
            }
        }
    }

    post {
        success {
            echo "Deployment successful!"
            echo "Image: ${IMAGE_NAME}:${BUILD_NUMBER}"
        }
    }
}