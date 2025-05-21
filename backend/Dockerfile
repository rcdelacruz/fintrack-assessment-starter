# This is a skeleton Dockerfile for the backend
# The candidate should complete this for the bonus task

# Base stage for development dependencies
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# Build stage for compiling TypeScript
FROM base AS build
# TODO: Install dependencies and build the application

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
# TODO: Setup production environment with minimal dependencies

# Health check and CMD configuration
# TODO: Add health check and startup command
