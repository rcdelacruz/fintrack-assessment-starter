# This is a skeleton Dockerfile for the frontend
# The candidate should complete this for the bonus task

# Base stage
FROM node:20-alpine AS base
WORKDIR /app
COPY package.json package-lock.json ./

# Build stage
FROM base AS build
# TODO: Install dependencies and build the Next.js application

# Production stage
FROM node:20-alpine AS production
WORKDIR /app
# TODO: Setup production environment

# Start the Next.js application
# TODO: Add startup command
