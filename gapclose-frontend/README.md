### To Start In dev

npm install

#must be running backend
API_HOST=http//localhost:3003 npm run dev


### To Run Docker

    docker build -t gapclose-frontend .
    docker run --network net1 -e PORT=80 -e API_HOST=gapclose-backend-app:3003 -p 80:80 -it --rm --name gapclose-frontend-app gapclose-frontend