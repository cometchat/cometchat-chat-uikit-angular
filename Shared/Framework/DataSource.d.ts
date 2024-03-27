import { CometChatActionsView, CometChatMessageComposerAction, CometChatMessageOption, CometChatMessageTemplate, CometChatTheme, MentionsTargetElement } from "@cometchat/uikit-resources";
import { ComposerId } from "../Utils/MessageUtils";
import { AIOptionsStyle, CometChatMentionsTextFormatter, CometChatTextFormatter, CometChatUrlTextFormatter } from "@cometchat/uikit-shared";
export declare abstract class DataSource {
    abstract getTextMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatMessageOption>;
    abstract getImageMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatMessageOption>;
    abstract getVideoMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatMessageOption>;
    abstract getAudioMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatMessageOption>;
    abstract getFileMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatMessageOption>;
    abstract getTextMessageTemplate(): CometChatMessageTemplate;
    abstract getImageMessageTemplate(): CometChatMessageTemplate;
    abstract getVideoMessageTemplate(): CometChatMessageTemplate;
    abstract getAudioMessageTemplate(): CometChatMessageTemplate;
    abstract getFileMessageTemplate(): CometChatMessageTemplate;
    abstract getFormMessageTemplate(): CometChatMessageTemplate;
    abstract getCardMessageTemplate(): CometChatMessageTemplate;
    abstract getGroupActionTemplate(): CometChatMessageTemplate;
    abstract getSchedulerMessageTemplate(): CometChatMessageTemplate;
    abstract getAllMessageTemplates(theme?: CometChatTheme): Array<CometChatMessageTemplate>;
    abstract getMessageTemplate(messageType: string, messageCategory: string): CometChatMessageTemplate | null;
    abstract getMessageOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatMessageOption>;
    abstract getCommonOptions(loggedInUser: CometChat.User, messageObject: CometChat.BaseMessage, theme: CometChatTheme, group?: CometChat.Group): Array<CometChatMessageOption>;
    abstract getAttachmentOptions(theme?: CometChatTheme, user?: CometChat.User, group?: CometChat.Group, id?: ComposerId): any;
    abstract getAllMessageTypes(): Array<string>;
    abstract getAllMessageCategories(): Array<string>;
    abstract getAuxiliaryOptions(id: ComposerId, user?: CometChat.User, group?: CometChat.Group): any;
    abstract getId(): string;
    abstract getLastConversationMessage(conversation: CometChat.Conversation, loggedInUser: CometChat.User, additionalParams?: any): string;
    abstract getDeleteOption(theme: CometChatTheme): CometChatMessageOption;
    abstract getReplyInThreadOption(theme: CometChatTheme): CometChatMessageOption;
    abstract getEditOption(theme: CometChatTheme): CometChatMessageOption;
    abstract getAIOptions(theme: CometChatTheme, id?: Map<String, any>, aiOptionsStyles?: AIOptionsStyle): (CometChatMessageComposerAction | CometChatActionsView)[];
    abstract getAllTextFormatters(formatterParams: any): CometChatTextFormatter[];
    abstract getMentionsTextFormatter(formatterParams: any): CometChatMentionsTextFormatter;
    abstract getUrlTextFormatter(formatterParams: any): CometChatUrlTextFormatter;
    abstract getMentionsFormattedText(message: CometChat.TextMessage, subtitle: string, mentionsFormatterParams: {
        mentionsTargetElement: MentionsTargetElement;
        theme: CometChatTheme;
    }): string;
}