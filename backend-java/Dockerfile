# Stage 1: Build the application
FROM maven:3.9.6-eclipse-temurin-17 AS build
WORKDIR /app

# Copy all project files into the build stage
COPY . .

# Build the project, skipping tests
RUN mvn clean package -DskipTests

# Stage 2: Create the runtime image
FROM eclipse-temurin:17-jdk
WORKDIR /app

# Copy the built JAR file from the build stage and rename it to app.jar
COPY --from=build /app/target/*.jar app.jar

# Expose port 5000 as required
EXPOSE 5000

# Set the entrypoint to run the JAR
ENTRYPOINT ["java", "-jar", "app.jar"]
