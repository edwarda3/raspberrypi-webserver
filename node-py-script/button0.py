import sys

for i in range(10):
    print('Hello from python program, num {}'.format(i))
    sys.stdout.flush()

with open('test.txt','w+') as f:
    f.write('Hello world')
