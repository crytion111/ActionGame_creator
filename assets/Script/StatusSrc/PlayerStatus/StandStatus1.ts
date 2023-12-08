import RootStatus from "../RootStatus";
import { PlayerStatusMachine } from "../PlayerStatusMachine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class StandStatus1 extends RootStatus {

    onEnter() {
        this.spritePlayer.getComponent(cc.Animation).play("player_stand1");
    }

    onExit() {
    }

    onUpdate(dt: number) {

    }
}
