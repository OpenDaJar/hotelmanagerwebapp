FROM node:18.15.0

WORKDIR /backend
COPY package.json .
RUN npm install
COPY . .
CMD npm start