import RootStatus from "../RootStatus";
import {PlayerActions} from "../PlayerStatusMachine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class FallStatus extends RootStatus
{
    onEnter()
    {
        this.spritePlayer.getComponent(cc.Animation).play("player_fall");
    }

    onExit()
    {
    }

    onUpdate(dt: number)
    {

    }
}
