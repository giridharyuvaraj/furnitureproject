# Build Stage
FROM maven:3.8.5-openjdk-17-slim AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

# Run Stage
FROM openjdk:17-jdk-slim
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar

# Expose port (Render uses $PORT)
EXPOSE 8080

# Load environment variables from Render dashboard environment settings
# Application listens on $PORT which is set by Render
ENTRYPOINT ["java", "-jar", "app.jar", "--server.port=${PORT:8080}"]
