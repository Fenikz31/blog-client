FROM node:alpine
 
WORKDIR /usr/app/admin

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/admin/node_modules/.bin:$PATH
 
COPY package*.json .

COPY assets dist
 
RUN npm install --silent

RUN npm install pm2 -g
 
COPY . .
 
EXPOSE 8887
 
RUN yarn build

CMD [ "yarn", "serve:prod" ]