#!/usr/bin/python3.5
#coding: utf8

"""
    sudo get-apt install python3
    sudo apt-get install python3-pip
    python3 -m pip --version
"""

print("~~~~~~~~~~~~~~ Start ~~~~~~~~~~~~~~\n")

from random import randint
from libery import get_list

from libery import firatFan
firatFan()

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ None ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

None - singlton

None == None

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ print ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

print(2)

line = "Hello world"
for i in line:
    print(i, end='\n')
    # print(i, end='')

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ dir ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

import hello

dir(hello)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ type(element) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

type(element)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ ** ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

print(int(4 ** 0.5))
print(int(2 ** 2))

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Int ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

x = 42
type(x)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Float ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

x = 42.23
type(x)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ complex ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

x = 42j
type(x)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ String ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// - целое значение от деления
/ -  чесное деления (могут быть ошибки)
%  - целочисленный остаток от деления

строка - неизменяемый объект
+  - конкатенация

sub = ord('a')
sub = chr(13)

b"hello world"             # <class 'bytes'>
b"hello world".decode("utf-8")

sub = s.find('a')
sub = len(s)
sub = s.count('ab')
sub = s.strip()             # delete ' ' in start adn end
sub = s.replace('a', 'z')
'aaa'*3    - aaaaaaaaa

sub = s.replace('a', 'z')[1:3]
print(sub)


x = "Hello world"
for char in range(1,256):
    print(ord(chr(char)), "\t", " - ", "\t" , chr(char))

x = input("Input: ")
print("\n", x*3)

string = ""
for elem in range(97,123):
	string += chr(elem)
	#if elem != 122:
	#	string += '_'
	if elem % 2 == 0:
		string += ' '
print('String - ', string)
print('len - ', len(string))
print('string[:] - ', string[:])
print('string[3] - ', string[3])
print('string[3:5] - ', string[3:5])
print('string[3:15:2] - ', string[3:15:2])
print('string[:13] - ', string[:13])
print('string[13:] - ', string[13:])
print('string[::-1] - ', string[::-1])
print('string[::3] - ', string[::3])

sab7 = string.split(' ')
for elem in sab7:
	print(elem)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ For ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

for i in range(0,10,2):
    print(i)

string = "Hello world"
print(string.replace('', '\n'))

string = "Hello world"
for i in range(len(string)):
    print(string[i])

string = "Hello world"
for i in string:
    #print(i)
    print(i, end='-')

sum = 0
count = 10000
#for i in range(1,19,2):
for i in range(0, count):
    sum += randint(1,100)
    #linePref = str(i) + ') '
    #print(linePref,randint(1,13))
