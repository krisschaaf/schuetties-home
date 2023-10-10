FROM openjdk:21-slim
VOLUME /tmp
COPY build/libs/schuetties-home-0.0.1.jar app.jar
ENTRYPOINT ["java","-Dspring.profiles.active=prod","-jar","/app.jar"]