import { Component, Input, OnInit } from '@angular/core';


@Component({
  selector: 'board-game-companion-app-editor-console',
  templateUrl: './editor-console.component.html',
  styleUrls: ['./editor-console.component.scss'],
})
export class EditorConsoleComponent implements OnInit{
  @Input() height = 0;
  @Input() width = 0;
  @Input() margin = 0;
  @Input() bottom = 0;
  messages:string[] = [];
  ngOnInit(): void {
    console.log("editor-tool-bar");   
  }

  print(message:string){
    this.messages.push(message);
  }

  clear(){
    this.messages = [];

  }

  defineConsole(): any{

    const console = (function (windowConsole:any,editorConsole:EditorConsoleComponent){
      return {
        log: function(text:string){
          windowConsole.log(text);
          editorConsole.print(text);
        },
        info: function(strInfo:string){
          windowConsole.info(strInfo);
        },
        warn: function(strWarn:string){
          windowConsole.warn(strWarn);
        },
        error: function(strError:string){
          windowConsole.error(strError);
        },
        print: function(message:string){
          editorConsole.print(message);      
        }
      }
    })(window.console,this);


    return console;
  }

}