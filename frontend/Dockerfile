FROM node:latest as build

WORKDIR /usr/local/app

COPY ./ /usr/local/app/

RUN npm install

RUN npm run build


FROM nginx:latest

COPY --from=build /usr/local/app/dist/frontend /usr/share/nginx/html
COPY ./nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80


 


# ### STAGE 1: Build ###
# FROM node:latest as build
# WORKDIR '/builddir'
# COPY package.json ./
# RUN npm install
# COPY . .
# RUN npm run build

# ### STAGE 2: Run ###
# FROM nginx:latest
# COPY --from=build /builddir/build /usr/share/nginx/html
# RUN rm /etc/nginx/conf.d/default.conf
# COPY nginx/nginx.conf /etc/nginx/conf.d
# EXPOSE 80
# CMD ["nginx", "-g", "daemon off;"]

# ARG DOCKER_HUB="docker.io"docker build -t spring-petclinic-angular:latest .
# ARG NGINX_VERSION="1.17.6"
# ARG NODE_VERSION="19.4-alpine"

# FROM $DOCKER_HUB/library/node:latest as build


# COPY . /workspace/

# ARG NPM_REGISTRY=" https://registry.npmjs.org"

# RUN echo "registry = \"$NPM_REGISTRY\"" > /workspace/.npmrc                              && \
#     cd /workspace/                                                                       && \
#     npm install                                                                          && \
#     npm run build

# FROM $DOCKER_HUB/library/nginx:$NGINX_VERSION AS runtime


# COPY  --from=build /workspace/dist/ /usr/share/nginx/html/

# RUN chmod a+rwx /var/cache/nginx /var/run /var/log/nginx                        && \
#     sed -i.bak 's/listen\(.*\)80;/listen 8080;/' /etc/nginx/conf.d/default.conf && \
#     sed -i.bak 's/^user/#user/' /etc/nginx/nginx.conf


# EXPOSE 8080

# USER nginx

# HEALTHCHECK     CMD     [ "service", "nginx", "status" ]

