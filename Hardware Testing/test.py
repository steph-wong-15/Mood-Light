from textblob import TextBlob
import serial
import time

arduino = serial.Serial(
    port = "COM3", baudrate=115200, timeout= .1
)
def arduino_write(x):
    bin = str(x)
    print(x)
    arduino.write(bin.encode())
    time.sleep(0.05)
def arduino_read(x):
    data = arduino.readline()
    return data

sentence = TextBlob(input())
arduino_write(sentence.sentiment.polarity)
