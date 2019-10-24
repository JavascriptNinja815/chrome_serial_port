import struct
import sys
import threading
import serial
import serial.tools.list_ports
import json
import time

if sys.platform == "win32":
    import os
    import msvcrt
    msvcrt.setmode(sys.stdin.fileno(), os.O_BINARY)
    msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)


def send_msg(msg):  # Function That Send MSG To Extension
    sys.stdout.write(struct.pack('I', len(msg)))
    sys.stdout.write(msg)
    sys.stdout.flush()


def portsList():  # Function That Get Available COM Ports
    portsList = []
    ports = serial.tools.list_ports.comports()
    for port, desc, hwid in ports:
        portsList.append(port)
    send_msg(json.dumps({"portsList": portsList}))


def log(msg):  # Function That Log Data To Text File For Debugging
    f = open("./log.txt", 'a')
    f.write(msg)
    f.close()


def read_thread_func():  # Thread that reads messages from the extension.
    message_number = 0
    while 1:
        msg_length_bytes = sys.stdin.read(4)
        if len(msg_length_bytes) == 0:
            continue

        # Unpack message length as 4 byte integer.
        msg_length = struct.unpack('i', msg_length_bytes)[0]

        # Read the msg (JSON object) of the message.
        msg = sys.stdin.read(msg_length).decode("utf-8")
        data = json.loads(msg)
        if data["type"] == "SEND":
            try:
                arduino = serial.Serial(
                    data["port"], baudrate=3000000, dsrdtr=1)
                arduino.write(data["data"])
                arduino.close()
                send_msg(json.dumps({"arduino": "successfuly wrote"}))
            except:
                send_msg(json.dumps({"arduino": "can not open port: " + port}))
                continue

        if data["type"] == "REQUEST":
            # Get availale com ports list and send to extension
            portsList()


def Main():
    thread = threading.Thread(target=read_thread_func)
    thread.start()


if __name__ == "__main__":
    Main()
