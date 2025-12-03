FROM node:20-alpine

WORKDIR /app

# Install Python and build tools for native dependencies (needed for better-sqlite3)
RUN apk add --no-cache python3 make g++

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci

# Copy app files
COPY . .

# Build admin panel
RUN npm run build

EXPOSE 1337

CMD ["npm", "run", "develop"]