# 🚀 Инструкция по деплою на GitHub Pages

## Шаг 1: Создайте новый репозиторий на GitHub

1. Перейдите на [GitHub](https://github.com)
2. Нажмите на кнопку **"+"** в правом верхнем углу и выберите **"New repository"**
3. Укажите название репозитория, например: `ai-context-engineering-transcript`
4. Оставьте репозиторий **Public** (для бесплатного использования GitHub Pages)
5. **НЕ** ставьте галочки "Add a README file", "Add .gitignore", "Choose a license"
6. Нажмите **"Create repository"**

## Шаг 2: Привяжите локальный репозиторий к GitHub

Замените `YOUR_USERNAME` на ваше имя пользователя GitHub и `YOUR_REPO` на название репозитория:

```bash
cd /home/user/webapp
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git branch -M main
git push -u origin main
```

### Пример:
```bash
cd /home/user/webapp
git remote add origin https://github.com/dmitryzhechkov/ai-context-engineering.git
git branch -M main
git push -u origin main
```

## Шаг 3: Настройте GitHub Pages

1. Перейдите в настройки репозитория: **Settings** → **Pages**
2. В разделе **"Source"** выберите:
   - Branch: `main`
   - Folder: `/ (root)`
3. Нажмите **"Save"**

## Шаг 4: Дождитесь деплоя

GitHub Pages автоматически задеплоит ваш сайт. Процесс занимает 1-3 минуты.

После успешного деплоя ваш сайт будет доступен по адресу:

```
https://YOUR_USERNAME.github.io/YOUR_REPO/
```

### Пример:
```
https://dmitryzhechkov.github.io/ai-context-engineering/
```

## 🔧 Альтернативный способ: Использование GitHub CLI

Если у вас установлен GitHub CLI (`gh`):

```bash
cd /home/user/webapp

# Создать репозиторий и запушить код
gh repo create ai-context-engineering --public --source=. --remote=origin --push

# Включить GitHub Pages
gh api repos/{owner}/{repo}/pages -X POST -f source[branch]=main -f source[path]=/
```

## 📝 Обновление сайта

После изменений в коде:

```bash
cd /home/user/webapp
git add .
git commit -m "Описание изменений"
git push origin main
```

GitHub Pages автоматически обновит сайт через 1-3 минуты.

## ✅ Проверка статуса деплоя

В репозитории на GitHub:
1. Перейдите на вкладку **"Actions"**
2. Посмотрите статус последнего workflow **"pages build and deployment"**
3. Зеленая галочка ✅ означает успешный деплой

## 🔗 Кастомный домен (опционально)

Если у вас есть собственный домен:

1. В настройках репозитория: **Settings** → **Pages**
2. В разделе **"Custom domain"** введите ваш домен
3. Нажмите **"Save"**
4. Настройте DNS записи у вашего провайдера:
   - Для `example.com`: добавьте A-записи на IP GitHub Pages
   - Для `www.example.com`: добавьте CNAME запись на `YOUR_USERNAME.github.io`

## 🐛 Решение проблем

### Проблема: 404 Page Not Found

**Решение:** Проверьте, что:
- В настройках Pages выбрана правильная ветка (`main`) и папка (`/ (root)`)
- Файл `index.html` находится в корне репозитория
- Деплой завершен успешно (проверьте во вкладке Actions)

### Проблема: Стили или скрипты не загружаются

**Решение:** Проверьте пути к файлам. Для GitHub Pages используйте относительные пути:
- ✅ Правильно: `<script src="app.js"></script>`
- ❌ Неправильно: `<script src="/app.js"></script>`

### Проблема: Authentication required

**Решение:** Настройте Git credentials:

```bash
# Если используете HTTPS
git config --global credential.helper store
git push origin main
# Введите username и personal access token
```

Или используйте SSH:

```bash
# Сгенерируйте SSH ключ
ssh-keygen -t ed25519 -C "your_email@example.com"

# Добавьте ключ на GitHub
cat ~/.ssh/id_ed25519.pub
# Скопируйте и добавьте в Settings → SSH and GPG keys

# Измените remote на SSH
git remote set-url origin git@github.com:YOUR_USERNAME/YOUR_REPO.git
git push origin main
```

## 📚 Полезные ссылки

- [Документация GitHub Pages](https://docs.github.com/en/pages)
- [Настройка кастомного домена](https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site)
- [GitHub Actions для Pages](https://github.com/marketplace/actions/deploy-to-github-pages)

---

🎉 Готово! Теперь ваш сайт доступен всему миру!
