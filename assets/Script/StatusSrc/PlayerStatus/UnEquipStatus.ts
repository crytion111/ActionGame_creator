import RootStatus from "../RootStatus";
import {PlayerActions, PlayerStatusMachine} from "../PlayerStatusMachine";

const {ccclass, property} = cc._decorator;

@ccclass
export default class UnEquipStatus extends RootStatus
{

    onEnter()
    {
        this.spritePlayer.getComponent(cc.Animation).play("player_unequip");

        this.spritePlayer.getComponent(cc.Animation).off("finished", this.onUnEquipFinished, this)
        this.spritePlayer.getComponent(cc.Animation).on("finished", this.onUnEquipFinished, this)
    }

    onExit()
    {
        this.spritePlayer.getComponent(cc.Animation).off("finished", this.onUnEquipFinished, this)
    }

    onUpdate(dt: number)
    {

    }

    onUnEquipFinished()
    {
        this.machine.changeStatus(PlayerActions.stand1)
    }
}
