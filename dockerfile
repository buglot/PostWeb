FROM node:22.15.0
WORKDIR /myweb
COPY . .
RUN npm install
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]