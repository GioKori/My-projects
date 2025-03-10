#!/bin/sh

RABBITMQ_USER=$1
RABBITMQ_USER_PASSWORD=$2
RABBITMQ_IP=$3


sed -i 's/^#NODE_IP_ADDRESS=127.0.0.1/NODE_IP_ADDRESS='"${RABBITMQ_IP}"'/g' /etc/rabbitmq/rabbitmq-env.conf
service rabbitmq-server start

# Create a new user and allow virtual host connections
rabbitmqctl add_user "$RABBITMQ_USER" "$RABBITMQ_USER_PASSWORD"
rabbitmqctl set_user_tags "$RABBITMQ_USER" administrator
rabbitmqctl set_permissions -p / "$RABBITMQ_USER" ".*" ".*" ".*"

# Start the RabbitMQ service

# Restart to apply changes
service rabbitmq-server restart

shuf -i 1-10000 -n 1 -o /data.txt && tail -f /dev/null