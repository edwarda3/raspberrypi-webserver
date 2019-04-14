import sys
import audio
import random
import os

def printer(curtime,totaltime):
    curmin = curtime//60
    cursec = curtime%60
    totalmin = totaltime//60
    totalsec = totaltime%60
    current = "{}:{:02d}".format(curmin,cursec)
    total = "{}:{:02d}".format(totalmin,totalsec)
    if(curtime>0):
        print("P:{}/{}".format(current,total),flush=True)

def getSongList(songlist):
    files = []
    with open(songlist,'r') as f:
        for line in f:
            files.append(line.strip())
    return files

def getrandom(songs):
    return random.choice(songs)

def findAndPlay(songlist):
    songs = getSongList(songlist)
    choice = getrandom(songs)
    prettychoice = choice.split('/')[1].replace('_',' ')
    print("S:Playing {}".format(prettychoice),flush=True)
    try:
        a=audio.Audio(choice,printer)
    except KeyboardInterrupt:
        os.remove(choice+'.wav')
        print('Stream killed',file=sys.stderr,flush=True)
    os.remove(choice+'.wav')

if __name__ == "__main__":
    os.chdir(sys.argv[1])
    findAndPlay('songlist.txt')

