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
    }
}
