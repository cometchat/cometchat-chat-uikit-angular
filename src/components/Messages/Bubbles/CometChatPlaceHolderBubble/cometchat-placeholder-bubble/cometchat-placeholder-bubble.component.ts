import { Component, Input, OnInit, OnChanges, SimpleChanges } from "@angular/core";
import { CometChat } from "@cometchat-pro/chat";
import { placeHolderStyles, styles } from "../../styles";
@Component({
  selector: 'cometchat-placeholder-bubble',
  templateUrl: './cometchat-placeholder-bubble.component.html',
  styleUrls: ['./cometchat-placeholder-bubble.component.scss']
})
export class CometChatPlaceholderBubbleComponent implements OnInit,OnChanges {
  @Input() messageObject!: CometChat.BaseMessage;
  @Input() text: string = "";
  @Input() style:placeHolderStyles = {
    width: "",
    height: "",
    background: "",
    textFont: "",
    textColor: "",
  };
  public placeholder:string = ""
  constructor() {
  }
  ngOnChanges(changes: SimpleChanges): void {
  }
  ngOnInit(): void {
    if(this.text){
      this.placeholder = this.text;
    }
    else{
      this.placeholder = this.messageObject.getType() + " is not supported "
    }
  }
  getTextStyling(){
    return {
      font:this.style.textFont,
      color:this.style.textColor
    }
  }
}