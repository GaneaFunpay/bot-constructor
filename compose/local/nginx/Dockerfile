# dev
FROM node:16.13.0-alpine3.11 as build-stage
WORKDIR /app/
COPY client/package.json /app/
RUN npm cache verify
RUN npm install
COPY client /app/
RUN npm run build

# prod
FROM nginx:1.23.1-alpine as production-stage
COPY nginx/prod.conf /etc/nginx/nginx.conf
COPY backend/static /usr/src/app/static/
COPY --from=build-stage /app/dist /dist/
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]