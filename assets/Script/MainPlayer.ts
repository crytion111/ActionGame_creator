import {GameManager} from "./GameManager";
import {PlayerActions, PlayerStatusMachine} from "./StatusSrc/PlayerStatusMachine";
import AttackStatus from "./StatusSrc/PlayerStatus/AttackStatus";


const {ccclass, property} = cc._decorator;

@ccclass
export default class MainPlayer extends cc.Component {

    @property(cc.Node)
    spritePlayer: cc.Node = null;

    rigidbody:cc.RigidBody = null;

    nPlayerAttackLV: number = 1; //攻击段数, 从1-3;

    bPlayerInRunning: boolean = false;


    nCachedPlayerFace:number = 1;


    machineOBJ:PlayerStatusMachine = null;

    // 行走时的速度
    nPlayerRunSpeed:number = 2;
    // 翻滚时的速度
    nPlayerRollSpeed:number = 7;



    onLoad()
    {
        this.rigidbody = this.node.getComponent(cc.RigidBody)
        this.rigidbody.enabledContactListener = true;
    }

    start()
    {

        this.bPlayerInRunning = false;
        this.nPlayerAttackLV = 1;

        this.machineOBJ = new PlayerStatusMachine(this, this.spritePlayer);

        /*
        play：开始播放时
        stop：停止播放时
        pause：暂停播放时
        resume：恢复播放时
        lastframe：假如动画循环次数大于 1，当动画播放到最后一帧时
        finished：动画播放完成时
        */
    }


    // 只在两个碰撞体开始接触时被调用一次
    onBeginContact (contact:cc.PhysicsContact, selfCollider, otherCollider:cc.PhysicsCollider)
    {

        let worldManifold = contact.getWorldManifold();
        let points = worldManifold.points;
        let normal = worldManifold.normal;
        let nOtherTag = otherCollider.tag;

        if((nOtherTag == 3 || nOtherTag == 2) && normal.y < 0)
        {
            if(this.machineOBJ.getCurStatusKey() == PlayerActions.fallDown)
            {
                if (this.bPlayerInRunning)
                {
                    this.machineOBJ.changeStatus(PlayerActions.move);
                }
                else
                {
                    this.machineOBJ.changeStatus(PlayerActions.stand1);
                }
            }
        }


        // 可以从底下穿墙上去
        if(nOtherTag == 2 && normal.y >= 1)
        {
            if(this.machineOBJ.getCurStatusKey() == PlayerActions.jump)
            {
                contact.disabled = true;
            }
        }
    }

    // 只在两个碰撞体结束接触时被调用一次
    onEndContact (contact:cc.PhysicsContact, selfCollider, otherCollider)
    {
    }

    // 每次将要处理碰撞体接触逻辑时被调用
    onPreSolve (contact:cc.PhysicsContact, selfCollider, otherCollider)
    {
    }

    // 每次处理完碰撞体接触逻辑时被调用
    onPostSolve (contact:cc.PhysicsContact, selfCollider, otherCollider)
    {
    }

    runAttack()
    {
        // @ts-ignore
        let curStatus:AttackStatus = this.machineOBJ.curStatus
        if (this.machineOBJ.getCurStatusKey() != PlayerActions.attack
            || !curStatus.bInAttackAnimation)
        {
            this.machineOBJ.changeStatus(PlayerActions.attack)
        }

    }

    runRolling()
    {
        if(this.machineOBJ.getCurStatusKey() != PlayerActions.jump
            && this.machineOBJ.getCurStatusKey() != PlayerActions.fallDown
            && this.machineOBJ.getCurStatusKey() != PlayerActions.rolling)
        {
            this.machineOBJ.changeStatus(PlayerActions.rolling)
            this.nPlayerRunSpeed = this.nPlayerRollSpeed;
        }
    }

    runJump()
    {
        if (this.machineOBJ.getCurStatusKey() == PlayerActions.attack)
        {
            return;
        }
        if(this.machineOBJ.getCurStatusKey() != PlayerActions.jump
            && this.machineOBJ.getCurStatusKey() != PlayerActions.fallDown)
        {
            this.machineOBJ.changeStatus(PlayerActions.jump)

            this.rigidbody.applyLinearImpulse(cc.v2(0, 200), cc.v2(0, 0), true);
        }
    }

    runFallDown()
    {
        if(this.machineOBJ.getCurStatusKey() != PlayerActions.fallDown)
        {
            this.machineOBJ.changeStatus(PlayerActions.fallDown)
        }
    }


    setPlayerInRunning(bRunning: boolean)
    {
        this.bPlayerInRunning = bRunning;
        if (bRunning
            && this.machineOBJ.getCurStatusKey() != PlayerActions.attack
            && this.machineOBJ.getCurStatusKey() != PlayerActions.fallDown
            && this.machineOBJ.getCurStatusKey() != PlayerActions.jump)
        {
            this.machineOBJ.changeStatus(PlayerActions.move);
        }
        else if (!bRunning
            && this.machineOBJ.getCurStatusKey() != PlayerActions.attack
            && this.machineOBJ.getCurStatusKey() != PlayerActions.fallDown
            && this.machineOBJ.getCurStatusKey() != PlayerActions.jump)
        {
            this.machineOBJ.changeStatus(PlayerActions.stand1)
        }
    }

    // 奔跑
    setPlayerFaceRight(bRight: boolean)
    {
        let nScaleX = bRight ? 1 : -1;
        this.nCachedPlayerFace = nScaleX;
    }

    setPlayerFace()
    {
        // 处于攻击动作的话
        if (this.machineOBJ.getCurStatusKey() == PlayerActions.attack)
        {
            return;
        }
        if(this.node.scaleX == this.nCachedPlayerFace)
        {
            return;
        }
        this.node.scaleX = this.nCachedPlayerFace
    }

    update(dt: number)
    {
        if(this.machineOBJ)
            this.machineOBJ.mUpdate(dt);


        this.setPlayerFace();

        if(this.machineOBJ.getCurStatusKey() != PlayerActions.attack && this.bPlayerInRunning)
        {
            let scaleX = this.node.scaleX;
            this.node.x += (scaleX==1) ? this.nPlayerRunSpeed : -this.nPlayerRunSpeed;
        }

        GameManager.worldScene.MainCamera.node.x = this.node.x;
    }
}
