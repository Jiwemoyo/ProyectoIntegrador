FROM node:20

WORKDIR /app

COPY package*.json ./
COPY src.env ./

RUN npm install

COPY . .

EXPOSE 8085

CMD ["npm","start"]