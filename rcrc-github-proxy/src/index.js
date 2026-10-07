// ============================================================
// Cloudflare Worker: Telegram-бот RC:RC
// /add <id> <image> "Artist - Title" <link>  — добавить миссию
// /delete <id>                                — удалить миссию
// /img <image>                                — загрузить картинку
// ============================================================

const GITHUB_API = 'https://api.github.com';

export default {
  async fetch(request, env) {
    const corsHeaders = {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type',
    };

    if (request.method === 'OPTIONS') {
      return new Response(null, { headers: corsHeaders });
    }

    if (request.method === 'GET') {
      return new Response('RC:RC Bot is running', { status: 200, headers: corsHeaders });
    }

    if (request.method !== 'POST') {
      return new Response('Method not allowed', { status: 405, headers: corsHeaders });
    }

    let body;
    try {
      body = await request.json();
    } catch (e) {
      return new Response('Bad JSON', { status: 400, headers: corsHeaders });
    }

    if (body.update_id !== undefined || body.message) {
      return await handleTelegram(body, env, corsHeaders);
    }

    return new Response('Unknown payload', { status: 400, headers: corsHeaders });
  }
};

// ============================================================
// Обработка Telegram-обновлений
// ============================================================
async function handleTelegram(update, env, corsHeaders) {
  const message = update.message;
  if (!message) {
    return new Response('OK', { status: 200, headers: corsHeaders });
  }

  const chatId = message.chat.id;
  const userId = message.from.id;

  // Проверка доступа
  const allowedIds = (env.ALLOWED_USER_IDS || '').split(',').map(s => s.trim()).filter(Boolean);
  if (allowedIds.length && !allowedIds.includes(String(userId))) {
    await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, '⛔ У тебя нет доступа.');
    return new Response('OK', { status: 200, headers: corsHeaders });
  }

  // Фото → загрузка картинки
  if (message.photo && message.photo.length > 0) {
    const caption = (message.caption || '').trim();
    const photo = message.photo[message.photo.length - 1];
    await handleImageUpload(env, chatId, photo.file_id, caption, 'jpeg');
    return new Response('OK', { status: 200, headers: corsHeaders });
  }

  // Документ-картинка → загрузка оригинала
  if (message.document && message.document.mime_type && message.document.mime_type.startsWith('image/')) {
    const caption = (message.caption || '').trim();
    const doc = message.document;

    let ext = 'jpeg';
    if (doc.mime_type === 'image/png') ext = 'png';
    else if (doc.mime_type === 'image/jpeg') ext = 'jpeg';
    else if (doc.mime_type === 'image/webp') ext = 'webp';

    await handleImageUpload(env, chatId, doc.file_id, caption, ext);
    return new Response('OK', { status: 200, headers: corsHeaders });
  }

  // Текстовые команды
  if (message.text) {
    const text = message.text.trim();

    // /start
    if (text === '/start') {
      await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
        '🏁 <b>RC:RC Bot</b>\n\n' +
        '<b>Команды:</b>\n\n' +
        '• <code>/add &lt;id&gt; &lt;image&gt; "Артист - Название" &lt;link&gt;</code>\n' +
        '  добавить миссию в каталог\n\n' +
        '• <code>/delete &lt;id&gt;</code>\n' +
        '  удалить миссию из каталога\n\n' +
        '• <b>Фото с подписью</b> <code>/img &lt;image&gt;</code>\n' +
        '  загрузить картинку\n\n' +
        '• <code>/help</code> — справка\n\n' +
        '<b>Пример:</b>\n' +
        '<code>/add 33 lobby "Le Sserafim - Boompala" https://youtu.be/xxx</code>',
        'HTML'
      );
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    // /help
    if (text === '/help') {
      await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
        '📖 <b>Как пользоваться</b>\n\n' +
        '<b>1. Добавить миссию:</b>\n' +
        '<code>/add 33 lobby "Le Sserafim - Boompala" https://youtu.be/xxx</code>\n\n' +
        '• <b>id</b> — номер миссии (число)\n' +
        '• <b>image</b> — имя картинки (латиница, цифры, _)\n' +
        '• <b>"Артист - Название"</b> — обязательно в кавычках\n' +
        '• <b>link</b> — ссылка на YouTube\n\n' +
        '<b>2. Удалить миссию из каталога:</b>\n' +
        '<code>/delete 33</code>\n\n' +
        '<b>3. Загрузить картинку:</b>\n' +
        '• Отправь фото с подписью <code>/img lobby</code>\n' +
        '• Или отправь как файл — качество не сожмётся',
        'HTML'
      );
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    // /delete
    if (text.startsWith('/delete')) {
      const parts = text.split(/\s+/).slice(1);

      if (parts.length !== 1) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
          '❌ Формат:\n<code>/delete &lt;id&gt;</code>\n\n' +
          'Пример: <code>/delete 33</code>',
          'HTML'
        );
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      const missionId = parseInt(parts[0], 10);
      if (!missionId || missionId < 1) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, '❌ ID должен быть положительным числом.');
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `⏳ Удаляю миссию ${missionId}...`);

      try {
        const result = await deleteMissionFromGitHub(env, missionId);

        if (result.ok) {
          await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
            `🗑 <b>Миссия ${missionId} удалена!</b>\n\n` +
            (result.deleted ? `🎵 <b>${escapeHtml(result.deleted)}</b>\n\n` : '') +
            `📦 <a href="${result.commit}">Коммит на GitHub</a>\n\n` +
            `<i>Через ~1 минуту исчезнет из каталога.</i>`,
            'HTML'
          );
        } else {
          await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
            `❌ Ошибка: ${escapeHtml(result.error)}\n\n` +
            `${result.details ? escapeHtml(String(result.details).slice(0, 300)) : ''}`,
            'HTML'
          );
        }
      } catch (e) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `❌ Ошибка: ${escapeHtml(e.message)}`);
      }

      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    // /img без картинки
    if (text.startsWith('/img')) {
      await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
        '🖼 Чтобы загрузить картинку:\n\n' +
        '1. Отправь мне фото (или файл)\n' +
        '2. В подписи напиши <code>/img lobby</code>\n\n' +
        '💡 <i>Отправляй как файл — Telegram не сожмёт качество.</i>',
        'HTML'
      );
      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    // /add
    if (text.startsWith('/add')) {
      const raw = text.slice(4).trim();
      const parts = parseQuotedArgs(raw);

      if (parts.length !== 4) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
          '❌ Неверный формат:\n\n' +
          '<code>/add &lt;id&gt; &lt;image&gt; "Артист - Название" &lt;link&gt;</code>\n\n' +
          '<b>Пример:</b>\n' +
          '<code>/add 33 lobby "Le Sserafim - Boompala" https://youtu.be/xxx</code>\n\n' +
          '⚠️ Название песни обязательно в кавычках.',
          'HTML'
        );
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      const [idStr, image, songFull, link] = parts;
      const missionId = parseInt(idStr, 10);

      if (!missionId || missionId < 1) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, '❌ ID должен быть положительным числом.');
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      if (!/^[a-z0-9_]+$/.test(image)) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
          '❌ Имя картинки — только латиница, цифры и подчёркивания.',
          'HTML'
        );
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      // Разбираем "Артист - Название"
      let artist = '';
      let title = songFull.trim();

      if (songFull.includes(' - ')) {
        const idx = songFull.indexOf(' - ');
        artist = songFull.slice(0, idx).trim();
        title = songFull.slice(idx + 3).trim();
      }

      if (!title) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, '❌ Название песни пустое.');
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      if (!link.startsWith('http://') && !link.startsWith('https://')) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, '❌ Ссылка должна начинаться с http:// или https://');
        return new Response('OK', { status: 200, headers: corsHeaders });
      }

      await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `⏳ Добавляю миссию ${missionId}...`);

      try {
        const result = await addMissionToGitHub(env, {
          id: missionId,
          image: image,
          artist: artist,
          title: title,
          name: songFull,
          link: link
        });

        if (result.ok) {
          await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
            `✅ <b>Миссия ${missionId} добавлена!</b>\n\n` +
            `🎵 <b>${escapeHtml(songFull)}</b>\n` +
            `🎬 image: <code>${escapeHtml(image)}</code>\n` +
            `🔗 ${escapeHtml(link)}\n\n` +
            `📦 <a href="${result.commit}">Коммит на GitHub</a>\n\n` +
            `<i>Через ~1 минуту появится в каталоге.</i>`,
            'HTML'
          );
        } else {
          await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
            `❌ Ошибка: ${escapeHtml(result.error)}\n\n` +
            `${result.details ? escapeHtml(String(result.details).slice(0, 300)) : ''}`,
            'HTML'
          );
        }
      } catch (e) {
        await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `❌ Ошибка: ${escapeHtml(e.message)}`);
      }

      return new Response('OK', { status: 200, headers: corsHeaders });
    }

    await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, 'Не понимаю команду. Напиши /help.');
  }

  return new Response('OK', { status: 200, headers: corsHeaders });
}

