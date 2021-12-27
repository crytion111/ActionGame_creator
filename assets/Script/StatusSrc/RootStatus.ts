
//状态的父类, 接口类

import {PlayerStatusMachine} from "./PlayerStatusMachine";

export default class RootStatus {

    machine:PlayerStatusMachine = null;
    spritePlayer:cc.Node = null;

    constructor(ower:PlayerStatusMachine, spritePlayer:cc.Node)
    {
        this.machine = ower;
        this.spritePlayer = spritePlayer;
    }

    onEnter()
    {

    }
    onUpdate(dt:number)
    {

    }

    onExit()
    {

    }


}
