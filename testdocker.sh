#!/bin/bash
echo "Processing docker request..."
echo "input: $1"
echo;

case "$1" in
    "run")
        echo "Now running instance..."
        `docker run --name timeouttest -p 80:80 -v ~/development/time-out/build:/usr/share/nginx/html:ro -d nginx`
        ;;
    "stop")
        echo "Now stopping instance..."
        `docker stop timeouttest`
        ;;
    "remove")
        echo "Now removing instance..."
        `docker rm timeouttest`
        ;;
esac
