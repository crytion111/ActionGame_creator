import RootStatus from "../RootStatus";
import {PlayerActions} from "../PlayerStatusMachine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class JumpStatus extends RootStatus
{
    fJumpTime:number = 0;
    onEnter()
    {
        this.fJumpTime = 0;
        this.spritePlayer.getComponent(cc.Animation).play("player_jump");
    }

    onExit()
    {
        this.fJumpTime = 0;
    }

    onUpdate(dt: number)
    {
        this.fJumpTime += dt;
        if(this.fJumpTime >= 0.2)
        {
            this.machine.changeStatus(PlayerActions.fallDown)
        }
    }
}
