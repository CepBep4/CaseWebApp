import requests as rq
# from urls import HOST

HOST = 'http://213.171.12.123:5000'

#адрес с указанием параметра поиска
url = f"{HOST}/api/user?id=2"

#Данные которые будем менять
json = {
	"balance": 100,
	"username": "test2" 
}

#Пост запрос
response = rq.post(url, data=json)