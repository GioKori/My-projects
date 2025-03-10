# docker microservice architecture (kood)

## Table of Contents
- [docker microservice architecture](#docker microservice architecture form kood johvi project)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Technologies Used](#technologies-used)
  - [Main Learnings](#main-learnings)


![image](./assets/images/architecture.png)

## Features
- Microservice architecture
- Automatic infrastrcture provisioning using Vagrant
- Message queue system

## Technologies Used

[Docker](https://www.docker.com/)

[Docker Compose](https://docs.docker.com/compose/)

[Vagrant](https://www.vagrantup.com/)

[Node.js](https://nodejs.org/en)

[PostgreSQL](https://www.postgresql.org/)

[RabbitMQ](https://www.rabbitmq.com/)


## Main Learnings
- Docker images, containers, networks
- Infrastrcture provisioning using Vagrant
Clone the repository
```
git clone https://01.kood.tech/git/gkoridze/play-with-containers
```
Install VirtualBox
```
sudo apt install virtualbox
```

Install vagrant
```
sudo apt install vagrant
```

Rename .env-example to .env

Deploy the microservices
```
vagrant up --provider virtualbox
```
