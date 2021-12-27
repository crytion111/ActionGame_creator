import RootStatus from "../RootStatus";
import {PlayerActions} from "../PlayerStatusMachine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class MoveStatus extends RootStatus
{
    onEnter()
    {
        this.spritePlayer.getComponent(cc.Animation).play("player_run");
    }

    onExit()
    {
    }

    onUpdate(dt: number)
    {
        // let fPlayerFallSpeed = this.machine.mainPlayer.nFallSpeed;
        // if (fPlayerFallSpeed < 0)
        // {
        //     this.machine.changeStatus(PlayerActions.fallDown);
        // }
    }
}
