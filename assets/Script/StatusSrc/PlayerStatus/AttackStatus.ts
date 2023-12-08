import RootStatus from "../RootStatus";
import { PlayerActions } from "../PlayerStatusMachine";

const { ccclass, property } = cc._decorator;

@ccclass
export default class AttackStatus extends RootStatus {
    nAttackLevel: number = 1;

    // 是不是在运行动作中
    bInAttackAnimation: boolean = false;

    onEnter() {
        this.bInAttackAnimation = true;
        this.spritePlayer.getComponent(cc.Animation).play("player_attack" + this.nAttackLevel);
        this.nAttackLevel++;
        if (this.nAttackLevel > 3) {
            this.nAttackLevel = 1;
        }

        this.spritePlayer.getComponent(cc.Animation).off("finished", this.onAttackFinished, this)
        this.spritePlayer.getComponent(cc.Animation).on("finished", this.onAttackFinished, this)
    }

    onExit() {
        this.bInAttackAnimation = false;
        this.spritePlayer.getComponent(cc.Animation).off("finished", this.onAttackFinished, this)
        cc.Tween.stopAllByTarget(this);
    }

    onUpdate(dt: number) {

    }

    onAttackFinished() {
        this.bInAttackAnimation = false;
        cc.tween(this)
            .delay(0.2)
            .call(() => {
                this.nAttackLevel = 1;

                if (this.machine.mainPlayer.bPlayerInRunning) {
                    this.machine.changeStatus(PlayerActions.move);
                }
                else {
                    this.machine.changeStatus(PlayerActions.stand2);
                }
            })
            .start();
    }
}
