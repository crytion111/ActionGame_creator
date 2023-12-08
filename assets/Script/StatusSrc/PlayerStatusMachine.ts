import MainPlayer from "../MainPlayer";
import RootStatus from "./RootStatus";
import StandStatus1 from "./PlayerStatus/StandStatus1";
import StandStatus2 from "./PlayerStatus/StandStatus2";
import UnEquipStatus from "./PlayerStatus/UnEquipStatus";
import AttackStatus from "./PlayerStatus/AttackStatus";
import JumpStatus from "./PlayerStatus/JumpStatus";
import FallStatus from "./PlayerStatus/FallStatus";
import MoveStatus from "./PlayerStatus/MoveStatus";
import RollingStatus from "./PlayerStatus/RollingStatus";

export enum PlayerActions {
    stand1,
    stand2,
    attack,
    move,
    unEquip,
    jump,
    fallDown,
    rolling
}



export class PlayerStatusMachine {
    mainPlayer: MainPlayer = null;
    spritePlayer: cc.Node = null;

    mapStatusInfo: Map<PlayerActions, RootStatus> = new Map()

    curStatus: RootStatus = null;

    nCurStatusKey: PlayerActions = PlayerActions.stand1;

    constructor(mainPlayer: MainPlayer, spritePlayer: cc.Node) {
        this.mainPlayer = mainPlayer;
        this.spritePlayer = spritePlayer;


        this.mapStatusInfo.set(PlayerActions.stand1, new StandStatus1(this, this.spritePlayer));
        this.mapStatusInfo.set(PlayerActions.stand2, new StandStatus2(this, this.spritePlayer));
        this.mapStatusInfo.set(PlayerActions.unEquip, new UnEquipStatus(this, this.spritePlayer));
        this.mapStatusInfo.set(PlayerActions.attack, new AttackStatus(this, this.spritePlayer));
        this.mapStatusInfo.set(PlayerActions.jump, new JumpStatus(this, this.spritePlayer));
        this.mapStatusInfo.set(PlayerActions.fallDown, new FallStatus(this, this.spritePlayer));
        this.mapStatusInfo.set(PlayerActions.move, new MoveStatus(this, this.spritePlayer));
        this.mapStatusInfo.set(PlayerActions.rolling, new RollingStatus(this, this.spritePlayer));

        this.changeStatus(PlayerActions.stand1);
    }


    getCurStatusKey(): PlayerActions {
        return this.nCurStatusKey
    }

    changeStatus(status: PlayerActions) {
        if (this.curStatus) {
            this.curStatus.onExit();
        }

        let statusNow = this.mapStatusInfo.get(status);
        if (statusNow) {
            this.nCurStatusKey = status;
            this.curStatus = statusNow;
            statusNow.onEnter();
        }
    }


    mUpdate(dt) {
        this.curStatus.onUpdate(dt);
    }
}
