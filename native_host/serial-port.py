import struct
import sys
import threading
import serial
import serial.tools.list_ports

if sys.platform == "win32":
  import os, msvcrt
  msvcrt.setmode(sys.stdin.fileno(), os.O_BINARY)
  msvcrt.setmode(sys.stdout.fileno(), os.O_BINARY)

# Function That Send MSG To Extension
def send_msg(msg):
  sys.stdout.write(struct.pack('I', len(msg)))
  sys.stdout.write(msg)
  sys.stdout.flush()

# Function That Get Available COM Ports
def getPortsList():
  portsList = ''
  ports = serial.tools.list_ports.comports()
  for port, desc, hwid in ports:
    portsList = portsList + port + ', '
  return '{"portsList": "' + portsList + '"}'

# Function That Write Data To COM Port
def write_data(port, code):
  ser = serial.Serial(port, baudrate=9600, timeout=.1)
  data = bytearray(code)
  ser.write(data)
  ser.close()

# Thread that reads messages from the extension.
def read_thread_func():
  message_number = 0
  while 1:
    msg_length_bytes = sys.stdin.read(4)
    if len(msg_length_bytes) == 0:
      sys.exit(0)
      continue

    # Unpack message length as 4 byte integer.
    msg_length = struct.unpack('i', msg_length_bytes)[0]

    # Read the msg (JSON object) of the message.
    msg = sys.stdin.read(msg_length).decode('utf-8')

    # Get availale com ports list
    portsList = getPortsList()

    # Send portsList to extension
    send_msg(portsList)

    # Write data to com port
    write_data()
def Main():
  thread = threading.Thread(target=read_thread_func)
  thread.start()

if __name__ == '__main__':
  # Main()
  write_data('COM1', 'P1B')
