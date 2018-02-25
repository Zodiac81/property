
def firatFan():
    for i in range(10):
        print(i)

def get_list(count = 10):
    from random import randint
    a = [0]*count
    for i in range(count):
        a[i] = randint(1, 100)
    return a