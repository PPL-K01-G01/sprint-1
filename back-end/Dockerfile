# Gunakan image Node.js versi terbaru
FROM node:18

# Set working directory di dalam container
WORKDIR /app

# Copy file package.json dan package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy semua kode ke dalam container (kecuali node_modules)
COPY . .

# Expose port yang digunakan dalam app.js (biasanya 3000)
EXPOSE 3000

# Jalankan aplikasi
CMD ["npm", "start"]
