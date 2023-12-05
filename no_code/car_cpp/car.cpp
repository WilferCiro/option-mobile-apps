#include "car.h"

CarController::CarController() {
}
void CarController::begin() {
  pinMode(MR_EN, OUTPUT);
  pinMode(MR_C1, OUTPUT);
  pinMode(MR_C2, OUTPUT);

  pinMode(ML_EN, OUTPUT);
  pinMode(ML_C1, OUTPUT);
  pinMode(ML_C2, OUTPUT);

  digitalWrite(MR_EN, HIGH);
  digitalWrite(ML_EN, HIGH);
}

void CarController::run(bool forward, bool backward, uint direction) {
  if (forward || backward) {
    if (direction > 2) {
      rightRun(direction - 2);
    } else if (direction > 0 && direction <= 2) {
      leftRun(direction);
    } else if (forward) {
      forwardRun();
    } else if (backward) {
      backwardRun();
    }
  } else {
    stopRun();
  }
}

void CarController::rightRun(uint divider) {
  digitalWrite(ML_C1, HIGH);
  digitalWrite(ML_C2, LOW);

  digitalWrite(MR_C1, LOW);
  digitalWrite(MR_C2, HIGH);

  // PWM
  analogWrite(MR_EN, 255 / divider);
  analogWrite(ML_EN, 255 / divider);

  // Control
  Serial.println("Right");
}
void CarController::leftRun(uint divider) {
  digitalWrite(ML_C1, LOW);
  digitalWrite(ML_C2, HIGH);

  digitalWrite(MR_C1, HIGH);
  digitalWrite(MR_C2, LOW);

  // PWM
  analogWrite(MR_EN, 255 / divider);
  analogWrite(ML_EN, 255 / divider);

  // Control
  Serial.println("Left");
}
void CarController::forwardRun() {
  // PWM
  analogWrite(MR_EN, 255);
  analogWrite(ML_EN, 255);

  digitalWrite(MR_C1, LOW);
  digitalWrite(MR_C2, HIGH);

  digitalWrite(ML_C1, LOW);
  digitalWrite(ML_C2, HIGH);

  // Control
  Serial.println("Front");
}
void CarController::backwardRun() {
  digitalWrite(MR_C1, HIGH);
  digitalWrite(MR_C2, LOW);

  digitalWrite(ML_C1, HIGH);
  digitalWrite(ML_C2, LOW);

  // PWM
  analogWrite(MR_EN, 255);
  analogWrite(ML_EN, 255);

  // Control
  Serial.println("Back");
}

void CarController::stopRun() {
  digitalWrite(MR_C1, LOW);
  digitalWrite(MR_C2, LOW);

  digitalWrite(ML_C1, LOW);
  digitalWrite(ML_C2, LOW);

  // Control
  Serial.println("Stop");
}
