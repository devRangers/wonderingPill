FROM node:18-alpine
ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}
WORKDIR usr/src/app
COPY package*.json ./
RUN npm install --only=production
COPY . .
RUN npx prisma generate
RUN npm run build
COPY . .
EXPOSE 5000
CMD [ "npm", "run", "start:prod","--env", "production" ]
