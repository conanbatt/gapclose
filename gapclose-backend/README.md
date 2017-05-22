### To Start

Config .env file (see .env.example)

npm run dev

### To Run Docker

docker build -t gapclose-backend .
docker run --network net1 -p 3003:3003 -it --rm --name gapclose-backend-app gapclose-backend