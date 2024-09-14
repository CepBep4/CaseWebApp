import datetime

def write_log(text):

    #Запись ошибки
    with open('logg.txt', 'a') as file:
        file.write(f"\n\n{datetime.datetime.now()}\n{text}")

    return (False, text)