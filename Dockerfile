FROM node:carbon

# Create app directory
WORKDIR /usr/src/app

COPY package*.json ./

RUN npm install
RUN echo "hello"

EXPOSE 8080

COPY . .

CMD npm run prod