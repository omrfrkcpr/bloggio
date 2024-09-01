FROM node:21-alpine3.18

WORKDIR /

COPY . . 

RUN npm install

EXPOSE 3000

CMD ["npm", "run", "dev"]