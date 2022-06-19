FROM node:17-alpine

WORKDIR /app/todo-frontend

COPY package.json .

RUN npm install

COPY . .

RUN npm run build



EXPOSE 3000

ENTRYPOINT npm start