import { Component, OnInit } from '@angular/core';
import { ScriptService } from '../../shared/services/scripts/script.service';
import { Router } from '@angular/router';
import { script } from '../../shared/models/script';
import { neuralnetwork } from '../../shared/models/neuralnetwork';
import * as tf from '@tensorflow/tfjs'
@Component({
  selector: 'board-game-companion-app-script-executor',
  templateUrl: './script-executor.component.html',
  styleUrls: ['./script-executor.component.scss'],
})
export class ScriptExecutorComponent implements OnInit {
  current:script;
  code = "";
  replay = false;
  folder = "42a58303-990e-4230-94c6-a9f5dd629500"
  hours = "hours";
  h = 0;
  min = "min";
  m = 0;
  s = 0;
  sec = "sec";

  constructor(private readonly scriptService:ScriptService, private router:Router) {
    this.current = this.router.getCurrentNavigation()?.extras.state?.['value'];
  }

  back()
  {
    //Timer
    if(localStorage.getItem("sessions") !== null)
    {
      let c = JSON.parse(localStorage.getItem("sessions")||"")
      let name = "#" + (c.length + 1);
      c.push(name);
      localStorage.setItem("sessions", JSON.stringify(c))
      let session = []
      session.push("tictactoe10")
      session.push(this.current._id)
      session.push("2")
      session.push("N/A")
      this.hours = this.h + this.hours + " "
      this.min = this.m + this.min + " "
      this.sec = this.s + this.sec 
      session.push(this.hours + this.min + this.sec)
      session.push("Win")
      const now = new Date();
      session.push(now.toLocaleDateString())
      const script = localStorage.getItem(this.current._id)
      if(script != null)
      session.push(script[3])
      localStorage.setItem(name, JSON.stringify(session))
    }
    else
    {
      let c = [];
      let name = "#1";
      c.push(name);
      localStorage.setItem("sessions", JSON.stringify(c))
      let session = []
      session.push("tictactoe10")
      session.push(this.current._id)
      session.push("2")
      session.push("N/A")
      this.hours = this.h + this.hours + " "
      this.min = this.m + this.min + " "
      this.sec = this.s + this.sec
      session.push(this.hours + this.min + this.sec)
      session.push("Win")
      const now = new Date();
      session.push(now.toLocaleDateString())
      const script = localStorage.getItem(this.current._id)
      if(script != null)
      session.push(script[3])
      localStorage.setItem(name, JSON.stringify(session))
    }

    this.router.navigate(['scripts']);
  }
  
  ngOnInit(): void {

    setInterval(() => {
      this.s++
      if(this.s === 60)
      {
        
        this.m++
      }
      if(this.m == 60)
      {
        this.h++
      }
    }, 1000);

      this.scriptService.getFileData(this.current.build.location).subscribe({
        next:(val)=>{
           this.code = val;
           this.play();       
        },
        error:(e)=>{
          console.log(e)
        },
        complete:()=>{
          console.log("complete")
        }  
      })
  }
  async neuralnetworks():Promise<any>{
    
    console.log(name)
    const modelsInfo = localStorage.getItem("models");
    const result = new Object();

    if(modelsInfo === null)
      return null;
    else{
      const networks:neuralnetwork[] = JSON.parse(modelsInfo);
      const models:{name:string,model:tf.LayersModel,min:number[],max:number[],labels:string[]}[] = [];
      
      for(let count = 0; count < networks.length; count++){
        models.push({
          name: networks[count].name,
          model: await tf.loadLayersModel('localstorage://' + networks[count].name),
          min: networks[count].min as number[],
          max: networks[count].max as number[],
          labels: networks[count].labels as string[]
        })
      }

      return ((name:string,input:number[])=>{
        
        console.log(name,input)
        let index = -1;

        for(let count = 0; count < models.length && index === -1; count++){
          if(models[count].name === name)
            index = count;
        }

        if(index === -1)
          return "";

        //console.print(model("color-picker",[0,255,0]))
        const inputTensor = tf.tensor2d(input,[1,input.length]);
        const normalizedInput = inputTensor.sub(models[index].min).div(models[index].max).sub(models[index].min);
        const tensorResult = models[index].model.predict(normalizedInput) as tf.Tensor;
        tensorResult.print();
        index = Array.from(tf.argMax(tensorResult,1).dataSync())[0];
        console.log(index);
        console.log(models[index])
        return models[index].labels[index];
      })

      
    }

    return result;
  }
  async play(): Promise<void>{
    this.replay = false;
    const code = new Function("model",this.code);
    const model =  await this.neuralnetworks();
    code(model);
    this.replay = true;
  }

}
