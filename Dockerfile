# Stage 1
FROM node as builder
WORKDIR /app
COPY package*.json /app/
RUN npm install
COPY ./ /app/
RUN npm run build
# Stage 2
FROM nginx
COPY --from=builder /app/build/ /usr/share/nginx/html