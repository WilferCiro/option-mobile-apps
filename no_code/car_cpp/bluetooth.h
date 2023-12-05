#ifndef BLUETOOTH_H
#define BLUETOOTH_H
#include <Arduino.h>
#include "BluetoothSerial.h"

class BluetoothController {
public:
  void begin(String name);
  BluetoothController();
  void run(bool &forward, bool &backward, uint &direction);
private:
  BluetoothSerial serialBT;
};

#endif