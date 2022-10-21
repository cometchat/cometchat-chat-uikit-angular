import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { CometChatConversationsComponent } from "./cometchat-conversations/cometchat-conversations.component";
import { CometChatConversationList } from "../CometChatConversationList/cometchat-conversation-list.module";
import { CometChatListBase } from "../../Shared/UtilityComponents/CometChatListBase/cometchat-list-base.module";
@NgModule({
  declarations: [CometChatConversationsComponent],
  imports: [
    CommonModule,
    CometChatConversationList,
    CometChatListBase,
  ],
  exports: [CometChatConversationsComponent],
})
export class CometChatConversation {}
