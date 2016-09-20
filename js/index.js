window.onload=function(){
  var yingyueku=[
  {name:'依然爱你',src:'002.mp3',geshou:'王力宏',duration:'0:47'},
  {name:'五环之歌',src:'009.mp3',geshou:'岳云鹏',duration:'0:43'},
  {name:'北京北京',src:'008.mp3',geshou:'邓紫棋',duration:'0:34'},
  {name:'泡沫',src:'001.mp3',geshou:'邓紫棋',duration:'0:25'}
  ]
  var currentsongindex;
  var LIEBIAO=3,SHUNXU=2,DANQU=1,SUIJI=4;

  var currentbofangmoshi=LIEBIAO;
  var createList=function(){
     var el='';
     for (var i = 0; i < yingyueku.length; i++) {
        el+='<li mid="j0"class=""data-index="'+i+'"><strong class="music_name"title="'+yingyueku[i].name+'">'+yingyueku[i].name+'</strong><strong class="singer_name"title="'+yingyueku[i].geshou+'">'+yingyueku[i].geshou+'</strong><strong class="play_time">'+yingyueku[i].duration+'</strong><div class="list_cp"><strong class="btn_like" title="喜欢" name="myfav_0038RM350w8m1V" mid="0038RM350w8m1V"><span>我喜欢</span></strong><strong class="btn_share" title="分享"><span>分享</span></strong><strong class="btn_fav" title="收藏到歌单"><span>收藏</span></strong><strong class="btn_del" title="从列表中删除"><span>删除</span></strong></div></li>';
    };
    divsonglist.firstElementChild.innerHTML=el;
    spansongnum1.innerHTML='<span>'+yingyueku.length+'</span>';

    var lis=divsonglist.firstElementChild.children;
    for(var i=0;i<lis.length;i++){
  lis[i].index=i;
  lis[i].onclick=function(){
    audio.src=yingyueku[this.index].src ;
    currentsongindex=this.index;
    audio.play();
    onsongchange();
            // audio.src=this,getAttirbute('data-src');
            // audio.play();
            // for(var i=0;i<lis.length;i++){
            //  lis[i].classList.remove('play_current');
            // }
            // this.classList.add('play_current');

    }
    lis[i].onmouseover=function(){
        this.classList.add('play_hover');
    }
    lis[i].onmouseout=function(){
        this.classList.remove('play_hover');
    }
    };

    var des=document.querySelectorAll('.btn_del');
    for(var i=0;i<des.length;i++){
        des[i].index=i;
        des[i].onclick=function(e){
          e.stopPropagation();
          var newarr=[];
          for(var i=0;i<yingyueku.length;i++){
            if(yingyueku[this.index]!=yingyueku[i]){
                newarr.push(yingyueku[i]);
            }else{

            }
          }
          yingyueku=newarr;
          if(this.index<currentsongindex){
            currentsongindex-=1;
          }
          // var that=this;
          // yingyueku=yingyueku.filter(function(){
          //   return yingyueku[that_index];
          // });
          createList();
          if(this.index==currentsongindex){
            if(currentsongindex==yingyueku.length){
                audio.src='';
                uireset();
            }else if(this.index!=currentsongindex){
                audio.src=yingyueku[currentsongindex].src;
                audio.play();
                onsongchange();
            }
          }
        }
    }
}
createList();
    var lis=divsonglist.firstElementChild.children;

    //清空列表
    clear_list.onclick=function(){
      yingyueku=[];
      createList();
      uireset();
  }
  var uireset=function(){
      document.querySelector('.music_name').innerHTML="<span>听我想听的歌</span>";
      document.querySelector('.singer_name').innerHTML="qq音乐";
      ptime.innerHTML="";
      document.querySelector('.music_op').style.display="none";
      audio.src="";
      spanvolumebar.style.width=0+"%";
      spanvolumeop.style.left=0+"%";
      btnplay.className="play_bt";
  }


  var onsongchange=function(){
      for(var i=0;i<lis.length;i++){
         lis[i].classList.remove('play_current');
     };
     lis[currentsongindex].classList.add('play_current');
     var cu=yingyueku[currentsongindex];
     document.querySelector('.music_name').innerHTML=cu.name;
     document.querySelector('.singer_name').innerHTML=cu.geshou;
     document.querySelector('.play_date').innerHTML=cu.duration;
     document.querySelector('.music_op').style.display="block";
      //document.querySelector('#ptime').innerHTML=cu.duration;
  }






	// var zhuanghuan=function(time){
 //    	var min=parseInt(time/60);
 //    	var sec=parseInt(time%60);
 //    	min=(min<10)?('0'+min):min;
 //    	sec=(sec<10)?('0'+sec):sec;
 //        return min+':'+sec;
 //    }
 //    qiege.onclick=function(){
 //    	audio.src="./010.mp3";
 //    	audio.play();
 //    }
 //*******************切换歌曲
 document.querySelector('.next_bt').onclick=nextSong;
 document.querySelector('.prev_bt').onclick=nextSong;

//上、下一首
var nextSong=function(){
  if(currentsongindex==undefined)return;
  currentsongindex+=1;
  currentsongindex=(currentsongindex==yingyueku.length)?0:currentsongindex;
  audio.src=yingyueku[currentsongindex].src;
  audio.play();
  onsongchange();
}
var prevSong=function(){
  if(currentsongindex==undefined)return;
  currentsongindex-=1;
  currentsongindex=(currentsongindex==-1)?yingyueku.length-1:currentsongindex;
  audio.src=yingyueku[currentsongindex].src;
  audio.play();
  onsongchange();
}

document.querySelector('.next_bt').onclick=nextSong;
document.querySelector('.prev_bt').onclick=prevSong;

//***************************模式切换
btnPlayway.onclick=function(){
  divselect.style.display="block";
}
setbofangmoshi=function(num){
  currentbofangmoshi=num;
  divselect.style.display='none';
  var data={1:'cycle_single_bt',2:'ordered_bt',3:'cycle_bt',4:'unordered_bt'};
  btnPlayway.className=data[num];
};




    //****************进度条的前进与后退
document.querySelector('.player_bar').onclick=function(ev){
  audio.currentTime=ev.offsetX/this.offsetWidth*audio.duration;
}
spanprogress_op.onclick=function(ev){
  ev.stopPropagation();
}
audio.ontimeupdate=function(){
  spanplaybar.style.width=this.currentTime/this.duration*100+'%';
  spanprogress_op.style.left=this.currentTime/this.duration*100+'%';

  if(audio.ended){
    if(currentbofangmoshi==DANQU){
      audio.play();
    }else if(currentbofangmoshi==LIEBIAO){
      nextSong();
    }else if(currentbofangmoshi==SUIJI){
      randomSong();
    }else if(currentbofangmoshi==SHUNXU){
      if(currentsongindex==yingyueku.length){
        nextSong();
      }
    }
  }
}
var randomSong=function(){
  currentsongindex=Math.floor(Math.random()*yingyueku.length);
  audio.src=yingyueku[currentsongindex].src;
  audio.play();
  onsongchange();
}
//******************音量的处理
//静音处理
spanmute.onclick=(function(){
   var oldvolume;

   return function(){
      if(audio.volume!=0){
         oldvolume=audio.volume;
         audio.volume=0;

     }else{
         audio.volume=oldvolume;

     }

 }
})();
    //音量控制
    spanvolume.onclick=function(ev){
    	var v=ev.offsetX/this.offsetWidth;
    	audio.volume=v;
    }
    spanvolumeop.onclick=function(ev){
      ev.stopPropagation();
    }
  audio.onvolumechange=function(){
   if(audio.volume===0){
      spanmute.className="volume_mute";
  }else{
      spanmute.className="volume_icon";
  }
  spanvolumeop.style.left=audio.volume*100+"%";
  spanvolumebar.style.width=audio.volume*100+"%";
  }
    
    //*********************播放暂停与开始函数
   	//事件分开写
   	btnplay.onclick=function(){
   		if(audio.paused){
   			audio.play();
   			//this.style.background='green';
   		}else{
   			audio.pause();
   			//this.style.background='red';
   		}
   	}
   	audio.onplay=function(){
   		btnplay.className="pause_bt";
   	}
   	audio.onpause=function(){
   		btnplay.className="play_bt";
   	}

    var flag=true;
    btnfold.onclick=function(){
      if(flag){
        divplayframe.style.display="none";
        animate(divplayer,{left:-540},500,Tween.Linear);
        //divplayer.style.left="-540px";
        divplayer.classList.add("m_player_folded");
        flag=false;
      }else{
        animate(divplayer,{left:0},500,Tween.Linear);
        //divplayer.style.left="0px";
        divplayer.classList.remove("m_player_folded");
        flag=true;
      }
      
    }
    var flag1=true;
    spansongnum1.onclick=function(){
      if(flag1){
        divplayframe.style.display="none";
        flag1=false;
      }else{
        divplayframe.style.display="block";
        flag1=true;
      }
    }




}