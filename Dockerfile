FROM ubuntu:18.04

VOLUME ["/app"]

RUN apt-get update && apt-get install -qy curl

# Node
RUN curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.11/install.sh | bash
RUN /bin/bash -lic "nvm install 8.9.3"

