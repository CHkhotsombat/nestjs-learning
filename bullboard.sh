if [ "$1" = "down" ]; then
  docker-compose -f './docker-compose-bullboard.yml' down
else
  docker-compose -f './docker-compose-bullboard.yml' up -d
fi