FROM node:16.14.2-bullseye-slim

LABEL ig="@otw.mastah" author="Initial R"

WORKDIR /usr/src/app


COPY package*.json ./

RUN npm install && \
    npm install pm2 -g

COPY . .

RUN prisma migrate dev --name init


EXPOSE 3000

CMD ["npm", "cluster-mode"]