// ============================================================
// Загрузка картинки в GitHub
// ============================================================
async function handleImageUpload(env, chatId, fileId, caption, ext) {
  const match = caption.match(/^\/img\s+([a-z0-9_]+)$/i);

  if (!match) {
    await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
      '⚠️ В подписи укажи имя файла:\n\n<code>/img lobby</code>',
      'HTML'
    );
    return;
  }

  const imageName = match[1].toLowerCase();
  const fileName = `${imageName}.${ext}`;

  await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `⏳ Загружаю картинку ${fileName}...`);

  try {
    const fileInfoResp = await fetch(
      `https://api.telegram.org/bot${env.TELEGRAM_BOT_TOKEN}/getFile?file_id=${fileId}`
    );
    const fileInfo = await fileInfoResp.json();

    if (!fileInfo.ok) {
      throw new Error('Telegram getFile failed: ' + (fileInfo.description || 'unknown'));
    }

    const filePath = fileInfo.result.file_path;
    const fileUrl = `https://api.telegram.org/file/bot${env.TELEGRAM_BOT_TOKEN}/${filePath}`;
    const fileResp = await fetch(fileUrl);

    if (!fileResp.ok) {
      throw new Error('Не удалось скачать файл из Telegram');
    }

    const arrayBuffer = await fileResp.arrayBuffer();
    const bytes = new Uint8Array(arrayBuffer);

    if (bytes.length > 20 * 1024 * 1024) {
      throw new Error('Файл больше 20 МБ');
    }

    const base64 = arrayBufferToBase64(bytes);

    const repoUrl = `${GITHUB_API}/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/${fileName}`;
    let sha = null;

    const checkResp = await fetch(repoUrl, {
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'User-Agent': 'rcrc-bot'
      }
    });

    if (checkResp.ok) {
      const existing = await checkResp.json();
      sha = existing.sha;
    }

    const putBody = {
      message: sha
        ? `Update image ${fileName} via Telegram bot`
        : `Add image ${fileName} via Telegram bot`,
      content: base64,
      committer: {
        name: env.GIT_COMMITTER_NAME || 'RC:RC Bot',
        email: env.GIT_COMMITTER_EMAIL || 'bot@rcrc.local'
      }
    };
    if (sha) putBody.sha = sha;

    const putResp = await fetch(repoUrl, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
        'Accept': 'application/vnd.github.v3+json',
        'Content-Type': 'application/json',
        'User-Agent': 'rcrc-bot'
      },
      body: JSON.stringify(putBody)
    });

    if (!putResp.ok) {
      const err = await putResp.text();
      throw new Error('GitHub commit failed: ' + err.slice(0, 200));
    }

    const result = await putResp.json();

    await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId,
      `✅ <b>Картинка загружена!</b>\n\n` +
      `📁 <code>${escapeHtml(fileName)}</code>\n` +
      `📊 ${(bytes.length / 1024).toFixed(1)} КБ\n\n` +
      (sha ? `<i>Файл перезаписан</i>\n\n` : '') +
      `📦 <a href="${result.commit?.html_url || ''}">Коммит на GitHub</a>\n\n` +
      `<i>Через ~1 минуту появится на сайте.</i>`,
      'HTML'
    );

  } catch (e) {
    await sendMessage(env.TELEGRAM_BOT_TOKEN, chatId, `❌ Ошибка: ${escapeHtml(e.message)}`, 'HTML');
  }
}

