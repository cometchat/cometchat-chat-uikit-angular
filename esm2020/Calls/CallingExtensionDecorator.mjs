import { CometChat } from "@cometchat/chat-sdk-javascript";
import { CometChatUIKitConstants, CometChatMessageTemplate, localize, } from "@cometchat/uikit-resources";
import { CallingDetailsUtils, } from "@cometchat/uikit-shared";
import { ChatConfigurator } from "../Shared/Framework/ChatConfigurator";
import { DataSourceDecorator } from "../Shared/Framework/DataSourceDecorator";
export class CallingExtensionDecorator extends DataSourceDecorator {
    constructor(dataSource) {
        super(dataSource);
        this.onLogout();
    }
    // end active call when user logs out
    onLogout() {
        var listenerID = "logout_listener";
        CometChat.addLoginListener(listenerID, new CometChat.LoginListener({
            logoutSuccess: () => {
                let call = CometChat.getActiveCall();
                if (call) {
                    CometChat.endCall(call.getSessionId());
                }
                else {
                    return;
                }
            },
            logoutFailure: (error) => {
                console.log("LoginListener :: logoutFailure", error);
            },
        }));
    }
    getAllMessageTypes() {
        const types = super.getAllMessageTypes();
        if (!types.includes(CometChatUIKitConstants.calls.meeting)) {
            types.push(CometChatUIKitConstants.calls.meeting);
        }
        if (!types.includes(CometChatUIKitConstants.MessageTypes.audio)) {
            types.push(CometChatUIKitConstants.MessageTypes.audio);
        }
        if (!types.includes(CometChatUIKitConstants.MessageTypes.video)) {
            types.push(CometChatUIKitConstants.MessageTypes.video);
        }
        return types;
    }
    getId() {
        return "calling";
    }
    getAllMessageCategories() {
        const categories = super.getAllMessageCategories();
        if (!categories.includes(CometChatUIKitConstants.MessageCategory.call)) {
            categories.push(CometChatUIKitConstants.MessageCategory.call);
        }
        if (!categories.includes(CometChatUIKitConstants.MessageCategory.custom)) {
            categories.push(CometChatUIKitConstants.MessageCategory.custom);
        }
        return categories;
    }
    checkIfTemplateTypeExist(template, type) {
        return template.some((obj) => obj.type === type);
    }
    checkIfTemplateCategoryExist(template, category) {
        return template.some((obj) => obj.category === category);
    }
    getAllMessageTemplates() {
        const templates = super.getAllMessageTemplates();
        if (!this.checkIfTemplateTypeExist(templates, CometChatUIKitConstants.calls.meeting)) {
            templates.push(this.getDirectCallTemplate());
        }
        if (!this.checkIfTemplateCategoryExist(templates, CometChatUIKitConstants.MessageCategory.call)) {
            templates.push(...this.getDefaultCallTemplate());
        }
        return templates;
    }
    getDirectCallTemplate() {
        return new CometChatMessageTemplate({
            type: CometChatUIKitConstants.calls.meeting,
            category: CometChatUIKitConstants.MessageCategory.custom,
            options: (loggedInUser, messageObject, theme, group) => {
                return ChatConfigurator.getDataSource().getCommonOptions(loggedInUser, messageObject, theme, group);
            },
        });
    }
    getDefaultCallTemplate() {
        let templates = [
            new CometChatMessageTemplate({
                type: CometChatUIKitConstants.MessageTypes.audio,
                category: CometChatUIKitConstants.MessageCategory.call,
            }),
            new CometChatMessageTemplate({
                type: CometChatUIKitConstants.MessageTypes.video,
                category: CometChatUIKitConstants.MessageCategory.call,
            }),
        ];
        return templates;
    }
    getLastConversationMessage(conversation, loggedInUser, additionalParams) {
        let actionMessage = "";
        if (conversation.getLastMessage() &&
            conversation.getLastMessage().category ==
                CometChatUIKitConstants.MessageCategory.call) {
            let call = conversation.getLastMessage();
            actionMessage = CallingDetailsUtils.getCallStatus(call, loggedInUser);
        }
        else if (conversation?.getLastMessage() &&
            conversation.getLastMessage().type ==
                CometChatUIKitConstants.calls.meeting) {
            let message = conversation.getLastMessage();
            if (!message.getSender() ||
                message?.getSender()?.getUid() == loggedInUser.getUid()) {
                actionMessage = localize("YOU_INITIATED_GROUP_CALL");
            }
            else {
                actionMessage = `${message.getSender().getName()}  ${localize("INITIATED_GROUP_CALL")}`;
            }
            let messageObject = conversation.getLastMessage();
            if (messageObject &&
                messageObject.getMentionedUsers().length &&
                messageObject instanceof CometChat.TextMessage &&
                additionalParams &&
                !additionalParams.disableMentions) {
                actionMessage = this.getMentionsFormattedText(messageObject, actionMessage, additionalParams);
            }
        }
        else {
            actionMessage = super.getLastConversationMessage(conversation, loggedInUser, additionalParams);
        }
        return actionMessage;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsbGluZ0V4dGVuc2lvbkRlY29yYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3Byb2plY3RzL2NoYXQtdWlraXQtYW5ndWxhci9zcmMvQ2FsbHMvQ2FsbGluZ0V4dGVuc2lvbkRlY29yYXRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLEVBQUUsU0FBUyxFQUFFLE1BQU0sZ0NBQWdDLENBQUM7QUFDM0QsT0FBTyxFQUNMLHVCQUF1QixFQUN2Qix3QkFBd0IsRUFHeEIsUUFBUSxHQUVULE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxFQUNMLG1CQUFtQixHQUdwQixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLHNDQUFzQyxDQUFDO0FBRXhFLE9BQU8sRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlDQUF5QyxDQUFDO0FBRzlFLE1BQU0sT0FBTyx5QkFBMEIsU0FBUSxtQkFBbUI7SUFDaEUsWUFBWSxVQUFzQjtRQUNoQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDbEIsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDO0lBQ2xCLENBQUM7SUFDRCxxQ0FBcUM7SUFDckMsUUFBUTtRQUNOLElBQUksVUFBVSxHQUFXLGlCQUFpQixDQUFDO1FBQzNDLFNBQVMsQ0FBQyxnQkFBZ0IsQ0FDeEIsVUFBVSxFQUNWLElBQUksU0FBUyxDQUFDLGFBQWEsQ0FBQztZQUMxQixhQUFhLEVBQUUsR0FBRyxFQUFFO2dCQUNsQixJQUFJLElBQUksR0FBbUIsU0FBUyxDQUFDLGFBQWEsRUFBRSxDQUFDO2dCQUNyRCxJQUFJLElBQUksRUFBRTtvQkFDUixTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQyxDQUFDO2lCQUN4QztxQkFBTTtvQkFDTCxPQUFPO2lCQUNSO1lBQ0gsQ0FBQztZQUNELGFBQWEsRUFBRSxDQUFDLEtBQW1DLEVBQUUsRUFB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RSxDQUFDLElBQUk7Z0JBQ2hDLHVCQUF1QixDQUFDLEtBQUssQ0FBQyxPQUFPLEVBQ3ZDO1lBQ0EsSUFBSSxPQUFPLEdBQTRCLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNyRSxJQUNFLENBQUMsT0FBTyxDQUFDLFNBQVMsRUFBRTtnQkFDcEIsT0FBTyxFQUFFLFNBQVMsRUFBRSxFQUFFLE1BQU0sRUFBRSxJQUFJLFlBQVksQ0FBQyxNQUFNLEVBQUUsRUFDdkQ7Z0JBQ0EsYUFBYSxHQUFHLFFBQVEsQ0FBQywwQkFBMEIsQ0FBQyxDQUFDO2FBQ3REO2lCQUFNO2dCQUNMLGFBQWEsR0FBRyxHQUFHLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQyxPQUFPLEVBQUUsS0FBSyxRQUFRLENBQzNELHNCQUFzQixDQUN2QixFQUFFLENBQUM7YUFDTDtZQUVELElBQUksYUFBYSxHQUFHLFlBQVksQ0FBQyxjQUFjLEVBQUUsQ0FBQztZQUNsRCxJQUNFLGFBQWE7Z0JBQ2IsYUFBYSxDQUFDLGlCQUFpQixFQUFFLENBQUMsTUFBTTtnQkFDeEMsYUFBYSxZQUFZLFNBQVMsQ0FBQyxXQUFXO2dCQUM5QyxnQkFBZ0I7Z0JBQ2hCLENBQUMsZ0JBQWdCLENBQUMsZUFBZSxFQUNqQztnQkFDQSxhQUFhLEdBQUcsSUFBSSxDQUFDLHdCQUF3QixDQUMzQyxhQUFhLEVBQ2IsYUFBYSxFQUNiLGdCQUFnQixDQUNqQixDQUFDO2FBQ0g7U0FDRjthQUFNO1lBQ0wsYUFBYSxHQUFHLEtBQUssQ0FBQywwQkFBMEIsQ0FDOUMsWUFBWSxFQUNaLFlBQVksRUFDWixnQkFBZ0IsQ0FDakIsQ0FBQztTQUNIO1FBQ0QsT0FBTyxhQUFhLENBQUM7SUFDdkIsQ0FBQztDQUNGIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29tZXRDaGF0IH0gZnJvbSBcIkBjb21ldGNoYXQvY2hhdC1zZGstamF2YXNjcmlwdFwiO1xuaW1wb3J0IHtcbiAgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMsXG4gIENvbWV0Q2hhdE1lc3NhZ2VUZW1wbGF0ZSxcbiAgQ29tZXRDaGF0VGhlbWUsXG4gIENvbWV0Q2hhdE1lc3NhZ2VDb21wb3NlckFjdGlvbixcbiAgbG9jYWxpemUsXG4gIGZvbnRIZWxwZXIsXG59IGZyb20gXCJAY29tZXRjaGF0L3Vpa2l0LXJlc291cmNlc1wiO1xuaW1wb3J0IHtcbiAgQ2FsbGluZ0RldGFpbHNVdGlscyxcbiAgQ29sbGFib3JhdGl2ZURvY3VtZW50Q29uZmlndXJhdGlvbixcbiAgQ29sbGFib3JhdGl2ZURvY3VtZW50Q29uc3RhbnRzLFxufSBmcm9tIFwiQGNvbWV0Y2hhdC91aWtpdC1zaGFyZWRcIjtcbmltcG9ydCB7IENoYXRDb25maWd1cmF0b3IgfSBmcm9tIFwiLi4vU2hhcmVkL0ZyYW1ld29yay9DaGF0Q29uZmlndXJhdG9yXCI7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSBcIi4uL1NoYXJlZC9GcmFtZXdvcmsvRGF0YVNvdXJjZVwiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZURlY29yYXRvciB9IGZyb20gXCIuLi9TaGFyZWQvRnJhbWV3b3JrL0RhdGFTb3VyY2VEZWNvcmF0b3JcIjtcbmltcG9ydCB7fSBmcm9tIFwiQGNvbWV0Y2hhdC91aWtpdC1zaGFyZWRcIjtcblxuZXhwb3J0IGNsYXNzIENhbGxpbmdFeHRlbnNpb25EZWNvcmF0b3IgZXh0ZW5kcyBEYXRhU291cmNlRGVjb3JhdG9yIHtcbiAgY29uc3RydWN0b3IoZGF0YVNvdXJjZTogRGF0YVNvdXJjZSkge1xuICAgIHN1cGVyKGRhdGFTb3VyY2UpO1xuICAgIHRoaXMub25Mb2dvdXQoKTtcbiAgfVxuICAvLyBlbmQgYWN0aXZlIGNhbGwgd2hlbiB1c2VyIGxvZ3Mgb3V0XG4gIG9uTG9nb3V0KCkge1xuICAgIHZhciBsaXN0ZW5lcklEOiBzdHJpbmcgPSBcImxvZ291dF9saXN0ZW5lclwiO1xuICAgIENvbWV0Q2hhdC5hZGRMb2dpbkxpc3RlbmVyKFxuICAgICAgbGlzdGVuZXJJRCxcbiAgICAgIG5ldyBDb21ldENoYXQuTG9naW5MaXN0ZW5lcih7XG4gICAgICAgIGxvZ291dFN1Y2Nlc3M6ICgpID0+IHtcbiAgICAgICAgICBsZXQgY2FsbDogQ29tZXRDaGF0LkNhbGwgPSBDb21ldENoYXQuZ2V0QWN0aXZlQ2FsbCgpO1xuICAgICAgICAgIGlmIChjYWxsKSB7XG4gICAgICAgICAgICBDb21ldENoYXQuZW5kQ2FsbChjYWxsLmdldFNlc3Npb25JZCgpKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSxcbiAgICAgICAgbG9nb3V0RmFpbHVyZTogKGVycm9yOiBDb21ldENoYXQuQ29tZXRDaGF0RXhjZXB0aW9uKSA9PiB7XG4gICAgICAgICAgY29uc29sZS5sb2coXCJMb2dpbkxpc3RlbmVyIDo6IGxvZ291dEZhaWx1cmVcIiwgZXJyb3IpO1xuICAgICAgICB9LFxuICAgICAgfSlcbiAgICApO1xuICB9XG4gIG92ZXJyaWRlIGdldEFsbE1lc3NhZ2VUeXBlcygpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgdHlwZXMgPSBzdXBlci5nZXRBbGxNZXNzYWdlVHlwZXMoKTtcbiAgICBpZiAoIXR5cGVzLmluY2x1ZGVzKENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLmNhbGxzLm1lZXRpbmcpKSB7XG4gICAgICB0eXBlcy5wdXNoKENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLmNhbGxzLm1lZXRpbmcpO1xuICAgIH1cbiAgICBpZiAoIXR5cGVzLmluY2x1ZGVzKENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VUeXBlcy5hdWRpbykpIHtcbiAgICAgIHR5cGVzLnB1c2goQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZVR5cGVzLmF1ZGlvKTtcbiAgICB9XG4gICAgaWYgKCF0eXBlcy5pbmNsdWRlcyhDb21ldENoYXRVSUtpdENvbnN0YW50cy5NZXNzYWdlVHlwZXMudmlkZW8pKSB7XG4gICAgICB0eXBlcy5wdXNoKENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VUeXBlcy52aWRlbyk7XG4gICAgfVxuICAgIHJldHVybiB0eXBlcztcbiAgfVxuICBvdmVycmlkZSBnZXRJZCgpOiBzdHJpbmcge1xuICAgIHJldHVybiBcImNhbGxpbmdcIjtcbiAgfVxuICBvdmVycmlkZSBnZXRBbGxNZXNzYWdlQ2F0ZWdvcmllcygpOiBzdHJpbmdbXSB7XG4gICAgY29uc3QgY2F0ZWdvcmllcyA9IHN1cGVyLmdldEFsbE1lc3NhZ2VDYXRlZ29yaWVzKCk7XG4gICAgaWYgKCFjYXRlZ29yaWVzLmluY2x1ZGVzKENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VDYXRlZ29yeS5jYWxsKSkge1xuICAgICAgY2F0ZWdvcmllcy5wdXNoKENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VDYXRlZ29yeS5jYWxsKTtcbiAgICB9XG4gICAgaWYgKCFjYXRlZ29yaWVzLmluY2x1ZGVzKENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VDYXRlZ29yeS5jdXN0b20pKSB7XG4gICAgICBjYXRlZ29yaWVzLnB1c2goQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZUNhdGVnb3J5LmN1c3RvbSk7XG4gICAgfVxuICAgIHJldHVybiBjYXRlZ29yaWVzO1xuICB9XG4gIGNoZWNrSWZUZW1wbGF0ZVR5cGVFeGlzdChcbiAgICB0ZW1wbGF0ZTogQ29tZXRDaGF0TWVzc2FnZVRlbXBsYXRlW10sXG4gICAgdHlwZTogc3RyaW5nXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5zb21lKChvYmopID0+IG9iai50eXBlID09PSB0eXBlKTtcbiAgfVxuICBjaGVja0lmVGVtcGxhdGVDYXRlZ29yeUV4aXN0KFxuICAgIHRlbXBsYXRlOiBDb21ldENoYXRNZXNzYWdlVGVtcGxhdGVbXSxcbiAgICBjYXRlZ29yeTogc3RyaW5nXG4gICk6IGJvb2xlYW4ge1xuICAgIHJldHVybiB0ZW1wbGF0ZS5zb21lKChvYmopID0+IG9iai5jYXRlZ29yeSA9PT0gY2F0ZWdvcnkpO1xuICB9XG4gIG92ZXJyaWRlIGdldEFsbE1lc3NhZ2VUZW1wbGF0ZXMoKTogQ29tZXRDaGF0TWVzc2FnZVRlbXBsYXRlW10ge1xuICAgIGNvbnN0IHRlbXBsYXRlcyA9IHN1cGVyLmdldEFsbE1lc3NhZ2VUZW1wbGF0ZXMoKTtcbiAgICBpZiAoXG4gICAgICAhdGhpcy5jaGVja0lmVGVtcGxhdGVUeXBlRXhpc3QoXG4gICAgICAgIHRlbXBsYXRlcyxcbiAgICAgICAgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuY2FsbHMubWVldGluZ1xuICAgICAgKVxuICAgICkge1xuICAgICAgdGVtcGxhdGVzLnB1c2godGhpcy5nZXREaXJlY3RDYWxsVGVtcGxhdGUoKSk7XG4gICAgfVxuICAgIGlmIChcbiAgICAgICF0aGlzLmNoZWNrSWZUZW1wbGF0ZUNhdGVnb3J5RXhpc3QoXG4gICAgICAgIHRlbXBsYXRlcyxcbiAgICAgICAgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZUNhdGVnb3J5LmNhbGxcbiAgICAgIClcbiAgICApIHtcbiAgICAgIHRlbXBsYXRlcy5wdXNoKC4uLnRoaXMuZ2V0RGVmYXVsdENhbGxUZW1wbGF0ZSgpKTtcbiAgICB9XG4gICAgcmV0dXJuIHRlbXBsYXRlcztcbiAgfVxuICBnZXREaXJlY3RDYWxsVGVtcGxhdGUoKTogQ29tZXRDaGF0TWVzc2FnZVRlbXBsYXRlIHtcbiAgICByZXR1cm4gbmV3IENvbWV0Q2hhdE1lc3NhZ2VUZW1wbGF0ZSh7XG4gICAgICB0eXBlOiBDb21ldENoYXRVSUtpdENvbnN0YW50cy5jYWxscy5tZWV0aW5nLFxuICAgICAgY2F0ZWdvcnk6IENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VDYXRlZ29yeS5jdXN0b20sXG4gICAgICBvcHRpb25zOiAoXG4gICAgICAgIGxvZ2dlZEluVXNlcjogQ29tZXRDaGF0LlVzZXIsXG4gICAgICAgIG1lc3NhZ2VPYmplY3Q6IENvbWV0Q2hhdC5CYXNlTWVzc2FnZSxcbiAgICAgICAgdGhlbWU6IENvbWV0Q2hhdFRoZW1lLFxuICAgICAgICBncm91cD86IENvbWV0Q2hhdC5Hcm91cFxuICAgICAgKSA9PiB7XG4gICAgICAgIHJldHVybiBDaGF0Q29uZmlndXJhdG9yLmdldERhdGFTb3VyY2UoKS5nZXRDb21tb25PcHRpb25zKFxuICAgICAgICAgIGxvZ2dlZEluVXNlcixcbiAgICAgICAgICBtZXNzYWdlT2JqZWN0LFxuICAgICAgICAgIHRoZW1lLFxuICAgICAgICAgIGdyb3VwXG4gICAgICAgICk7XG4gICAgICB9LFxuICAgIH0pO1xuICB9XG4gIGdldERlZmF1bHRDYWxsVGVtcGxhdGUoKTogQ29tZXRDaGF0TWVzc2FnZVRlbXBsYXRlW10ge1xuICAgIGxldCB0ZW1wbGF0ZXM6IENvbWV0Q2hhdE1lc3NhZ2VUZW1wbGF0ZVtdID0gW1xuICAgICAgbmV3IENvbWV0Q2hhdE1lc3NhZ2VUZW1wbGF0ZSh7XG4gICAgICAgIHR5cGU6IENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VUeXBlcy5hdWRpbyxcbiAgICAgICAgY2F0ZWdvcnk6IENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VDYXRlZ29yeS5jYWxsLFxuICAgICAgfSksXG4gICAgICBuZXcgQ29tZXRDaGF0TWVzc2FnZVRlbXBsYXRlKHtcbiAgICAgICAgdHlwZTogQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZVR5cGVzLnZpZGVvLFxuICAgICAgICBjYXRlZ29yeTogQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuTWVzc2FnZUNhdGVnb3J5LmNhbGwsXG4gICAgICB9KSxcbiAgICBdO1xuICAgIHJldHVybiB0ZW1wbGF0ZXM7XG4gIH1cbiAgcHVibGljIG92ZXJyaWRlIGdldExhc3RDb252ZXJzYXRpb25NZXNzYWdlKFxuICAgIGNvbnZlcnNhdGlvbjogQ29tZXRDaGF0LkNvbnZlcnNhdGlvbixcbiAgICBsb2dnZWRJblVzZXI6IENvbWV0Q2hhdC5Vc2VyLFxuICAgIGFkZGl0aW9uYWxQYXJhbXM/OiBhbnlcbiAgKTogc3RyaW5nIHtcbiAgICBsZXQgYWN0aW9uTWVzc2FnZTogc3RyaW5nID0gXCJcIjtcblxuICAgIGlmIChcbiAgICAgIGNvbnZlcnNhdGlvbi5nZXRMYXN0TWVzc2FnZSgpICYmXG4gICAgICBjb252ZXJzYXRpb24uZ2V0TGFzdE1lc3NhZ2UoKS5jYXRlZ29yeSA9PVxuICAgICAgICBDb21ldENoYXRVSUtpdENvbnN0YW50cy5NZXNzYWdlQ2F0ZWdvcnkuY2FsbFxuICAgICkge1xuICAgICAgbGV0IGNhbGw6IENvbWV0Q2hhdC5DYWxsID0gY29udmVyc2F0aW9uLmdldExhc3RNZXNzYWdlKCk7XG5cbiAgICAgIGFjdGlvbk1lc3NhZ2UgPSBDYWxsaW5nRGV0YWlsc1V0aWxzLmdldENhbGxTdGF0dXMoY2FsbCwgbG9nZ2VkSW5Vc2VyKTtcbiAgICB9IGVsc2UgaWYgKFxuICAgICAgY29udmVyc2F0aW9uPy5nZXRMYXN0TWVzc2FnZSgpICYmXG4gICAgICBjb252ZXJzYXRpb24uZ2V0TGFzdE1lc3NhZ2UoKS50eXBlID09XG4gICAgICAgIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLmNhbGxzLm1lZXRpbmdcbiAgICApIHtcbiAgICAgIGxldCBtZXNzYWdlOiBDb21ldENoYXQuQ3VzdG9tTWVzc2FnZSA9IGNvbnZlcnNhdGlvbi5nZXRMYXN0TWVzc2FnZSgpO1xuICAgICAgaWYgKFxuICAgICAgICAhbWVzc2FnZS5nZXRTZW5kZXIoKSB8fFxuICAgICAgICBtZXNzYWdlPy5nZXRTZW5kZXIoKT8uZ2V0VWlkKCkgPT0gbG9nZ2VkSW5Vc2VyLmdldFVpZCgpXG4gICAgICApIHtcbiAgICAgICAgYWN0aW9uTWVzc2FnZSA9IGxvY2FsaXplKFwiWU9VX0lOSVRJQVRFRF9HUk9VUF9DQUxMXCIpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgYWN0aW9uTWVzc2FnZSA9IGAke21lc3NhZ2UuZ2V0U2VuZGVyKCkuZ2V0TmFtZSgpfSAgJHtsb2NhbGl6ZShcbiAgICAgICAgICBcIklOSVRJQVRFRF9HUk9VUF9DQUxMXCJcbiAgICAgICAgKX1gO1xuICAgICAgfVxuXG4gICAgICBsZXQgbWVzc2FnZU9iamVjdCA9IGNvbnZlcnNhdGlvbi5nZXRMYXN0TWVzc2FnZSgpO1xuICAgICAgaWYgKFxuICAgICAgICBtZXNzYWdlT2JqZWN0ICYmXG4gICAgICAgIG1lc3NhZ2VPYmplY3QuZ2V0TWVudGlvbmVkVXNlcnMoKS5sZW5ndGggJiZcbiAgICAgICAgbWVzc2FnZU9iamVjdCBpbnN0YW5jZW9mIENvbWV0Q2hhdC5UZXh0TWVzc2FnZSAmJlxuICAgICAgICBhZGRpdGlvbmFsUGFyYW1zICYmXG4gICAgICAgICFhZGRpdGlvbmFsUGFyYW1zLmRpc2FibGVNZW50aW9uc1xuICAgICAgKSB7XG4gICAgICAgIGFjdGlvbk1lc3NhZ2UgPSB0aGlzLmdldE1lbnRpb25zRm9ybWF0dGVkVGV4dChcbiAgICAgICAgICBtZXNzYWdlT2JqZWN0LFxuICAgICAgICAgIGFjdGlvbk1lc3NhZ2UsXG4gICAgICAgICAgYWRkaXRpb25hbFBhcmFtc1xuICAgICAgICApO1xuICAgICAgfVxuICAgIH0gZWxzZSB7XG4gICAgICBhY3Rpb25NZXNzYWdlID0gc3VwZXIuZ2V0TGFzdENvbnZlcnNhdGlvbk1lc3NhZ2UoXG4gICAgICAgIGNvbnZlcnNhdGlvbixcbiAgICAgICAgbG9nZ2VkSW5Vc2VyLFxuICAgICAgICBhZGRpdGlvbmFsUGFyYW1zXG4gICAgICApO1xuICAgIH1cbiAgICByZXR1cm4gYWN0aW9uTWVzc2FnZTtcbiAgfVxufVxuIl19