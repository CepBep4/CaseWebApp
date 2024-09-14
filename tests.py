import requests as rq
from urls import HOST

#адрес с указанием параметра поиска
url = f"{HOST}/api/user?id=1"

#Данные которые будем менять
json = {
	"balance": 100,
	"username": "test2" 
}

#Пост запрос
response = rq.post(url, json=json)