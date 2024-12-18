# Sử dụng Node.js base image
FROM node:18

# Set working directory
WORKDIR /app

# Copy file package.json và package-lock.json
COPY package*.json ./

# Cài đặt dependencies
RUN npm install

# Copy toàn bộ mã nguồn vào container
COPY . .

# Expose cổng API
EXPOSE 3000

# Command để chạy ứng dụng
CMD ["npm", "start"]
