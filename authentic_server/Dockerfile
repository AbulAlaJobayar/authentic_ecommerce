FROM node:20-alpine3.23
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npx prisma generate
RUN npm run build
EXPOSE 5000
CMD [ "node" ,"dist/main.js"]


