FROM node:lts

ENV DEV="true"
ENV JAHIA_BASE_URL="http://jahia:8080"

WORKDIR /next
ADD package.json package-lock.json ./
RUN npm ci
ADD . .

EXPOSE 3000
CMD ["./startup.sh"]

