import os
import requests
from telegram import Update
from telegram.ext import Application, CommandHandler, ContextTypes

GITHUB_PROXY_URL = os.environ["GITHUB_PROXY_URL"]
ALLOWED_USER_IDS = [int(x) for x in os.environ.get("ALLOWED_USER_IDS", "").split(",") if x]

async def add_mission(update: Update, context: ContextTypes.DEFAULT_TYPE):
    user_id = update.effective_user.id
    if ALLOWED_USER_IDS and user_id not in ALLOWED_USER_IDS:
        await update.message.reply_text("⛔ У тебя нет доступа.")
        return

    args = context.args
    if len(args) != 3:
        await update.message.reply_text(
            "Использование:\n`/add <id> <image> <link>`\n\n"
            "Пример:\n`/add 33 lobby https://youtu.be/xxxx`",
            parse_mode="Markdown"
        )
        return

    try:
        mission_id = int(args[0])
    except ValueError:
        await update.message.reply_text("❌ ID должен быть числом.")
        return

    image = args[1].lower()
    link = args[2]

    if not link.startswith(("http://", "https://")):
        await update.message.reply_text("❌ Ссылка должна начинаться с http:// или https://")
        return

    await update.message.reply_text(f"⏳ Добавляю миссию {mission_id}...")

    try:
        resp = requests.post(
            GITHUB_PROXY_URL,
            json={"mission": {"id": mission_id, "image": image, "link": link}},
            timeout=30
        )
        data = resp.json()

        if data.get("ok"):
            await update.message.reply_text(
                f"✅ Миссия {mission_id} добавлена!\n\n"
                f"Коммит: {data.get('commit', '—')}\n\n"
                f"Через ~1 минуту появится на сайте.",
                disable_web_page_preview=True
            )
        else:
            await update.message.reply_text(f"❌ Ошибка: {data.get('error', 'неизвестно')}")
    except Exception as e:
        await update.message.reply_text(f"❌ Ошибка сети: {e}")

async def list_missions(update: Update, context: ContextTypes.DEFAULT_TYPE):
    # Просто для проверки — открывает ссылку на missions.json
    await update.message.reply_text(
        "Список миссий можно посмотреть на сайте в разделе «каталог»."
    )

async def start(update: Update, context: ContextTypes.DEFAULT_TYPE):
    await update.message.reply_text(
        "🏁 RC:RC Bot\n\n"
        "Команды:\n"
        "/add <id> <image> <link> — добавить миссию\n"
        "/list — подсказка"
    )

def main():
    token = os.environ["TELEGRAM_BOT_TOKEN"]
    app = Application.builder().token(token).build()

    app.add_handler(CommandHandler("start", start))
    app.add_handler(CommandHandler("add", add_mission))
    app.add_handler(CommandHandler("list", list_missions))

    app.run_polling()

if __name__ == "__main__":
    main()