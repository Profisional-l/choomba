from telegram import Update
from telegram.ext import ApplicationBuilder, CommandHandler
from datetime import datetime, timedelta

# Указываем дату начала семестра: 2 сентября 2024 года
start_date = datetime(2024, 9, 2)

# Функция для вычисления текущей недели
def get_week_number():
    current_date = datetime.now()
    # Рассчитываем количество недель, прошедших с начала семестра
    delta = current_date - start_date
    # Находим номер недели и сдвигаем на 1, чтобы 2 сентября была 2-й неделей
    week_number = (delta.days // 7 + 1) % 2 + 1
    return week_number

# Функция, вызываемая при старте /start
async def start(update: Update, context):
    week_number = get_week_number()
    await update.message.reply_text(f"Сейчас {week_number}-я неделя")

# Основной код для запуска бота
async def main():
    # Указываем токен, который вы получили у BotFather
    bot_token = "7838258962:AAGPCO0zm4fgvK_Pm1sTbV_BHXz3wwDiyfM"
    
    # Создаем приложение бота
    app = ApplicationBuilder().token(bot_token).build()
    
    # Обработчик команды /start
    app.add_handler(CommandHandler("start", start))
    
    # Запускаем бота
    await app.start_polling()
    await app.idle()

if __name__ == "__main__":
    import asyncio
    asyncio.run(main())
