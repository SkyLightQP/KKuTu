FROM node:10

EXPOSE 80 1100 1200 1300 1516 1517 1518 1616 1617 1618 1716 1717 1718

COPY / /workspace
WORKDIR /workspace

RUN npm install pm2 -g && \
    cd Server && \
    npm install

VOLUME ["/Server/sub/config"]

CMD ["pm2-runtime", "start", "kkutu.json"]