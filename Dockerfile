FROM cypress/included:11.1.0

RUN mkdir /CypressAutomation

WORKDIR /CypressAutomation

Copy ./package.json .

COPY ./cypress.config.js .

Copy ./cypress ./cypress

Run npm install

ENTRYPOINT ["npm","run","test"]

CMD [""]