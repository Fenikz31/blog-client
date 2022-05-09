# syntax=docker/dockerfile:1
#
# ---- Base Node ----
FROM node:alpine AS BASE
 
WORKDIR /usr/app/admin

# add `/app/node_modules/.bin` to $PATH
ENV PATH /usr/app/admin/node_modules/.bin:$PATH
 
COPY package*.json .

COPY assets dist

#
# ---- Dependencies ----
FROM base AS dependencies
# Set environement variables
ENV S3_URL=http://192.168.0.116:9010/

# install node packages

RUN npm install -g pm2
RUN npm set progress=false && npm config set depth 0
RUN npm install --only=production 
# copy production node_modules aside
RUN cp -R node_modules prod_node_modules
# install ALL node_modules, including 'devDependencies'
RUN npm install --silent

#
# ---- dev ----
# run linters, setup and tests
FROM dependencies AS dev
# Set environement variables
ENV API_URL=http://192.168.0.116:5010/

ENV ENV=development
ENV PASSWORD=123456
ENV USERNAME=Fenikz
COPY . .
EXPOSE 5001
CMD [ "yarn", "dev" ]

#
# ---- prod ----
# run linters, setup and tests
FROM dependencies AS prod
# Set environement variables
ENV API_URL=http://192.168.0.116:5020/
ENV ENV=production 
COPY . . 
EXPOSE 80 
RUN yarn build
CMD [ "yarn", "serve:prod" ]