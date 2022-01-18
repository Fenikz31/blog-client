FROM node:alpine
 
WORKDIR /usr/src/service

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/src/service/node_modules/.bin:$PATH
 
COPY package.json ./
COPY package-lock.json ./
 
RUN npm install
 
COPY . ./
 
EXPOSE 5001
 
CMD [ "yarn", "dev" ]