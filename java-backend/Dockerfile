# ===== 构建阶段 =====
FROM maven:3.9-eclipse-temurin-21-alpine AS builder
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests -B

# ===== 运行阶段 =====
FROM eclipse-temurin:21-jre-alpine
WORKDIR /app
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
COPY --from=builder /app/target/*.jar app.jar
RUN mkdir -p /app/uploads && chown -R appuser:appgroup /app
USER appuser
EXPOSE 8080
VOLUME /app/uploads
ENTRYPOINT ["java", "-jar", "app.jar"]