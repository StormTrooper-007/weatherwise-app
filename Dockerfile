FROM openjdk:20

ENV ENVIRONMENT=prod

LABEL maintainer="collins"

EXPOSE 8080

ADD backend/target/weatherwise.jar app.jar

CMD [ "sh", "-c", "java -jar /app.jar" ]