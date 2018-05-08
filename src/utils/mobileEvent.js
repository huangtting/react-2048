export default function swipeDetect(el,callback){
    let startX,startY,distX,distY,dir;
    const minDis=75;

    el.addEventListener('touchstart',e=>{
        const touchObj= e.changedTouches[0];
        startX=touchObj.pageX;
        startY=touchObj.pageY;
        e.preventDefault();
    },false);

    el.addEventListener('touchmove',e=>{
        e.preventDefault();
    })

    el.addEventListener('touchend',e=>{ 
        const touchObj=e.changedTouches[0];

        distX=touchObj.pageX-startX;
        distY=touchObj.pageY-startY;

        if(Math.abs(distX)>minDis)
        {
            dir=distX>0?'right':'left';
        }
        else if(Math.abs(distY)>minDis){
            dir=distY>0?'down':'up';
        }

        callback(dir);
        e.preventDefault();
    })
}