print(sum/count)
print(sum//count)
print(sum%count)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ function ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

def hello( N, M , symbol):
    #for i in range():
    print((symbol*N + '\n') * M)

def exeption_pass():
    pass
print(exeption_pass())

def exeption_return():
    return 1
print(exeption_return())
hello(2,3,'$')


def safe_div(x, y):
    """Do a safe division :-) for fun and profit"""
    if y != 0:
        z = x / y
        print(z)
        return(z)
    else:
        print("Yippie-kay-yay, motherf___er!")

safe_div(10, 1)

print(safe_div.__doc__)

def gcd(a, b):
   """Нахождение Наибольшего Общего Делителя"""
   while a != 0:
      a,b = b%a,a # параллельное определение
   return b

print(gcd(21, 14))
print(gcd.__doc__)  

def hello():
    """ I am documentation """
    return 42

print(hello.__doc__)
print(hello())

def min(x, y):
    return x if x < y else y
print(min(10, 24))
print(min(x=10, y=11))

# def min(*args): # type(args) == tuple.
def min(first, *args):
    res = float("inf")
    for arg in args:
        if arg < res:
            res = arg
    return res
print(min(-5, 12, 13))      # -5
print(min())                # inf

def bounded_min(first, *args, lo=float("-inf"), hi=float("inf")):
    res = hi
    for arg in (first, ) + args:
        if arg < res and lo < arg < hi:
            res = arg
    return max(res, lo)
bounded_min(-5, 12, 13, lo=0, hi=255)       # 12

def unique(iterable, seen=None):
    seen = set(seen or []) # None --- falsy.
    acc = []
    for item in iterable:
        if item not in seen:
            seen.add(item)
            acc.append(item)
    return acc
xs = [1, 1, 2, 3]
unique(xs)          # [1, 2, 3]

def flatten(xs, *, depth=None):
    pass
flatten([1, [2], 3], 2)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ If ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# < > == <= >= != and or
# False 0 ''
# True 0-9 'a' 'a...z'

x = int(input('Enter number: '))
if x > 0 :
    print('Yes')
elif x < 0 :
    print('No')
else:
    print('Maby')

x = True if 1 > 0 else False

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Input ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

a = int(input())
if a % 2 == 0:
    print("even")
else:
    print("odd")

x = True
y = False
#if x or y :
#if x and not y :
if not y :
    print('Yes')

print('Insert your name: ', end='')
name = input()
if len(name) == 0 :
    print('This is a bad name')
else:
    print('Hello ',name)

name = input('Enter you name: ') or 'Guest'
print('Hello '+name)

s = input()
if s == s[::-1]:
    print('Poli')
else:
    print('Ne poli')

print('1) ', end = '')
a = int(input())
print('2) ', end = '')    
b = int(input())
if b :
    print(a // b )
else:
    print('Bad second value')

year = int(input('Enter number: '))
if (year % 4 == 0 and year % 100 !=0) or (year % 400 == 0):
    print('Yes (visikosnii)')
else:
    print('No (ne visokosnii)')

number = int(input('Enter number(1-10): '))
if number > 0 and number < 4 :
    print('I'*number)
elif number == 4:
    print('IV')
elif number == 5:
    print('V' + 'I'*(number % 5))
elif number == 9:
    print('IX')
elif number == 10:
    print('X')

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ While ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

x = 0
while x == 0 :
    y = int(input('Insert numbber (1-14): '))
    if 0 < y < 15 :
        x = y
if x != 0 :
    while x < 15 :
        print(x)
        x += 1

# Perevod v dwoi4nuiu sistemu        
x = 12
line = ''
while x != 0:
    # x = x // 2
    # print(x % 2, end='')
    line +=str(x % 2)
    x //= 2
print('Na4alo - \t\t',line)
print('Preobrazovanoe - \t',line[::-1])

# Proverka 4isla na prostoio
x = 127
d = 2
while x % d != 0 :
    d += 1
if d == x:
    print('prime (prostoe)')
else:
    print('composite (ne prostoe)')

# razlo#it 4islo na mno#iteli
x = 1000000003
d = 2
while x > 1 :
    if x % d == 0:
        print(d)
        x //= d
    else:
        d += 1

# кортеж -> список -> list()
# список -> кортеж -> tuple()

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Tuple (кортежи) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# используется для представления неизменяемой последовательности разнородных объектов
# x = tuple('sdfsdf')


t = (2, 2.05, "Hello")
print(t)
# (2, 2.0499999999999998, 'Hello')
(a, b, c) = t
z, y, x = t
print(a,b,c)
print(z, y, x)
# 2 2.05 Hello
# 2 2.05 Hello

a=1
b=2
a,b=b,a
print(a,b)

# 2 1
x = 12,
print(x)
# (12,)

date = ("year", 2015)
len(date)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ list (списки) ~~~~~~~~~~~~~~~~~~~~~~~~~~~~
# a = []
# b = [2, 2.05, "Hello"]
# b = list("Hello")

# 1
my_list = [5,1,4,100,-7]

# 2
my_list[3] = 17

# 3
my_list = list(range(1, 10))
list( range(1, 10, 3) )
list( "..." )
list( map )
my_list = [0]*10

# 4
my_list.append(123)

len(my_list)

' '.join(list(map(str,my_list)))     # implode elements of a - list of string

my_list.index(4)      # return index "0"

2 in my_list          # terurt True or False
2 not in my_list

my_list.count(0)      # количество "0"
my_list.sort()        # сортировка
my_list.sort(revers = True)

del my_list[1]        # del first elem

my_list = [1] + my_list     # add

my_list[:3] + [2] + my_list[3:] # insert

my_list[1:2] = [7, 7, 7]  # reaplece
my_list[1:2] = []

my_list[::-1]         # revers

min(my_list)
max(my_list)
sum(my_list)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ Словарь ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# (хэш, предопределенный массив) – изменяемая структура данных, предназначенная для хранения элементов вида ключ: значение

h0 = {1,2,3}                            # set() hesh-set
h1 = {1:"one", 2:"two", 3:"three"}      # dict()
h2 = {0:"zero", 5:"five"}
h3 = {"z":1, "y":2, "x":3}

h3["b"] = 4

print(h1)
print(h1[2])
print(h3["z"])

xs = {1, 2, 3, 4}
ys = {4, 5}
xs.intersection(ys)     # {4}
xs & ys                 # {4}
xs.union(ys)            # {1, 2, 3, 4, 5}
xs | ys                 # {1, 2, 3, 4, 5}
xs.difference(ys)       # {1, 2, 3}
xs - ys                 # {1, 2, 3}

for elem in h1:
    print(h1[elem])

                                # Цикл по паре ключ-значение
for key, value in h1.items():
    print(key, " ", value)

                                # Цикл по ключам
for key in h2.keys():
    print(key, " ", h2[key])

                                # Цикл по значениям
for v in h3.values():
    print v

# Добавление элементов из другого хеша
h1.update(h3)

# Количество пар в хеше
len(h1)

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ генератор списков ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

my_list = [ int(input()) for i in range(3) ]                     # пользовательский ввод

from random import randint
my_list = [ int(randint(1,100)) for i in range(3) ]              # random

my_list = [ x ** 3 for x in range(20) if x%2==1]


raw = [x.split(" ")  for x in open("log.txt")]                  # 1 считываем из файла строки и делим их на пары IP-адрес
rmp = {}                                                        # 2 заполняем словарь
for ip, traffic in raw:
        if ip in rmp:
                rmp[ip] += int(traffic)
        else:
                rmp[ip] = int(traffic)
lst = rmp.items()                                               # 3 переводим в список и сортируем
lst.sort(key = lambda (key, val): key)
print("\n".join(["%s\t%d" % (host, traff) for host, traff in lst]))  # 4 получаем результат

def get_list(count = 10):
    from random import randint
    a = [0]*count
    for i in range(count):
        a[i] = randint(1, 100)
    return a

print('\t'.join(list(map(str, get_list()))))

print('\t'.join(map(str, mylist)))

line = "23 75 2 -7 0 11"
print('inner line - "'+line+'"')

list(map(int,input().split()))

rezult = list(map(int,line.split()))

print(join(' ', rezult))
    
mylist = get_list()
print('\t'.join(map(str,mylist)))

print('max = ',max(mylist))
print('position max = ', mylist.index(max(mylist)))
temp_list = mylist[:mylist.index(max(mylist))] + mylist[(mylist.index(max(mylist))+1):]
#print('\t'.join(map(str,temp_list)))
print('max = ',max(temp_list))
print('position 2 max = ', mylist.index(max(temp_list)))

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ file ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

# предназначены для работы с внешними данными (Файловые объекты должны поддерживать основные методы: read(), write(), readline(), readlines(), seek(), tell(), close() и т.п)


# import urllib
# f1 = urllib.urlopen("http://python.onego.ru") 

f1 = open("file1.txt", "r")
f2 = open("file2.txt", "w")
for line in f1.readlines():
  f2.write(line)
f2.close()
f1.close()

# ~~~~~~~~~~~~~~~~~~~~~~~~~~~~ time ~~~~~~~~~~~~~~~~~~~~~~~~~~~~

from time import time
a = 1003456345634563456345634564053478562378562347856237845
b = 1003456345634563456345634564053478562378562347856237845
start = time()
while b != 0 :
    a, b = b, a % b
print( time() - start )

print("\n~~~~~~~~~~~~~~ End ~~~~~~~~~~~~~~")