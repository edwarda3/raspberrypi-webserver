import sys,json,math

def main():
    inputs = [int(i) for i in sys.argv[1].split(',')];

    sumToPiPower = sum([math.pow(i,math.pi) for i in inputs])
    print(round(sumToPiPower,2),end='')

main()
