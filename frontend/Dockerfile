FROM nginx:1.24

COPY /dist /usr/share/nginx/html
COPY /deployment/nginx.conf /etc/nginx/conf.d/default.conf

# Expose the default HTTP port
EXPOSE 80

# Start Nginx when the container launches
CMD ["nginx", "-g", "daemon off;"]
