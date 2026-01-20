# Stage 1: Build (ใช้ Node สร้างไฟล์เว็บ)
FROM node:18-alpine as build-stage
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# สร้างไฟล์ Production (จะไปอยู่ที่ /dist/spa)
RUN npx quasar build

# Stage 2: Serve (ใช้ Nginx เพื่อรันเว็บ ซึ่งเบาและเร็วกว่า)
FROM nginx:stable-alpine as production-stage
COPY --from=build-stage /app/dist/spa /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]