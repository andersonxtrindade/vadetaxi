FROM node:lts-alpine

WORKDIR /vadetaxi-case

COPY . .

RUN rm -rf node_modules
RUN yarn install 

CMD ["npm", "start"]

EXPOSE 3000