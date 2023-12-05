#ifndef CAR_H
#define CAR_H
#include <Arduino.h>

#define MR_EN 21  // control speed(PWM) -
#define MR_C1 25  // control direction -
#define MR_C2 26  // control direction -

#define ML_EN 23  // control speed(PWM)
#define ML_C1 22  // control direction
#define ML_C2 32  // control direction -

class CarController {
private:
  void rightRun(uint divider);
  void leftRun(uint divider);
  void forwardRun();
  void backwardRun();
  void stopRun();
public:
  CarController();
  void begin();
  void run(bool forward, bool backward, uint direction);
};

#endif