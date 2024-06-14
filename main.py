def on_received_number(receivedNumber):
    global vitesse, MODE, lumiere
    if MODE == 0:
        if receivedNumber == 0:
            vitesse = vitesse + 10
        elif receivedNumber == 1:
            vitesse = vitesse - 10
        elif receivedNumber == 2:
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, vitesse)
        elif receivedNumber == 3:
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_BACK, vitesse)
        elif receivedNumber == 4:
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_LEFT, vitesse / 2)
        elif receivedNumber == 5:
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RIGHT, vitesse / 2)
        elif receivedNumber == 6:
            MODE = 1
        basic.pause(50)
        Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
    elif MODE == 1:
        if receivedNumber == 6:
            MODE = 2
        elif receivedNumber == 0:
            vitesse = vitesse + 10
        elif receivedNumber == 1:
            vitesse = vitesse - 10
    elif MODE == 2:
        if receivedNumber == 6:
            MODE = 0
    if receivedNumber == 7:
        if lumiere == 0:
            lumiere += 1
        elif lumiere == 1:
            lumiere += 1
        elif lumiere == 2:
            lumiere += 1
        elif lumiere == 3:
            lumiere += 1
        elif lumiere == 4:
            lumiere += 1
        elif lumiere == 5:
            lumiere = 0
radio.on_received_number(on_received_number)

lumiere = 0
MODE = 0
vitesse = 0
vitesse = 100
MODE = 0
radio.set_group(122)
lumiere = 0

def on_forever():
    if MODE == 1:
        if Tinybit.Ultrasonic_Car() > 15:
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, vitesse)
        elif Tinybit.Ultrasonic_Car() <= 15:
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_BACK, vitesse)
            basic.pause(200)
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_BACK, vitesse)
    elif MODE == 2:
        if Tinybit.Line_Sensor(Tinybit.enPos.LEFT_STATE, Tinybit.enLineState.BLACK):
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINLEFT, 70)
            basic.pause(100)
            Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
        elif Tinybit.Line_Sensor(Tinybit.enPos.RIGHT_STATE, Tinybit.enLineState.BLACK):
            Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_SPINRIGHT, 70)
            basic.pause(100)
            Tinybit.car_ctrl(Tinybit.CarState.CAR_STOP)
        Tinybit.car_ctrl_speed(Tinybit.CarState.CAR_RUN, 100)
    if lumiere == 0:
        Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
    elif lumiere == 1:
        Tinybit.RGB_Car_Big2(256, 0, 0)
    elif lumiere == 2:
        Tinybit.RGB_Car_Big2(127, 127, 127)
    elif lumiere == 3:
        Tinybit.RGB_Car_Big2(256, 256, 256)
    elif lumiere == 4:
        while lumiere == 4:
            Tinybit.RGB_Car_Big2(256, 256, 256)
            basic.pause(200)
            Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
            basic.pause(200)
    elif lumiere == 5:
        while lumiere == 5:
            Tinybit.RGB_Car_Big2(256, 256, 256)
            basic.pause(50)
            Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
            basic.pause(50)
basic.forever(on_forever)
