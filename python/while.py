#x = 0
#while x == 0 :
    #print('Insert numbber (1-14)')
    #y = int(input())
    #if 0 < y < 15 :
        #x = y
#if x != 0 :
    #while x < 15 :
        #print(x)
        #x += 1
       
## Perevod v dwoi4nuiu sistemu        
## x = 121231235456547567
#x = 12
#line = ''
#while x != 0:
    ## x = x // 2
    ## print(x % 2, end='')
    #line +=str(x % 2)
    #x //= 2
#print('Na4alo - \t\t',line)
#print('Preobrazovanoe - \t',line[::-1])

### Proverka 4isla na prostoio
#x = 127
#d = 2
#while x % d != 0 :
    #d += 1
#if d == x:
    #print('prime')
#else:
    #print('composite')
    
## razlo#it 4islo na mno#iteli
#x = 1000000003
#d = 2
#while x > 1 :
    #if x % d == 0:
        #print(d)
        #x //= d
    #else:
        #d += 1