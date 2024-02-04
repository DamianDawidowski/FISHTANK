# FROM eclipse-temurin:17-jdk-alpine
# VOLUME /tmp
# COPY target/backend-0.0.1-SNAPSHOT.jar app.jar
# ENTRYPOINT ["java","-jar","/app.jar"] 
# EXPOSE 8080

FROM maven:3.8.5-openjdk-17

WORKDIR /backend
COPY . .
RUN mvn clean install -DskipTests

CMD mvn spring-boot:run
 