#include "bluetooth.h"

BluetoothController::BluetoothController() {
}

void BluetoothController::begin(String name) {
  serialBT.begin(name);
}

void BluetoothController::run(bool &forward, bool &backward, uint &direction) {
  if (serialBT.available()) {
    int incoming = serialBT.read();
    switch (incoming) {
      case 102:
        forward = true;
        backward = false;
        break;
      case 115:
        forward = false;
        backward = false;
        break;
      case 98:
        forward = false;
        backward = true;
        break;
      case 49:
        direction = 1;
        break;
      case 50:
        direction = 2;
        break;
      case 51:
        direction = 3;
        break;
      case 52:
        direction = 4;
        break;
      case 48:
        direction = 0;
        break;
    }
  }
}