s = 'abcdefghijklmnopqrstuvwxyz'
#sub = string[-1:]
#sub = string[::-1]
#sub = string[:]

# // - целое значение от деления
# / -  чесное деления (могут быть ошибки)
# %  - целочисленный остаток от деления

# строка - неизменяемый объект
# +  - конкатенация

#sub = ord('a')
#sub = chr(13)

#sub = s.find('a')
#sub = len(s)
#sub = s.count('ab')
#sub = s.replace('a', 'z')
# 'aaa'*3    - aaaaaaaaa

sub = s.replace('a', 'z')[1:3]
print(sub)
