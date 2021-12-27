import RootStatus from "../RootStatus";
import {PlayerActions, PlayerStatusMachine} from "../PlayerStatusMachine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class RollingStatus extends RootStatus
{

    onEnter()
    {
        this.spritePlayer.getComponent(cc.Animation).play("player_roll");

        this.spritePlayer.getComponent(cc.Animation).off("finished", this.onRollFinished, this)
        this.spritePlayer.getComponent(cc.Animation).on("finished", this.onRollFinished, this)
    }

    onExit()
    {
        this.spritePlayer.getComponent(cc.Animation).off("finished", this.onRollFinished, this)
        this.machine.mainPlayer.nPlayerRunSpeed = 2;
    }

    onUpdate(dt: number)
    {

    }

    onRollFinished()
    {
        if(this.machine.mainPlayer.bPlayerInRunning)
        {
            this.machine.changeStatus(PlayerActions.move);
        }
        else
        {
            this.machine.changeStatus(PlayerActions.stand1);
        }
    }
}
