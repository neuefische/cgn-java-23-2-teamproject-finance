FROM openjdk:20

ENV ENVIRONMENT=prod

LABEL maintainer="stefan@neuefische.de"

EXPOSE 8080

ADD backend/target/backend-0.0.1-SNAPSHOT.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]