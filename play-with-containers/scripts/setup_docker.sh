#!/bin/bash

# Install Docker
install_docker() {
    sudo apt-get update
    sudo apt-get install -y apt-transport-https ca-certificates curl gnupg lsb-release
    sudo curl -fsSL https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]')/gpg | sudo gpg --dearmor -o /usr/share/keyrings/docker-archive-keyring.gpg
    sudo echo "deb [signed-by=/usr/share/keyrings/docker-archive-keyring.gpg] https://download.docker.com/linux/$(lsb_release -is | tr '[:upper:]' '[:lower:]') $(lsb_release -cs) stable" | sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
    sudo apt-get update
    sudo apt-get install -y docker-ce docker-ce-cli containerd.io
}

# Install Docker Compose
install_docker_compose() {
    sudo curl -fsSL https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m) -o /usr/local/bin/docker-compose
    sudo chmod +x /usr/local/bin/docker-compose
}

# Start Docker
start_docker() {
    sudo systemctl start docker
    sudo systemctl enable docker
}

# Run docker-compose up
run_docker_compose() {
    sudo docker-compose up -d
}

# Main function
main() {

    sudo apt update -y
    sudo apt upgrade -y

    install_docker
    install_docker_compose
    start_docker

    cd /vagrant
    run_docker_compose
}

main