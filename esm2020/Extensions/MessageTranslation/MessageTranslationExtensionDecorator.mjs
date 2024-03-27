import { CometChatMessageOption, CometChatUIKitConstants, fontHelper, localize } from "@cometchat/uikit-resources";
import { DataSourceDecorator } from "../../Shared/Framework/DataSourceDecorator";
export class MessageTranslationExtensionDecorator extends DataSourceDecorator {
    constructor(dataSource) {
        super(dataSource);
    }
    getTextMessageOptions(loggedInUser, messageObject, theme, group) {
        let options = super.getTextMessageOptions(loggedInUser, messageObject, theme, group);
        if (!this.checkIfOptionExist(options, CometChatUIKitConstants.MessageOption.translateMessage)) {
            let newOption = new CometChatMessageOption({
                id: CometChatUIKitConstants.MessageOption.translateMessage,
                title: localize("TRANSLATE_MESSAGE"),
                iconURL: "assets/translation.svg",
                onClick: null,
                iconTint: theme.palette.getAccent600(),
                backgroundColor: "transparent",
                titleFont: fontHelper(theme.typography.subtitle1),
                titleColor: theme.palette.getAccent600()
            });
            options.push(newOption);
        }
        return options;
    }
    checkIfOptionExist(template, id) {
        return template.some(obj => obj.id === id);
    }
    getId() {
        return "messagetranslation";
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWVzc2FnZVRyYW5zbGF0aW9uRXh0ZW5zaW9uRGVjb3JhdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2hhdC11aWtpdC1hbmd1bGFyL3NyYy9FeHRlbnNpb25zL01lc3NhZ2VUcmFuc2xhdGlvbi9NZXNzYWdlVHJhbnNsYXRpb25FeHRlbnNpb25EZWNvcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQ0EsT0FBTyxFQUFrQixzQkFBc0IsRUFBRSx1QkFBdUIsRUFBRSxVQUFVLEVBQUUsUUFBUSxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFFbkksT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0sNENBQTRDLENBQUM7QUFDakYsTUFBTSxPQUFPLG9DQUFxQyxTQUFRLG1CQUFtQjtJQUMzRSxZQUFZLFVBQXFCO1FBQy9CLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQTtJQUVuQixDQUFDO0lBQ2MscUJBQXFCLENBQUMsWUFBNEIsRUFBRSxhQUFvQyxFQUFFLEtBQXFCLEVBQUUsS0FBdUI7UUFDcEosSUFBSSxPQUFPLEdBQTRCLEtBQUssQ0FBQyxxQkFBcUIsQ0FBQyxZQUFZLEVBQUMsYUFBYSxFQUFDLEtBQUssRUFBQyxLQUFLLENBQUMsQ0FBQTtRQUMxRyxJQUFHLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLE9BQU8sRUFBRSx1QkFBdUIsQ0FBQyxhQUFhLENBQUMsZ0JBQWdCLENBQUMsRUFBQztZQUM1RixJQUFJLFNBQVMsR0FBMEIsSUFBSSxzQkFBc0IsQ0FBQztnQkFDaEUsRUFBRSxFQUFDLHVCQUF1QixDQUFDLGFBQWEsQ0FBQyxnQkFBZ0I7Z0JBQ3pELEtBQUssRUFBRSxRQUFRLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3BDLE9BQU8sRUFBRSx3QkFBd0I7Z0JBQ2pDLE9BQU8sRUFBRSxJQUFJO2dCQUNiLFFBQVEsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTtnQkFDdEMsZUFBZSxFQUFFLGFBQWE7Z0JBQzlCLFNBQVMsRUFBRSxVQUFVLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBQ2pELFVBQVUsRUFBRSxLQUFLLENBQUMsT0FBTyxDQUFDLFlBQVksRUFBRTthQUN6QyxDQUFDLENBQUE7WUFDRixPQUFPLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1NBQ3ZCO1FBR0MsT0FBTyxPQUFPLENBQUE7SUFFcEIsQ0FBQztJQUNDLGtCQUFrQixDQUFDLFFBQWlDLEVBQUUsRUFBUztRQUMxRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLENBQUMsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFBO0lBQzVDLENBQUM7SUFDSSxLQUFLO1FBQ1osT0FBTyxvQkFBb0IsQ0FBQztJQUM5QixDQUFDO0NBQ0YiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC9jaGF0LXNkay1qYXZhc2NyaXB0XCI7XG5pbXBvcnQgeyBDb21ldENoYXRUaGVtZSwgQ29tZXRDaGF0TWVzc2FnZU9wdGlvbiwgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMsIGZvbnRIZWxwZXIsIGxvY2FsaXplIH0gZnJvbSBcIkBjb21ldGNoYXQvdWlraXQtcmVzb3VyY2VzXCI7XG5pbXBvcnQgeyBEYXRhU291cmNlIH0gZnJvbSBcIi4uLy4uL1NoYXJlZC9GcmFtZXdvcmsvRGF0YVNvdXJjZVwiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZURlY29yYXRvciB9IGZyb20gXCIuLi8uLi9TaGFyZWQvRnJhbWV3b3JrL0RhdGFTb3VyY2VEZWNvcmF0b3JcIjtcbmV4cG9ydCBjbGFzcyBNZXNzYWdlVHJhbnNsYXRpb25FeHRlbnNpb25EZWNvcmF0b3IgZXh0ZW5kcyBEYXRhU291cmNlRGVjb3JhdG9yIHtcbiAgY29uc3RydWN0b3IoZGF0YVNvdXJjZTpEYXRhU291cmNlKXtcbiAgICBzdXBlcihkYXRhU291cmNlKVxuXG4gIH1cbiBwdWJsaWMgb3ZlcnJpZGUgZ2V0VGV4dE1lc3NhZ2VPcHRpb25zKGxvZ2dlZEluVXNlcjogQ29tZXRDaGF0LlVzZXIsIG1lc3NhZ2VPYmplY3Q6IENvbWV0Q2hhdC5CYXNlTWVzc2FnZSwgdGhlbWU6IENvbWV0Q2hhdFRoZW1lLCBncm91cD86IENvbWV0Q2hhdC5Hcm91cCk6IENvbWV0Q2hhdE1lc3NhZ2VPcHRpb25bXSB7XG4gICAgIGxldCBvcHRpb25zOkNvbWV0Q2hhdE1lc3NhZ2VPcHRpb25bXSA9IHN1cGVyLmdldFRleHRNZXNzYWdlT3B0aW9ucyhsb2dnZWRJblVzZXIsbWVzc2FnZU9iamVjdCx0aGVtZSxncm91cClcbiAgICAgaWYoIXRoaXMuY2hlY2tJZk9wdGlvbkV4aXN0KG9wdGlvbnMsIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLk1lc3NhZ2VPcHRpb24udHJhbnNsYXRlTWVzc2FnZSkpe1xuICAgICAgbGV0IG5ld09wdGlvbjpDb21ldENoYXRNZXNzYWdlT3B0aW9uID0gbmV3IENvbWV0Q2hhdE1lc3NhZ2VPcHRpb24oe1xuICAgICAgICBpZDpDb21ldENoYXRVSUtpdENvbnN0YW50cy5NZXNzYWdlT3B0aW9uLnRyYW5zbGF0ZU1lc3NhZ2UsXG4gICAgICAgIHRpdGxlOiBsb2NhbGl6ZShcIlRSQU5TTEFURV9NRVNTQUdFXCIpLFxuICAgICAgICBpY29uVVJMOiBcImFzc2V0cy90cmFuc2xhdGlvbi5zdmdcIixcbiAgICAgICAgb25DbGljazogbnVsbCxcbiAgICAgICAgaWNvblRpbnQ6IHRoZW1lLnBhbGV0dGUuZ2V0QWNjZW50NjAwKCksXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJ0cmFuc3BhcmVudFwiLFxuICAgICAgICB0aXRsZUZvbnQ6IGZvbnRIZWxwZXIodGhlbWUudHlwb2dyYXBoeS5zdWJ0aXRsZTEpLFxuICAgICAgICB0aXRsZUNvbG9yOiB0aGVtZS5wYWxldHRlLmdldEFjY2VudDYwMCgpXG4gICAgICB9KVxuICAgICAgb3B0aW9ucy5wdXNoKG5ld09wdGlvbilcbiAgICAgfVxuXG5cbiAgICAgICByZXR1cm4gb3B0aW9uc1xuXG4gfVxuICAgY2hlY2tJZk9wdGlvbkV4aXN0KHRlbXBsYXRlOkNvbWV0Q2hhdE1lc3NhZ2VPcHRpb25bXSwgaWQ6c3RyaW5nKTpib29sZWFue1xuICAgICAgICByZXR1cm4gdGVtcGxhdGUuc29tZShvYmogPT4gb2JqLmlkID09PSBpZClcbiAgICAgIH1cbiAgb3ZlcnJpZGUgZ2V0SWQoKTogc3RyaW5nIHtcbiAgICByZXR1cm4gXCJtZXNzYWdldHJhbnNsYXRpb25cIjtcbiAgfVxufVxuIl19