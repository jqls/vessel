import {Component, OnInit} from "@angular/core";
import {NavbarService} from "../navbar.service";
import {Router} from "@angular/router";
@Component({
  selector: 'app-algorithm',
  templateUrl: 'algorithm-up.component.html',
  styleUrls: ['algorithm-up.component.css']
})

export class AlgoriithmComponent{
      values='';

       //获取输入框文本
      onkey(event:any){
       
        //Angular把事件对象存入$event变量中，也就是我们传到组件的onKey()方法中的那个。
       //$event.target给了我们一个HTMLInputElement对象，它有一个value属性，是用户所输入的数据
      //this.values=event.target.value;
       alert(event.target.value);
      }
      onsubmit(){
            if(this.values=='')
            {
              alert("名字不能为空！")
            }
            else{
              alert("提交成功！");
            }
           
      }


}