import struct
import sys
import threading
import serial
import serial.tools.list_ports
import json

if sys.platform == "win32":
    import os
    import msvcrt
    msvcrt.setmode(sys.stdin.fileno(), os.O_BINARY)
    msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)

# Function That Send MSG To Extension
def send_msg(msg):
    sys.stdout.write(struct.pack('I', len(msg)))
    sys.stdout.write(msg)
    sys.stdout.flush()

# Function That Get Available COM Ports
def portsList():
    portsList = []
    ports = serial.tools.list_ports.comports()
    for port, desc, hwid in ports:
        portsList.append(port)
    send_msg(json.dumps({"portsList": portsList}))


# Function That Log Data To Text File For Debugging
def log(msg):
    f = open('./log.txt', 'a')
    f.write(msg)
    f.close()

# Function That Check Port Is Available Or Not
def getArduino(port):
    try:
        arduino = serial.Serial(port, baudrate = 115200, dsrdtr = True)
        return arduino
    except:
        return None

# Thread that reads messages from the extension.
def read_thread_func():
    message_number = 0
    while 1:
        msg_length_bytes = sys.stdin.read(4)
        if len(msg_length_bytes) == 0:
            continue

        # Unpack message length as 4 byte integer.
        msg_length = struct.unpack('i', msg_length_bytes)[0]

        # Read the msg (JSON object) of the message.
        msg = sys.stdin.read(msg_length).decode('utf-8')
        data = json.loads(msg)
        if data["type"] == "SEND":
            port = data["port"]
            code = data["data"]
            ser = getArduino(port)
            if ser != None:
                send_msg(json.dumps({'response': 'successfuly wrote' + code + ' to Arduino'}))
                ser.write(code.encode("utf-8"))
                ser.close()
            else:
                send_msg(json.dumps({"response": "can not open " + port}))

        if data["type"] == 'REQUEST':
          # Get availale com ports list and send to extension
          portsList()

          


def Main():
    thread = threading.Thread(target=read_thread_func)
    thread.start()


if __name__ == '__main__':
    # Main()
    print getPortsList()