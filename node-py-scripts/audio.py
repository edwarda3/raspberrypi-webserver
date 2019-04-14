import pyaudio
import wave
import sys
from pydub import AudioSegment

class Audio:
    def __init__(self,file,statuscall):
    
        self.tmpfile = self.convert(file)
        wf = wave.open(self.tmpfile,'rb')
        pa = pyaudio.PyAudio()
        self.duration = int(wf.getnframes() / wf.getframerate())
        self.time=0
        self.lastDisplayedTime=0
        self.firstStamp=-1
        self.statusCallback = statuscall

        def callback(in_data,frame_count,time_info,status):
            data = wf.readframes(frame_count)
            self.time = int(time_info['current_time'])
            if(self.firstStamp == -1):
                self.firstStamp = self.time
            return (data,pyaudio.paContinue)

        stream = pa.open(format=pa.get_format_from_width(wf.getsampwidth()), channels=wf.getnchannels(), rate=wf.getframerate(), output=True, stream_callback=callback)
        stream.start_stream()
        
        while(True):
            if(not self.time==self.lastDisplayedTime):
                realTime = self.time-self.firstStamp
                self.lastDisplayedTime=self.time
                self.statusCallback(realTime,self.duration)
            
    def convert(self,input):
        f = input+'.wav'
        sound = AudioSegment.from_mp3(input)
        sound.export(f,format='wav')
        return f
