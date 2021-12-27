
import MainPlayer from "./MainPlayer";
import {GameManager} from "./GameManager";

const {ccclass, property} = cc._decorator;

@ccclass
export default class WorldScene extends cc.Component {

    @property(cc.Camera)
    MainCamera:cc.Camera = null;
    @property(cc.Camera)
    UICamera:cc.Camera = null;

    @property(cc.Node)
    nodeWorldRoot: cc.Node = null;

    @property(cc.Prefab)
    prefabPlayer: cc.Prefab = null;
    nodeMainPlayer: cc.Node = null;

    arrMoveBtnClick:number[] = [];

    nWorldGravity:number = -1;

    protected onLoad()
    {
        GameManager.worldScene = this;

        cc.director.getPhysicsManager().enabled = true;
        cc.director.getPhysicsManager().gravity = cc.v2(0, -520);
    }

    start()
    {
        this.nodeMainPlayer = cc.instantiate(this.prefabPlayer);

        this.nodeWorldRoot.addChild(this.nodeMainPlayer);

        this.arrMoveBtnClick = [];

        this.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this)

        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_DOWN, this.onKeyDown, this)
        cc.systemEvent.on(cc.SystemEvent.EventType.KEY_UP, this.onKeyUp, this)
    }


    onTouchEnd()
    {
        // this.nodeMainPlayer.getComponent(MainPlayer).runAttack();
    }


    onKeyDown(event)
    {
        // cc.log("??????????+" + event.keyCode)
        switch (event.keyCode)
        {
            case cc.macro.KEY.a:
                if(this.arrMoveBtnClick[this.arrMoveBtnClick.length - 1] != event.keyCode)
                {
                    this.nodeMainPlayer.getComponent(MainPlayer).setPlayerInRunning(true);
                    this.nodeMainPlayer.getComponent(MainPlayer).setPlayerFaceRight(false);
                    this.arrMoveBtnClick.push(event.keyCode);
                }
                break;
            case cc.macro.KEY.d:
                if(this.arrMoveBtnClick[this.arrMoveBtnClick.length - 1] != event.keyCode)
                {
                    this.nodeMainPlayer.getComponent(MainPlayer).setPlayerInRunning(true);
                    this.nodeMainPlayer.getComponent(MainPlayer).setPlayerFaceRight(true);
                    this.arrMoveBtnClick.push(event.keyCode);
                }
                break;
            case cc.macro.KEY.j:
                this.nodeMainPlayer.getComponent(MainPlayer).runAttack();
                break;
            case cc.macro.KEY.space:
                this.nodeMainPlayer.getComponent(MainPlayer).runJump();
                break;
            case cc.macro.KEY.k:
                this.nodeMainPlayer.getComponent(MainPlayer).runRolling();
                break;
        }
    }

    onKeyUp(event)
    {
        switch (event.keyCode)
        {
            case cc.macro.KEY.a:
                let aIndex = this.arrMoveBtnClick.indexOf(event.keyCode);
                this.arrMoveBtnClick.splice(aIndex, 1);
                if(this.arrMoveBtnClick.length == 0)
                {
                    this.nodeMainPlayer.getComponent(MainPlayer).setPlayerInRunning(false);
                }
                break;
            case cc.macro.KEY.d:
                let dIndex = this.arrMoveBtnClick.indexOf(event.keyCode);
                this.arrMoveBtnClick.splice(dIndex, 1);
                if(this.arrMoveBtnClick.length == 0)
                {
                    this.nodeMainPlayer.getComponent(MainPlayer).setPlayerInRunning(false);
                }
                break;
            case cc.macro.KEY.j:
                break;
        }
    }

}
