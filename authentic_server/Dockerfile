FROM node:22.17-alpine3.22
WORKDIR /app
COPY package.json .
RUN npm install
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "dev" ]

