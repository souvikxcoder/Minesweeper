const $board=$('#board');
var visited={};
var marked={};
let d=new Date();
let t=d.getTime();
window.oncontextmenu = function(event) {
    event.preventDefault();
    event.stopPropagation();
    return false;
};
function checkBoard()
{
    if(Object.keys(visited).length==90 && Object.keys(marked).length==10)
    {
        setTimeout(()=>{
            d=new Date();
            var sec=Math.floor((d.getTime()-t)/1000);
            var min=0;
            if(sec>=60)
            {
                min=Math.floor(sec/60);
                sec=sec%60;
            }
            alert("You won\nYour Time: "+ min +" min "+sec+" sec");
            window.location.reload();
            },500);
    }
}
function floodFill(i,j)
{
    var key=[i,j];
    if(visited[key])
        return;
    var q=[];
    q.push(key);
    while(q.length)
    {
        var size=q.length;
        var $cell,flag=0;
        while(size--)
        {
            flag=0;
            var key2=q.shift();
            var x=key2[0];
            var y=key2[1];
            if(!(x<ROW && y<COL && x>=0 && y>=0) || visited[[x,y]]==true)
                continue;
            if(x+1<ROW && y+1<COL && x+1>=0 && y+1>=0)
            {
                $cell=$(`.col[data-row=${x+1}][data-col=${y+1}]`);
                if($cell.hasClass('mine'))
                    flag++;                  
            }
            if(x+1<ROW && y<COL && x+1>=0 && y>=0)
            {
                $cell=$(`.col[data-row=${x+1}][data-col=${y}]`);
                if($cell.hasClass('mine'))
                    flag++;
            }
            if(x+1<ROW && y-1<COL && x+1>=0 && y-1>=0)
            {
                $cell=$(`.col[data-row=${x+1}][data-col=${y-1}]`);
                if($cell.hasClass('mine'))
                    flag++;
            }
            if(x<ROW && y+1<COL && x>=0 && y+1>=0)
            {
                $cell=$(`.col[data-row=${x}][data-col=${y+1}]`);
                if($cell.hasClass('mine'))
                    flag++;
            }
            if(x<ROW && y-1<COL && x>=0 && y-1>=0)
            {
                $cell=$(`.col[data-row=${x}][data-col=${y-1}]`);
                if($cell.hasClass('mine'))
                    flag++;
            }
            if(x-1<ROW && y+1<COL && x-1>=0 && y+1>=0)
            {
                $cell=$(`.col[data-row=${x-1}][data-col=${y+1}]`);
                if($cell.hasClass('mine'))
                    flag++;
            }
            if(x-1<ROW && y<COL && x-1>=0 && y>=0)
            {
                $cell=$(`.col[data-row=${x-1}][data-col=${y}]`);
                if($cell.hasClass('mine'))
                    flag++;
            }
            if(x-1<ROW && y-1<COL && x-1>=0 && y-1>=0)
            {
                $cell=$(`.col[data-row=${x-1}][data-col=${y-1}]`);
                if($cell.hasClass('mine'))
                    flag++;
            }
            $cell=$(`.col[data-row=${x}][data-col=${y}]`);
            if(flag!=0)
            {
                $cell.append($("<td></td>").text(flag));
                $cell.css("background-color","violet");
            }
            else
            {
                $cell.css("background-color","aqua");
                if(visited[[x+1,y]]!=true)
                    q.push([x+1,y]);
                if(visited[[x,y+1]]!=true)
                    q.push([x,y+1]);
                if(visited[[x,y-1]]!=true)
                    q.push([x,y-1]);
                if(visited[[x-1,y]]!=true)
                    q.push([x-1,y]);
                if(visited[[x+1,y+1]]!=true)
                    q.push([x+1,y+1]);
                if(visited[[x-1,y+1]]!=true)
                    q.push([x-1,y+1]);
                if(visited[[x+1,y-1]]!=true)
                    q.push([x+1,y-1]);
                if(visited[[x-1,y-1]]!=true)
                    q.push([x-1,y-1]);
                
            }
            visited[[x,y]]=true;
            if(marked[[x,y]]==true)
                delete marked[[x,y]];
        }
    }
    
}
function gameOver()
{
    alert("Game Over");
    location.reload();
}
function createBoard(r,c){
    var set=new Set();
    while(set.size!=mineNo)
    {
        var x=Math.floor(Math.random()*100);
        set.add(x);
    }
    for(let i=0;i<r;i++)
    {
        const $row=$('<div>').addClass('row');
        for(let j=0;j<c;j++)
        {
            const $col=$('<div>').addClass('col');
            $row.append($col);
            $col.attr('data-row',i).attr('data-col',j);
            var key=i*10+j;
            if(set.has(key))
                $col.addClass('mine');
        }
        $board.append($row);
    }
}
const ROW=10,COL=10,mineNo=10;
createBoard(ROW,COL);
$board.ready(function(){
    $('.col').mousedown(function(event) {
        var $cell=$(this);
        var row=$cell.data('row');
        var col=$cell.data('col');
        switch (event.which) {
            case 1:
                if($cell.hasClass('mine'))
                {
                    $('.mine').css('background-color','red');
                    setTimeout(()=>gameOver(),500);
                }
                else
                {
                    floodFill(row,col); 
                    checkBoard(); 
                }  
                break;
            case 3:
                if(marked[[row,col]]!=true && visited[[row,col]]!=true)
                {
                    $(this).css('background-color','brown');
                    marked[[row,col]]=true;
                }
                else if(marked[[row,col]]==true)
                {
                    delete marked[[row,col]];
                    $(this).css('background-color','blueviolet');
                }
                break;
    }
 })
})
