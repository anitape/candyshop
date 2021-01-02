echo "here"
ps | grep backroom | awk '{print $1}' | xargs kill -9  || true

BUILD_ID=dontKillMe env SERVER.PORT=8081 nohup java -jar target/backroom-0.0.1-SNAPSHOT.jar