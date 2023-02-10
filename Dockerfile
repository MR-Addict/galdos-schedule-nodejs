FROM node:slim
WORKDIR /app
COPY . .
RUN npm install -ci
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]