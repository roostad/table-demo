###########
# BUILDER #
###########

FROM node:20.10-alpine AS sk-build
WORKDIR /usr/src/app

ARG TZ=America/New_York

COPY . /usr/src/app
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone
RUN npm install -g pnpm
RUN pnpm install
RUN pnpm run build


###########
# FINAL #
###########

FROM node:20.10-alpine

RUN mkdir -p /home/app

ENV HOME=/home/app
ENV APP_HOME=/home/app/frontend
RUN mkdir $APP_HOME
WORKDIR $APP_HOME

ARG TZ=America/New_York
RUN apk --no-cache add curl tzdata
RUN cp /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

COPY --from=sk-build /usr/src/app/package.json ./
COPY --from=sk-build /usr/src/app/pnpm-lock.yaml ./

# For modules not fully bundled, SSR
RUN npm install -g pnpm
RUN pnpm install

COPY --from=sk-build /usr/src/app/build ./build

EXPOSE 3000
CMD ["node", "build"]