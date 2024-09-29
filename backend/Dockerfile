FROM python:3.11.9-slim

COPY requirements.txt requirements.txt
RUN pip install -r requirements.txt

COPY . .

# Запускать команды параллельно
CMD ["sh", "-c", "python app.py & python choomba_bot.py"]
