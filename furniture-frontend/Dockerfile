# Build Stage
FROM node:18-slim AS build
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
# Set the backend URL from environment variables during build (if needed)
# But better to use it as a runtime variable if possible 
# (via some client-side mechanism or a custom startup script).
# React apps typically need them in process.env during build.
ARG REACT_APP_API_URL
ENV REACT_APP_API_URL=$REACT_APP_API_URL
RUN npm run build

# Production Stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
# Custom Nginx config to support SPA and potentially dynamic PORT
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Render passes $PORT, so we use a template to inject it if needed
# But for simplicity, we let Nginx listen on 80 and Render expose it
EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
