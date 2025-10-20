# Build Stage 1

FROM node:22-alpine AS build
WORKDIR /app

RUN corepack enable

# Copy package.json and your lockfile, here we add pnpm-lock.yaml for illustration
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm i

# Copy the entire project
COPY . ./

# Build the project
RUN pnpm run build

# Build Stage 2

FROM node:22-alpine
WORKDIR /app

# Only `.output` folder is needed from the build stage
COPY --from=build /app/.output/ ./

# Define environment variables
ENV HOST=0.0.0.0 NODE_ENV=production
ENV NODE_ENV=production

# Expose the port the application will run on
EXPOSE 3000

# Start the application
CMD ["node", "/app/server/index.mjs"]
