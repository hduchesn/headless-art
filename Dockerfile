FROM node:lts

ENV DEV="true"
ENV JAHIA_BASE_URL="http://jahia.my.local:8080"

WORKDIR /next
COPY package.json package-lock.json ./
RUN npm ci
COPY . .

EXPOSE 3000
CMD ["./startup.sh"]

