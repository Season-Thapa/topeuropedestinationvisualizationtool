FROM node:21-alpine
WORKDIR /usr/src/app
COPY package*.json ./
RUN npm install

# 4. COPY your specific folders according to your structure
COPY public/ ./public/
COPY models/ ./models/
COPY data/ ./data/
# Copy the main server file
COPY server.js ./

# 5. Expose the Express port
EXPOSE 3000

# 6. Start the server
CMD ["node", "server.js"]
