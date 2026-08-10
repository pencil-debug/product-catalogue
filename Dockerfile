FROM python:3.12-alpine

WORKDIR /app

COPY src/ .

EXPOSE 8081

CMD ["python", "-m", "http.server", "8081"]