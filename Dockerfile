FROM node:alpine
WORKDIR /app
COPY package.json ./
COPY package-lock.json ./
COPY ./ ./

RUN apk add --update python3 make g++\
   && rm -rf /var/cache/apk/*

RUN npm i
RUN npm run build
CMD ["npm", "run", "start"]
