import telebot
from telebot import types

bot = telebot.TeleBot('7726366830:AAF3kFz3bROKQQbUajqveM_D2R6pr7A3YVs')

#газуем, support
kb = types.InlineKeyboardMarkup(row_width=1)
web = types.WebAppInfo("https://choomba.formuls.xyz/")
gaz = types.InlineKeyboardButton(text="Газуем! 🚀", web_app=web)
ds_server = types.InlineKeyboardButton(text="Наш Discord сервер 👾", url="https://discord.gg/uTMFsqHp")
support = types.InlineKeyboardButton(text="Поддержка 👽",callback_data='support')
kb.add(gaz, ds_server, support)


def forward(message):
    bot.forward_message(chat_id='-1002421410827', from_chat_id = message.chat.id, message_id=message.id)
    bot.send_message(message.chat.id, "Спасибо за вашу помощь!")


@bot.message_handler(commands=['start'])
def start(message):
    username = message.from_user.username
    bot.send_message(message.chat.id, "Привет, " + username+"! 🤘🏼" '\n\n' + "👾 Choomba — это инновационное  приложение, которое поможет вам найти новых друзей и организовать совместные активности для новых приключений.\n\n"
                     + "🤙🏼 Независимо от того, ищете ли вы компанию для компьютерных игр, занятия спортом, посещения мероприятий или просто общения, наше приложение сделает это легко и увлекательно!", reply_markup=kb)

@bot.callback_query_handler(func=lambda call: call.data == "support")
def but1_pressed(call: types.CallbackQuery):
    bot.send_message(chat_id=call.message.chat.id, text="Нашёл ошибку, баг, что-то не работает или есть идея как улучшить Choomba, пиши! ✍️")
    bot.register_next_step_handler(call.message, forward)
    
    


bot.infinity_polling()
