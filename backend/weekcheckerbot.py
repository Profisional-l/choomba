import telebot
from datetime import datetime

# Указываем токен, который вы получили у BotFather
bot_token = "7838258962:AAGPCO0zm4fgvK_Pm1sTbV_BHXz3wwDiyfM"
bot = telebot.TeleBot(bot_token)

# Дата начала учебного года: 2 сентября 2024 года
start_date = datetime(2024, 9, 2)

# Функция для вычисления текущей недели
def get_week_number():
    current_date = datetime.now()
    # Рассчитываем количество недель, прошедших с начала учебного года
    delta = current_date - start_date
    # Определяем неделю, начиная с 2-й
    week_number = (delta.days // 7 + 1) % 2 + 1
    return week_number

# Обработчик команды /start
@bot.message_handler(commands=['start'])
def send_welcome(message):
    week_number = get_week_number()
    bot.reply_to(message, f"Сейчас {week_number}-я неделя")

# Запуск бота
bot.polling()
