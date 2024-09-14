### Backend
## Установка и запуск
Установите Python 3.12.5

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

