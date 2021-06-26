COMMIT=$(git log -1 --pretty=%h)
NAME=dmiller94/stock-x-bot
IMAGE=$NAME:$COMMIT
LATEST=$NAME:latest

# Build image
docker build -t $IMAGE .

