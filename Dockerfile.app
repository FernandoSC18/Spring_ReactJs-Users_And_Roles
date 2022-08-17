FROM eclipse-temurin:8-jre  
COPY build/libs/*.war app.war
ENTRYPOINT ["java","-jar","/app.war"]