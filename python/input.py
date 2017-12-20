# < > == <= >= != and or
# False 0 ''
# True 0-9 'a' 'a...z'

#a = int(input())
#if a % 2 == 0:
    #print("even")
#else:
    #print("odd")


#a = str(input())
#if len(a) == 3:
    #print("Yes")
#else:
    #print("No")

#x = True
#y = False
##if x or y :
##if x and not y :
#if not y :
    #print 'Yes'
    
#print('Insert your name')
#name = input()
#if name == '' :
    #print('This is a bad name')
#else:
    #print('Hello '+name)
    
#name = input() or 'Guest'
#print('Hello '+name)

#s = input()
#if s == s[::-1]:
    #print('Poli')
#else:
    #print('Ne poli')

#print('1)')    
#a = int(input())
#print('2)')    
#b = int(input())
#if b :
    #print(a // b )
#else:
    #print('Bad second value')
    
#year = int(input())
#if (year % 4 == 0 and year % 100 !=0) or (year % 400 == 0):
    #print('Yes')
#else:
    #print('No')

#number = int(input())
#if number > 0 and number < 4 :
    #print('I'*number)
#elif number == 4:
    #print('IV')
#elif number // 5 == 1:
    #print('V' + 'I'*(number % 5))
#elif number == 9:
    #print('IX')
#elif number == 10:
    #print('X')
    
print(int(4 ** 0.5))

x = 0
while x == 0 :
    print('Insert numbber (1-14)')
    y = int(input())
    if 0 < y < 15 :
        x = y
        
if x != 0 :
    while x < 15 :
        print(x)
        x += 1