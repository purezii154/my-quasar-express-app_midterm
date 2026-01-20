# Stage 1: Build (ติดตั้ง dependencies ทั้งหมดเพื่อ build ถ้ามี)
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci

# Stage 2: Production (เอาเฉพาะไฟล์ที่จำเป็น)
FROM node:18-alpine
WORKDIR /app

# Copy dependencies จาก stage ก่อนหน้า
COPY --from=builder /app/node_modules ./node_modules
COPY . .

# สร้างโฟลเดอร์ logs เตรียมไว้
RUN mkdir -p logs

# Healthcheck: เช็คว่า server ตายหรือไม่
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s --retries=3 \
  CMD wget --quiet --tries=1 --spider http://localhost:3000/api/demo || exit 1

EXPOSE 3000
CMD ["node", "server.js"]