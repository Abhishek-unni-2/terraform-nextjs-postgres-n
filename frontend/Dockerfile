# Dev-friendly image (hot reload). For prod, switch to next build/standalone.
FROM node:18-alpine
WORKDIR /app

COPY package*.json ./
RUN npm install

COPY . .
EXPOSE 3000

CMD ["npm", "run", "dev"]

