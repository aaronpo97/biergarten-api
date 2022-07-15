FROM node:14

WORKDIR /app

COPY package*.json ./

COPY tsconfig.json ./

RUN npm install

COPY . . 

ENV PORT=8080

CMD ["npm", "start"]