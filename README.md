### Backend
# Установка и запуск
Установите Python 3.12.5 [отсюда](https://www.python.org/downloads/)

**Создадим виртуальную среду**
```
pip3 install virtualenv
python3 -m venv .venv
```
Теперь активируем виртуальную среду

**Для Windows**
```
cd .venv
cd Scripts
activate
```
**Для Linux/Mac**
```
. .venv/bin/activate
```
**Установим библиотеки**
`pip3 install -r requirements.txt`
# Запуск
`python3 wsgi.py`

![Документация к API](https://github.com/CepBep4/CaseWebApp/blob/main/Докуметация%20к%20API.png)

