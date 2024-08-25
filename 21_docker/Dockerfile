FROM node:21.7.3
LABEL author=guobin
ENTRYPOINT [ "node",".output/server/index.mjs" ]
EXPOSE 3000

RUN mkdir -p /home/nuxtapp
WORKDIR /home/nuxtapp
COPY . /home/nuxtapp

RUN npm cache clean --force
RUN npm config set registry https://registry.npmmirror.com
RUN npm install
RUN npm run build