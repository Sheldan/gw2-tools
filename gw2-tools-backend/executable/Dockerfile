FROM amazoncorretto:21.0.1-alpine3.18
RUN apk add entr

WORKDIR /app
ADD BOOT-INF/lib/ /app/lib
ADD snapshots/ /app/lib
ADD META-INF /app/META-INF
ADD BOOT-INF/classes /app

ENTRYPOINT java -cp .:./lib/* dev.sheldan.gw2.tools.ToolApplicationKt