# PIN Flow Landing (Node.js + Express)

Бекенд для лендінгу PIN Flow, який працює як безпечний проксі між фронтендом та PIN API.  
Виконує валідацію номера, ініціалізацію надсилання PIN-коду, перевірку PIN, а також підтримує дешифрування `offer_id` та захист доступу до лендінгу.

---

## 🚀 Основні можливості

- Перевірка обов’язкового GET параметра `p=ABC109238`.
- Дешифрування шифрованого `offer_id` за допомогою AES-256-CBC.
- Валідація телефонних номерів через `libphonenumber-js`.
- Відправка запиту до PIN API для ініціації SMS PIN.
- Перевірка введеного PIN-коду через PIN API.
- Обробка помилок (timeout, invalid PIN, API errors).
- Мультирегіональність (локалізовані помилки).
- Коментарі в коді для пояснення всіх процесів.

---

## 📦 Встановлення залежностей

```bash
npm install express axios dotenv libphonenumber-js cors crypto
Пояснення:

Бібліотека	Для чого
express	HTTP сервер
axios	Запити до PIN API
dotenv	Читання .env
libphonenumber-js	Валідація номерів
cors	Доступ з фронтенду
crypto	AES-256-CBC дешифрування

🔐 Налаштування .env
Створіть файл:

env

PORT=3000
PIN_API_BASE=https://api.track2sms.com/v1
PIN_API_TOKEN=4d080e3a454565cff8c62cc09c13029c

REQUIRED_P_KEY=ABC109238

AES_KEY=4KF92mdkE20slL90sd82nDk20sls92Kd
AES_IV=k20sls92Kd9sd8L2

TEST_IP=85.154.182.216
TEST_MSISDN=96877201818
TEST_OFFER_ID=151645
▶ Запуск проєкту
bash

npm start
або



node index.js
Сервер стартує на:
http://localhost:3000

📡 Ендпоінти
POST /sendpin
Надсилає номер телефону → отримує tracker_id.

Приклад запиту:


{
  "msisdn": "96877201818",
  "country": "OM"
}
Відповідь:


{
  "status": "sent",
  "tracker": "8495618-29744-5613"
}
POST /verifypin
Надсилає PIN + tracker і повертає результат.

Приклад:


{
  "pin": "1234",
  "tracker": "8495618-29744-5613"
}
Приклад успіху:


{
  "status": "success",
  "redirectUrl": "https://content-provider.com/video/123"
}
🔐 Дешифрування offer_id
У бекенді є функція:


function decryptOfferId(encrypted) {
    const decipher = crypto.createDecipheriv(
        "aes-256-cbc",
        Buffer.from(process.env.AES_KEY),
        Buffer.from(process.env.AES_IV)
    );

    let decrypted = decipher.update(encrypted, "base64", "utf8");
    decrypted += decipher.final("utf8");
    return decrypted;
}
Пояснення:

AES-256-CBC — безпечний та швидкий стандарт.

Ключ і IV зберігаються в .env.

Frontend шифрує offer_id → бекенд дешифрує.

📞 Валідація номерів
Використовується libphonenumber-js з форматом країни (наприклад, Oman):


import { parsePhoneNumber } from "libphonenumber-js";

const phone = parsePhoneNumber(msisdn, "OM");
if (!phone.isValid()) {
    return res.status(400).json({ error: "Invalid phone number" });
}
❗ Обробка помилок API
Якщо PIN API повертає помилку:

405 — оператор недоступний

411 — некоректний номер

420 — неправильний PIN

425 — timeout

450 — серверна помилка

Сервер перетворює це у:

json

{
  "error": "Invalid PIN. Try again."
}
🛡 Перевірка GET ключа p=ABC109238
Middleware:


  if (!p || p !== REQUIRED_P_KEY) {
    return res.redirect('https://google.com');
  }
🌍 Локалізація
Файли:


/locales
  en.json
  ua.json
  ar.json
Автоматичний вибір мови:


const lang = req.headers["accept-language"]?.split(",")[0] || "en";