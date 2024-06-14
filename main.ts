radio.onReceivedNumber(function (receivedNumber) {
    if (MODE == 0) {
        if (receivedNumber == 0) {
            vitesse = vitesse + 10
        } else if (receivedNumber == 1) {
            vitesse = vitesse - 10
        } else if (receivedNumber == 2) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, vitesse)
        } else if (receivedNumber == 3) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Back, vitesse)
        } else if (receivedNumber == 4) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Left, vitesse / 2)
        } else if (receivedNumber == 5) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Right, vitesse / 2)
        } else if (receivedNumber == 6) {
            MODE = 1
        }
        basic.pause(50)
        Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
    } else if (MODE == 1) {
        if (receivedNumber == 6) {
            MODE = 2
        } else if (receivedNumber == 0) {
            vitesse = vitesse + 10
        } else if (receivedNumber == 1) {
            vitesse = vitesse - 10
        }
    } else if (MODE == 2) {
        if (receivedNumber == 6) {
            MODE = 0
        }
    }
    if (receivedNumber == 7) {
        if (lumiere == 0) {
            lumiere += 1
        } else if (lumiere == 1) {
            lumiere += 1
        } else if (lumiere == 2) {
            lumiere += 1
        } else if (lumiere == 3) {
            lumiere += 1
        } else if (lumiere == 4) {
            lumiere += 1
        } else if (lumiere == 5) {
            lumiere = 0
        }
    }
})
let lumiere = 0
let MODE = 0
let vitesse = 0
vitesse = 100
MODE = 0
radio.setGroup(122)
lumiere = 0
basic.forever(function () {
    if (MODE == 1) {
        if (Tinybit.Ultrasonic_Car() > 15) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, vitesse)
        } else if (Tinybit.Ultrasonic_Car() <= 15) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Back, vitesse)
            basic.pause(200)
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Back, vitesse)
        }
    } else if (MODE == 2) {
        if (Tinybit.Line_Sensor(Tinybit.enPos.LeftState, Tinybit.enLineState.Black)) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinLeft, 70)
            basic.pause(100)
            Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
        } else if (Tinybit.Line_Sensor(Tinybit.enPos.RightState, Tinybit.enLineState.Black)) {
            Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_SpinRight, 70)
            basic.pause(100)
            Tinybit.CarCtrl(Tinybit.CarState.Car_Stop)
        }
        Tinybit.CarCtrlSpeed(Tinybit.CarState.Car_Run, 100)
    }
    if (lumiere == 0) {
        Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
    } else if (lumiere == 1) {
        Tinybit.RGB_Car_Big2(256, 0, 0)
    } else if (lumiere == 2) {
        Tinybit.RGB_Car_Big2(127, 127, 127)
    } else if (lumiere == 3) {
        Tinybit.RGB_Car_Big2(256, 256, 256)
    } else if (lumiere == 4) {
        while (lumiere == 4) {
            Tinybit.RGB_Car_Big2(256, 256, 256)
            basic.pause(200)
            Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
            basic.pause(200)
        }
    } else if (lumiere == 5) {
        while (lumiere == 5) {
            Tinybit.RGB_Car_Big2(256, 256, 256)
            basic.pause(50)
            Tinybit.RGB_Car_Big(Tinybit.enColor.OFF)
            basic.pause(50)
        }
    }
})
