/*
*   结构与花费的资源对应表
*/
const structure = {
    'MOVE': 50,
    'WORK': 100,
    'CARRY': 50,
    'ATTACK': 80,
    'RANGED_ATTACK': 150,
    'HEAL': 250,
    'CLAIM': 600,
    'TOUGH': 10
}

/*
*   根据给定的配置返回特定的结构列表
*   当 cfg.pure 参数为 True 时
*       提供一个MOVE，无CARRY，剩下为WORK
*   当 cfg.pure 参数为 False 时
*       提供一个 CARRY 尽可能提供多的 WORK 与其匹配的 MOVE
*       其中 MOVE 为 ceil( (CARRY + len(WORK)) / 2 )
*   后期注意：当 harvester 作为 pure creeper 创建时，其 memory 中的 pure 为真
*/
const spawn = function(cfg: harvester_cfg)
{
    var body = Array();
    if(cfg. pure)
    {   
        body.push('MOVE')
        var work_num = Math.floor( (cfg.energy - structure['MOVE']) / structure['WORK'] );
        for(let i = 0; i < work_num; i++)
        {
            body.push('WORK')
        }
    }
    else
    {
        body.push('CARRY')
        var work_move_num = Math.floor( (cfg.energy - structure['CARRY']) / (structure['WORK'] + structure['MOVE']));
        for(let i = 0; i < work_move_num; i++)
        {
            body.push('WORK')
            body.push('MOVE')
        }
        if((cfg.energy - structure['CARRY']) % (structure['WORK'] + structure['MOVE']) >= structure['MOVE'])
        {
            body.push('MOVE')
        }
    }

    return body
}

/*
*   用于定义收获者(harvester)的生成、运行
*/
export const role_harvester = {
    'spawn': spawn,
    'run': NaN
}
