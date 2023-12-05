#include "car.h"
#include "bluetooth.h"

CarController car;
BluetoothController bt;

bool forward;
bool backward;
uint direction;
void setup() {
  car.begin();
  bt.begin("ESP32_CAR");
  Serial.begin(9600);
}

void loop() {
  bt.run(forward, backward, direction);
  car.run(forward, backward, direction);
  delay(20);
}
