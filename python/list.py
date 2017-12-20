# list

# 1
a = [5,1,4,100,-7]

# 2
a[3] = 17

# 3
a = list( range(1, 10) )
# list( range(1, 10, 3) )
# list( "..." )
# list( map )
a = [0]*10

# 4
#a.append(int(input()))

len(a)

' '.join(list(map(str,a)))     # implode elements of a - list of string

a.index(0)      # return index "0"

2 in a          # terurt True or False
2 not in a

a.count(0)      # количество "0"
a.sort()        # сортировка
# a.sort(revers = True)

del a[1]        # del first elem

a = [1] + a     # add

a[:1] + [4] + a[1:] # insert

a[1:2] = [7, 7, 7]  # reaplece
a[1:2] = []

a[::-1]         # revers

min(a)
max(a)
sum(a)

# генератор списков
#a = [ int(input()) for i in range(3) ]

#print(a)

#~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~



def get_list(count = 10):
    from random import randint
    a = [0]*count
    for i in range(count):
        a[i] = randint(1, 100)
    return a

#print('\t'.join(list(map(str, get_list()))))

# mylist = get_list()

# for element in mylist:
    #print(element, end=' ')

# print(len(mylist))

# print('\t'.join(map(str, mylist)))

#line = "23 75 2 -7 0 11"
#print('inner line - "'+line+'"')

## list(map(int,input().split()))

#rezult = list(map(int,line.split()))

#for elem in rezult:
    #print(elem, end=' ')

##print(join(' ', rezult))
    
mylist = get_list()
print('\t'.join(map(str,mylist)))

print('max = ',max(mylist))
print('position max = ', mylist.index(max(mylist)))
temp_list = mylist[:mylist.index(max(mylist))] + mylist[(mylist.index(max(mylist))+1):]
#print('\t'.join(map(str,temp_list)))
print('max = ',max(temp_list))
print('position 2 max = ', mylist.index(max(temp_list)))