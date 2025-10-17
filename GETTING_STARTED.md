# 🚀 Начало работы с проектом

Этот файл содержит пошаговые инструкции для публикации сайта на GitHub Pages.

## 📋 Предварительные требования

- Аккаунт GitHub ([создать бесплатно](https://github.com/join))
- Git установлен локально (проверьте: `git --version`)
- Опционально: GitHub CLI для упрощенного деплоя

## 🎯 Способ 1: Через веб-интерфейс GitHub (самый простой)

### Шаг 1: Создание репозитория

1. Перейдите на https://github.com/new
2. Заполните форму:
   - **Repository name:** `ai-context-engineering` (или любое другое имя)
   - **Description:** "Interactive transcript: Context Engineering for AI Agents"
   - **Public** ✅ (обязательно для бесплатного GitHub Pages)
   - **НЕ** ставьте галочки на "Add a README" и ".gitignore"
3. Нажмите **"Create repository"**

### Шаг 2: Загрузка файлов

На странице нового репозитория вы увидите инструкции. Выполните в терминале:

```bash
cd /home/user/webapp

# Добавьте удаленный репозиторий (замените YOUR_USERNAME и YOUR_REPO)
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git

# Убедитесь, что вы на ветке main
git branch -M main

# Загрузите код
git push -u origin main
```

**Пример:**
```bash
cd /home/user/webapp
git remote add origin https://github.com/dmitryzhechkov/ai-context-engineering.git
git branch -M main
git push -u origin main
```

При запросе учетных данных:
- **Username:** ваш username на GitHub
- **Password:** НЕ пароль! Используйте **Personal Access Token**

#### Как создать Personal Access Token:

1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
2. Generate new token (classic)
3. Выберите scope: `repo` (полный доступ к репозиториям)
4. Скопируйте токен (показывается только один раз!)
5. Используйте токен вместо пароля при git push

### Шаг 3: Активация GitHub Pages

1. В репозитории перейдите: **Settings** (⚙️)
2. Слева найдите **Pages**
3. В разделе **"Build and deployment"**:
   - **Source:** Deploy from a branch
   - **Branch:** `main` 
   - **Folder:** `/ (root)`
4. Нажмите **"Save"**

### Шаг 4: Проверка деплоя

1. Подождите 1-3 минуты
2. Обновите страницу Settings → Pages
3. Вверху появится зеленая плашка с URL:
   ```
   ✅ Your site is live at https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```
4. Перейдите по ссылке и проверьте сайт!

## 🎯 Способ 2: Через GitHub CLI (для продвинутых)

Если у вас установлен GitHub CLI (`gh`):

```bash
cd /home/user/webapp

# Аутентификация (один раз)
gh auth login

# Создать репозиторий и загрузить код
gh repo create ai-context-engineering \
  --public \
  --source=. \
  --remote=origin \
  --push

# Включить GitHub Pages
gh api repos/:owner/:repo/pages \
  -X POST \
  -f source[branch]=main \
  -f source[path]=/

# Получить URL сайта
gh repo view --web
```

## 🔧 Способ 3: Fork существующего репозитория

Если проект уже опубликован на GitHub:

1. Перейдите на страницу репозитория
2. Нажмите **"Fork"** в правом верхнем углу
3. Выберите свой аккаунт
4. GitHub автоматически создаст копию
5. В Settings → Pages активируйте деплой (см. Шаг 3 выше)

## 📝 Проверочный список

Перед деплоем убедитесь:

- [ ] Все файлы закоммичены: `git status`
- [ ] Файл `index.html` находится в корне проекта
- [ ] Файл `app.js` находится в корне проекта
- [ ] В `.gitignore` нет `index.html` или `app.js`
- [ ] Git remote настроен: `git remote -v`
- [ ] У вас есть доступ к GitHub (Personal Access Token)

## 🐛 Решение проблем

### Ошибка: "remote: Permission denied"

**Причина:** Нет прав доступа к репозиторию или неверный токен.

**Решение:**
```bash
# Проверьте URL
git remote -v

# Если HTTPS, убедитесь что используете Personal Access Token
# Если SSH, проверьте SSH ключи: ssh -T git@github.com

# Измените URL если нужно
git remote set-url origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### Ошибка: "! [rejected] main -> main (fetch first)"

**Причина:** На GitHub есть коммиты, которых нет локально.

**Решение:**
```bash
# Вариант 1: Force push (ОСТОРОЖНО! Удалит изменения на GitHub)
git push -f origin main

# Вариант 2: Сначала pull
git pull origin main --rebase
git push origin main
```

### Ошибка: "fatal: 'origin' already exists"

**Причина:** Remote уже добавлен.

**Решение:**
```bash
# Удалите старый remote
git remote remove origin

# Добавьте новый
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
```

### Сайт показывает 404

**Причина:** GitHub Pages еще не задеплоил сайт или неправильные настройки.

**Решение:**
1. Проверьте Actions: репозиторий → Actions → pages build and deployment
2. Дождитесь зеленой галочки ✅
3. Проверьте Settings → Pages → Source (должна быть выбрана ветка `main`)
4. Убедитесь, что `index.html` в корне репозитория

### Стили не загружаются

**Причина:** Неправильные пути к файлам.

**Решение:** Убедитесь, что в `index.html` используются относительные пути:
```html
✅ <script src="app.js"></script>
❌ <script src="/app.js"></script>
```

## 🔄 Обновление сайта

После любых изменений в коде:

```bash
cd /home/user/webapp

# Сохраните изменения
git add .
git commit -m "Описание изменений"
git push origin main

# GitHub Pages автоматически обновит сайт через 1-3 минуты
```

## 📊 Мониторинг

### Проверка статуса деплоя

1. **Через Actions:**
   - Репозиторий → Actions
   - Смотрите последний workflow "pages build and deployment"
   - ✅ зеленая галочка = успешно, ❌ красный крестик = ошибка

2. **Через API:**
   ```bash
   gh api repos/:owner/:repo/pages/builds/latest
   ```

### Просмотр логов

В Actions кликните на workflow → pages build and deployment → build → посмотрите логи

## 🎉 Готово!

После успешного деплоя:

1. **Ваш сайт доступен по адресу:**
   ```
   https://YOUR_USERNAME.github.io/YOUR_REPO/
   ```

2. **Поделитесь ссылкой:**
   - В Telegram
   - В Twitter/X
   - В LinkedIn
   - С коллегами и друзьями

3. **Настройте кастомный домен (опционально):**
   - Купите домен (например, на namecheap.com)
   - В Settings → Pages → Custom domain введите ваш домен
   - Настройте DNS записи у провайдера домена

## 📚 Дополнительные ресурсы

- [GitHub Pages документация](https://docs.github.com/en/pages)
- [Git документация на русском](https://git-scm.com/book/ru/v2)
- [GitHub CLI](https://cli.github.com/)
- [Markdown Guide](https://www.markdownguide.org/)

## 💡 Советы

1. **Используйте описательные commit messages**
   ```bash
   ✅ git commit -m "Add search functionality to transcript"
   ❌ git commit -m "Update"
   ```

2. **Делайте коммиты часто**
   - После каждой завершенной функции
   - Перед большими изменениями

3. **Проверяйте изменения локально**
   - Откройте `index.html` в браузере перед push

4. **Используйте Issues для отслеживания задач**
   - Репозиторий → Issues → New issue

5. **Читайте changelog**
   - Смотрите историю коммитов: `git log --oneline`

---

🎊 **Удачи с вашим проектом!**

Если возникли вопросы, создайте Issue в репозитории или обратитесь к [автору транскрипта](https://t.me/llm_notes).
