//document.oncontextmenu=()=>{return false;}
//document.onselectstart=()=>{return false;}
setInterval(() => {
    let start_time = new Date();
    debugger;
    if (new Date() - start_time > 50) {
        window.stop();
        document.write("");
        alert("错了,给小弟一个机会！");
    }
}, .1)