// ============================================================
// Кодирование ArrayBuffer в base64
// ============================================================
function arrayBufferToBase64(bytes) {
  let binary = '';
  const chunkSize = 0x8000;
  for (let i = 0; i < bytes.length; i += chunkSize) {
    const chunk = bytes.subarray(i, i + chunkSize);
    binary += String.fromCharCode.apply(null, chunk);
  }
  return btoa(binary);
}

// ============================================================
// Отправка сообщения в Telegram
// ============================================================
async function sendMessage(token, chatId, text, parseMode = null) {
  const body = {
    chat_id: chatId,
    text: text,
    disable_web_page_preview: true
  };
  if (parseMode) body.parse_mode = parseMode;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
}

// ============================================================
// Парсер аргументов с учётом кавычек
// ============================================================
function parseQuotedArgs(str) {
  const args = [];
  let current = '';
  let inQuotes = false;
  let quoteChar = null;

  for (let i = 0; i < str.length; i++) {
    const ch = str[i];

    if ((ch === '"' || ch === "'") && !inQuotes) {
      inQuotes = true;
      quoteChar = ch;
    } else if (ch === quoteChar && inQuotes) {
      inQuotes = false;
      quoteChar = null;
    } else if (ch === ' ' && !inQuotes) {
      if (current) {
        args.push(current);
        current = '';
      }
    } else {
      current += ch;
    }
  }

  if (current) args.push(current);
  return args;
}

