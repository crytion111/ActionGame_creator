import RootStatus from "../RootStatus";
import {PlayerActions} from "../PlayerStatusMachine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class StandStatus2 extends RootStatus
{

    fStandTime:number = 0;

    onEnter()
    {
        this.fStandTime = 0;
        this.spritePlayer.getComponent(cc.Animation).play("player_stand2");
    }

    onExit()
    {
        this.fStandTime = 0;
    }

    onUpdate(dt: number)
    {
        this.fStandTime += dt;
        if(this.fStandTime >= 1)
        {
            this.machine.changeStatus(PlayerActions.unEquip);
        }
    }
}
