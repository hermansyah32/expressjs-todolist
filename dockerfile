# Specifies the image of your engine
FROM node:16.18.1

# Set node environment
ENV NODE_ENV=production

# The working directory inside your container
WORKDIR /usr/app/todolist

# Get the package.json first to install dependencies
COPY ["package.json", "./"]

# This will install those dependencies
RUN yarn install

# Copy the rest of the app to the working directory
COPY . /usr/app/todolist

# Set folder owner to node
RUN chown -R node /usr/src/app
USER node

# Run the container
CMD ["yarn", "start"]