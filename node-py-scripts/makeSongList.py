from os import listdir
from os.path import isfile,join
from shutil import copy2

folder = 'audiofiles'
files = [join(folder,f) for f in listdir(folder) if isfile(join(folder,f))]

with open('songlist.txt','w') as wf:
    for f in files:
        wf.write(f+'\n')