// ============================================================
// Коммит миссии в GitHub
// ============================================================
async function addMissionToGitHub(env, mission) {
  if (!mission || !mission.id || !mission.link || !mission.image) {
    return { ok: false, error: 'Missing mission fields' };
  }

  const url = `${GITHUB_API}/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/missions.json`;

  const getResp = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'rcrc-bot'
    }
  });

  if (!getResp.ok) {
    const err = await getResp.text();
    return { ok: false, error: 'GitHub read failed', details: err };
  }

  const fileData = await getResp.json();
  const currentSha = fileData.sha;

  let decoded;
  try {
    decoded = decodeURIComponent(escape(atob(fileData.content.replace(/\n/g, ''))));
  } catch (e) {
    decoded = atob(fileData.content.replace(/\n/g, ''));
  }

  let missionsData;
  try {
    missionsData = JSON.parse(decoded);
  } catch (e) {
    return { ok: false, error: 'missions.json повреждён' };
  }

  if (!Array.isArray(missionsData.missions)) {
    missionsData.missions = [];
  }

  const exists = missionsData.missions.some(m => Number(m.id) === Number(mission.id));
  if (exists) {
    return { ok: false, error: `Миссия ${mission.id} уже существует` };
  }

  missionsData.missions.push({
    id: Number(mission.id),
    name: String(mission.name || `Миссия ${mission.id}`),
    artist: String(mission.artist || ''),
    title: String(mission.title || mission.name || `Миссия ${mission.id}`),
    link: String(mission.link),
    image: String(mission.image)
  });

  const jsonStr = JSON.stringify(missionsData, null, 2);
  const newContent = btoa(unescape(encodeURIComponent(jsonStr)));

  const putResp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'rcrc-bot'
    },
    body: JSON.stringify({
      message: `Add mission ${mission.id} via Telegram bot`,
      content: newContent,
      sha: currentSha,
      committer: {
        name: env.GIT_COMMITTER_NAME || 'RC:RC Bot',
        email: env.GIT_COMMITTER_EMAIL || 'bot@rcrc.local'
      }
    })
  });

  if (!putResp.ok) {
    const err = await putResp.text();
    return { ok: false, error: 'GitHub commit failed', details: err };
  }

  const result = await putResp.json();
  return { ok: true, commit: result.commit?.html_url || '' };
}

// ============================================================
// Удаление миссии из GitHub
// ============================================================
async function deleteMissionFromGitHub(env, missionId) {
  const url = `${GITHUB_API}/repos/${env.GITHUB_OWNER}/${env.GITHUB_REPO}/contents/missions.json`;

  const getResp = await fetch(url, {
    headers: {
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'User-Agent': 'rcrc-bot'
    }
  });

  if (!getResp.ok) {
    const err = await getResp.text();
    return { ok: false, error: 'GitHub read failed', details: err };
  }

  const fileData = await getResp.json();
  const currentSha = fileData.sha;

  let decoded;
  try {
    decoded = decodeURIComponent(escape(atob(fileData.content.replace(/\n/g, ''))));
  } catch (e) {
    decoded = atob(fileData.content.replace(/\n/g, ''));
  }

  let missionsData;
  try {
    missionsData = JSON.parse(decoded);
  } catch (e) {
    return { ok: false, error: 'missions.json повреждён' };
  }

  if (!Array.isArray(missionsData.missions)) {
    missionsData.missions = [];
  }

  // Ищем миссию
  const idx = missionsData.missions.findIndex(m => Number(m.id) === Number(missionId));
  if (idx === -1) {
    return { ok: false, error: `Миссия ${missionId} не найдена` };
  }

  // Запоминаем название для отчёта
  const removed = missionsData.missions[idx];
  const deletedName = removed.artist
    ? `${removed.artist} - ${removed.title || removed.name}`
    : (removed.title || removed.name || `Миссия ${missionId}`);

  // Удаляем
  missionsData.missions.splice(idx, 1);

  const jsonStr = JSON.stringify(missionsData, null, 2);
  const newContent = btoa(unescape(encodeURIComponent(jsonStr)));

  const putResp = await fetch(url, {
    method: 'PUT',
    headers: {
      'Authorization': `Bearer ${env.GITHUB_TOKEN}`,
      'Accept': 'application/vnd.github.v3+json',
      'Content-Type': 'application/json',
      'User-Agent': 'rcrc-bot'
    },
    body: JSON.stringify({
      message: `Delete mission ${missionId} via Telegram bot`,
      content: newContent,
      sha: currentSha,
      committer: {
        name: env.GIT_COMMITTER_NAME || 'RC:RC Bot',
        email: env.GIT_COMMITTER_EMAIL || 'bot@rcrc.local'
      }
    })
  });

  if (!putResp.ok) {
    const err = await putResp.text();
    return { ok: false, error: 'GitHub commit failed', details: err };
  }

  const result = await putResp.json();
  return {
    ok: true,
    deleted: deletedName,
    commit: result.commit?.html_url || ''
  };
}

// ============================================================
// Экранирование HTML
// ============================================================
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}
