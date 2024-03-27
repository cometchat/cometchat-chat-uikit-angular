import { CometChatCallDetailsOption, CometChatCallDetailsTemplate, fontHelper, } from "@cometchat/uikit-resources";
export class CallDetailUtils {
    static getDefaultCallTemplate(callLog, loggedInUser, theme) {
        return [
            this.getPrimaryDetailsTemplate(callLog, loggedInUser, theme),
            this.getSecondaryDetailsTemplate(callLog, loggedInUser, theme),
        ];
    }
    static getPrimaryDetailsTemplate(callLog, loggedInUser, theme) {
        const template = new CometChatCallDetailsTemplate({
            id: "callControls",
            hideSectionSeparator: true,
            sectionSeparatorColor: "red",
            options: (user, group) => {
                return this.getPrimaryOptions(user ?? undefined, group ?? undefined, callLog ?? undefined, loggedInUser ?? undefined, theme ?? undefined);
            },
        });
        return template;
    }
    static getPrimaryOptions(user, group, callLog, loggedInUser, theme) {
        const options = [];
        if (user) {
            options.push(new CometChatCallDetailsOption({
                id: "calls",
            }));
        }
        options.push(new CometChatCallDetailsOption({
            id: "callStatus",
            title: callLog?.getInitiatedAt(),
            titleFont: fontHelper(theme.typography.subtitle1),
            backgroundColor: "rgba(20, 20, 20, 0.04)",
        }));
        return options;
    }
    static getSecondaryDetailsTemplate(callLog, loggedInUser, theme) {
        const template = new CometChatCallDetailsTemplate({
            id: "callOptions",
            hideSectionSeparator: true,
            options: () => {
                return this.getSecondaryOptions(callLog ?? undefined, theme ?? undefined);
            },
        });
        return template;
    }
    static getSecondaryOptions(callLog, theme) {
        const options = [];
        const localizedParticipants = "Participants";
        const localizedRecording = "Recordings";
        const localizedHistory = "History";
        options.push(new CometChatCallDetailsOption({
            id: "participants",
            title: localizedParticipants,
            tail: callLog.participants.length,
            backgroundColor: "rgba(20, 20, 20, 0.04)",
        }));
        if (callLog?.hasRecording) {
            options.push(new CometChatCallDetailsOption({
                id: "recordings",
                title: localizedRecording,
                tail: callLog.recordings.length,
                backgroundColor: "rgba(20, 20, 20, 0.04)",
            }));
        }
        options.push(new CometChatCallDetailsOption({
            id: "callHistory",
            title: localizedHistory,
            backgroundColor: "rgba(20, 20, 20, 0.04)",
        }));
        return options;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsbERldGFpbFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2hhdC11aWtpdC1hbmd1bGFyL3NyYy9TaGFyZWQvVXRpbHMvQ2FsbERldGFpbFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUNBLE9BQU8sRUFDTCwwQkFBMEIsRUFDMUIsNEJBQTRCLEVBSzVCLFVBQVUsR0FFWCxNQUFNLDRCQUE0QixDQUFDO0FBSXBDLE1BQU0sT0FBTyxlQUFlO0lBQ25CLE1BQU0sQ0FBQyxzQkFBc0IsQ0FDbEMsT0FBWSxFQUNaLFlBQTRCLEVBQzVCLEtBQXFCO1FBRXJCLE9BQU87WUFDTCxJQUFJLENBQUMseUJBQXlCLENBQUMsT0FBTyxFQUFFLFlBQVksRUFBRSxLQUFLLENBQUM7WUFDNUQsSUFBSSxDQUFDLDJCQUEyQixDQUFDLE9BQU8sRUFBRSxZQUFZLEVBQUUsS0FBSyxDQUFDO1NBQy9ELENBQUM7SUFDSixDQUFDO0lBRU0sTUFBTSxDQUFDLHlCQUF5QixDQUNyQyxPQUFZLEVBQ1osWUFBNEIsRUFDNUIsS0FBcUI7UUFFckIsTUFBTSxRQUFRLEdBQ1osSUFBSSw0QkFBNEIsQ0FBQztZQUMvQixFQUFFLEVBQUUsY0FBYztZQUNsQixvQkFBb0IsRUFBRSxJQUFJO1lBQzFCLHFCQUFxQixFQUFFLEtBQUs7WUFDNUIsT0FBTyxFQUFFLENBQ1AsSUFBMkIsRUFDM0IsS0FBNkIsRUFDN0IsRUFBRTtnQkFDRixPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FDM0IsSUFBSSxJQUFJLFNBQVMsRUFDakIsS0FBSyxJQUFJLFNBQVMsRUFDbEIsT0FBTyxJQUFJLFNBQVMsRUFDcEIsWUFBWSxJQUFJLFNBQVMsRUFDekIsS0FBSyxJQUFJLFNBQVMsQ0FDbkIsQ0FBQztZQUNKLENBQUM7U0FDRixDQUFDLENBQUM7UUFDTCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sTUFBTSxDQUFDLGlCQUFpQixDQUM5QixJQUFxQixFQUNyQixLQUF1QixFQUN2QixPQUFhLEVBQ2IsWUFBNkIsRUFDN0IsS0FBc0I7UUFFdEIsTUFBTSxPQUFPLEdBQWlDLEVBQUUsQ0FBQztRQUNqRCxJQUFJLElBQUksRUFBRTtZQUNSLE9BQU8sQ0FBQyxJQUFJLENBQ1YsSUFBSSwwQkFBMEIsQ0FBQztnQkFDN0IsRUFBRSxFQUFFLE9BQU87YUFDWixDQUFDLENBQ0gsQ0FBQztTQUNIO1FBQ0QsT0FBTyxDQUFDLElBQUksQ0FDVixJQUFJLDBCQUEwQixDQUFDO1lBQzdCLEVBQUUsRUFBRSxZQUFZO1lBQ2hCLEtBQUssRUFBRSxPQUFPLEVBQUUsY0FBYyxFQUFHO1lBQ2pDLFNBQVMsRUFBRSxVQUFVLENBQUMsS0FBTSxDQUFDLFVBQVUsQ0FBQyxTQUFTLENBQUM7WUFDbEQsZUFBZSxFQUFFLHdCQUF3QjtTQUMxQyxDQUFDLENBQ0gsQ0FBQztRQUNGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7SUFFTSxNQUFNLENBQUMsMkJBQTJCLENBQ3ZDLE9BQVksRUFDWixZQUE0QixFQUM1QixLQUFxQjtRQUVyQixNQUFNLFFBQVEsR0FDWixJQUFJLDRCQUE0QixDQUFDO1lBQy9CLEVBQUUsRUFBRSxhQUFhO1lBQ2pCLG9CQUFvQixFQUFFLElBQUk7WUFDMUIsT0FBTyxFQUFFLEdBQUcsRUFBRTtnQkFDWixPQUFPLElBQUksQ0FBQyxtQkFBbUIsQ0FDN0IsT0FBTyxJQUFJLFNBQVMsRUFDcEIsS0FBSyxJQUFJLFNBQVMsQ0FDbkIsQ0FBQztZQUNKLENBQUM7U0FDRixDQUFDLENBQUM7UUFDTCxPQUFPLFFBQVEsQ0FBQztJQUNsQixDQUFDO0lBRU8sTUFBTSxDQUFDLG1CQUFtQixDQUNoQyxPQUFhLEVBQ2IsS0FBc0I7UUFFdEIsTUFBTSxPQUFPLEdBQWlDLEVBQUUsQ0FBQztRQUNqRCxNQUFNLHFCQUFxQixHQUFHLGNBQWMsQ0FBQztRQUM3QyxNQUFNLGtCQUFrQixHQUFHLFlBQVksQ0FBQztRQUN4QyxNQUFNLGdCQUFnQixHQUFHLFNBQVMsQ0FBQztRQUVuQyxPQUFPLENBQUMsSUFBSSxDQUNWLElBQUksMEJBQTBCLENBQUM7WUFDN0IsRUFBRSxFQUFFLGNBQWM7WUFDbEIsS0FBSyxFQUFFLHFCQUFxQjtZQUM1QixJQUFJLEVBQUUsT0FBTyxDQUFDLFlBQVksQ0FBQyxNQUFNO1lBQ2pDLGVBQWUsRUFBRSx3QkFBd0I7U0FDMUMsQ0FBQyxDQUNILENBQUM7UUFDRixJQUFJLE9BQU8sRUFBRSxZQUFZLEVBQUU7WUFDekIsT0FBTyxDQUFDLElBQUksQ0FDVixJQUFJLDBCQUEwQixDQUFDO2dCQUM3QixFQUFFLEVBQUUsWUFBWTtnQkFDaEIsS0FBSyxFQUFFLGtCQUFrQjtnQkFDekIsSUFBSSxFQUFFLE9BQU8sQ0FBQyxVQUFVLENBQUMsTUFBTTtnQkFDL0IsZUFBZSxFQUFFLHdCQUF3QjthQUMxQyxDQUFDLENBQ0gsQ0FBQztTQUNIO1FBRUQsT0FBTyxDQUFDLElBQUksQ0FDVixJQUFJLDBCQUEwQixDQUFDO1lBQzdCLEVBQUUsRUFBRSxhQUFhO1lBQ2pCLEtBQUssRUFBRSxnQkFBZ0I7WUFDdkIsZUFBZSxFQUFFLHdCQUF3QjtTQUMxQyxDQUFDLENBQ0gsQ0FBQztRQUVGLE9BQU8sT0FBTyxDQUFDO0lBQ2pCLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbWV0Q2hhdENhbGxCdXR0b25zIH0gZnJvbSBcIi4vLi4vLi4vQ2FsbHMvQ29tZXRDaGF0Q2FsbEJ1dHRvbnMvY29tZXRjaGF0LWNhbGwtYnV0dG9ucy5tb2R1bGVcIjtcbmltcG9ydCB7XG4gIENvbWV0Q2hhdENhbGxEZXRhaWxzT3B0aW9uLFxuICBDb21ldENoYXRDYWxsRGV0YWlsc1RlbXBsYXRlLFxuICBDb21ldENoYXREZXRhaWxzVGVtcGxhdGUsXG4gIENvbWV0Q2hhdFRoZW1lLFxuICBDb21ldENoYXRVSUtpdENvbnN0YW50cyxcbiAgRGF0ZVBhdHRlcm5zLFxuICBmb250SGVscGVyLFxuICBsb2NhbGl6ZSxcbn0gZnJvbSBcIkBjb21ldGNoYXQvdWlraXQtcmVzb3VyY2VzXCI7XG5pbXBvcnQgeyBEYXRlU3R5bGUsIExpc3RJdGVtU3R5bGUgfSBmcm9tIFwiQGNvbWV0Y2hhdC91aWtpdC1lbGVtZW50c1wiO1xuaW1wb3J0IHsgRGF0YVNvdXJjZSB9IGZyb20gXCIuLi9GcmFtZXdvcmsvRGF0YVNvdXJjZVwiO1xuXG5leHBvcnQgY2xhc3MgQ2FsbERldGFpbFV0aWxzIHtcbiAgcHVibGljIHN0YXRpYyBnZXREZWZhdWx0Q2FsbFRlbXBsYXRlKFxuICAgIGNhbGxMb2c6IGFueSxcbiAgICBsb2dnZWRJblVzZXI6IENvbWV0Q2hhdC5Vc2VyLFxuICAgIHRoZW1lOiBDb21ldENoYXRUaGVtZVxuICApOiBBcnJheTxDb21ldENoYXRDYWxsRGV0YWlsc1RlbXBsYXRlPiB7XG4gICAgcmV0dXJuIFtcbiAgICAgIHRoaXMuZ2V0UHJpbWFyeURldGFpbHNUZW1wbGF0ZShjYWxsTG9nLCBsb2dnZWRJblVzZXIsIHRoZW1lKSxcbiAgICAgIHRoaXMuZ2V0U2Vjb25kYXJ5RGV0YWlsc1RlbXBsYXRlKGNhbGxMb2csIGxvZ2dlZEluVXNlciwgdGhlbWUpLFxuICAgIF07XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFByaW1hcnlEZXRhaWxzVGVtcGxhdGUoXG4gICAgY2FsbExvZzogYW55LFxuICAgIGxvZ2dlZEluVXNlcjogQ29tZXRDaGF0LlVzZXIsXG4gICAgdGhlbWU6IENvbWV0Q2hhdFRoZW1lXG4gICk6IENvbWV0Q2hhdENhbGxEZXRhaWxzVGVtcGxhdGUge1xuICAgIGNvbnN0IHRlbXBsYXRlOiBDb21ldENoYXRDYWxsRGV0YWlsc1RlbXBsYXRlID1cbiAgICAgIG5ldyBDb21ldENoYXRDYWxsRGV0YWlsc1RlbXBsYXRlKHtcbiAgICAgICAgaWQ6IFwiY2FsbENvbnRyb2xzXCIsXG4gICAgICAgIGhpZGVTZWN0aW9uU2VwYXJhdG9yOiB0cnVlLFxuICAgICAgICBzZWN0aW9uU2VwYXJhdG9yQ29sb3I6IFwicmVkXCIsXG4gICAgICAgIG9wdGlvbnM6IChcbiAgICAgICAgICB1c2VyOiBDb21ldENoYXQuVXNlciB8IG51bGwsXG4gICAgICAgICAgZ3JvdXA6IENvbWV0Q2hhdC5Hcm91cCB8IG51bGxcbiAgICAgICAgKSA9PiB7XG4gICAgICAgICAgcmV0dXJuIHRoaXMuZ2V0UHJpbWFyeU9wdGlvbnMoXG4gICAgICAgICAgICB1c2VyID8/IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGdyb3VwID8/IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIGNhbGxMb2cgPz8gdW5kZWZpbmVkLFxuICAgICAgICAgICAgbG9nZ2VkSW5Vc2VyID8/IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoZW1lID8/IHVuZGVmaW5lZFxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRQcmltYXJ5T3B0aW9ucyhcbiAgICB1c2VyPzogQ29tZXRDaGF0LlVzZXIsXG4gICAgZ3JvdXA/OiBDb21ldENoYXQuR3JvdXAsXG4gICAgY2FsbExvZz86IGFueSxcbiAgICBsb2dnZWRJblVzZXI/OiBDb21ldENoYXQuVXNlcixcbiAgICB0aGVtZT86IENvbWV0Q2hhdFRoZW1lXG4gICk6IENvbWV0Q2hhdENhbGxEZXRhaWxzT3B0aW9uW10ge1xuICAgIGNvbnN0IG9wdGlvbnM6IENvbWV0Q2hhdENhbGxEZXRhaWxzT3B0aW9uW10gPSBbXTtcbiAgICBpZiAodXNlcikge1xuICAgICAgb3B0aW9ucy5wdXNoKFxuICAgICAgICBuZXcgQ29tZXRDaGF0Q2FsbERldGFpbHNPcHRpb24oe1xuICAgICAgICAgIGlkOiBcImNhbGxzXCIsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cbiAgICBvcHRpb25zLnB1c2goXG4gICAgICBuZXcgQ29tZXRDaGF0Q2FsbERldGFpbHNPcHRpb24oe1xuICAgICAgICBpZDogXCJjYWxsU3RhdHVzXCIsXG4gICAgICAgIHRpdGxlOiBjYWxsTG9nPy5nZXRJbml0aWF0ZWRBdCgpISxcbiAgICAgICAgdGl0bGVGb250OiBmb250SGVscGVyKHRoZW1lIS50eXBvZ3JhcGh5LnN1YnRpdGxlMSksXG4gICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDIwLCAyMCwgMjAsIDAuMDQpXCIsXG4gICAgICB9KVxuICAgICk7XG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cblxuICBwdWJsaWMgc3RhdGljIGdldFNlY29uZGFyeURldGFpbHNUZW1wbGF0ZShcbiAgICBjYWxsTG9nOiBhbnksXG4gICAgbG9nZ2VkSW5Vc2VyOiBDb21ldENoYXQuVXNlcixcbiAgICB0aGVtZTogQ29tZXRDaGF0VGhlbWVcbiAgKTogQ29tZXRDaGF0Q2FsbERldGFpbHNUZW1wbGF0ZSB7XG4gICAgY29uc3QgdGVtcGxhdGU6IENvbWV0Q2hhdENhbGxEZXRhaWxzVGVtcGxhdGUgPVxuICAgICAgbmV3IENvbWV0Q2hhdENhbGxEZXRhaWxzVGVtcGxhdGUoe1xuICAgICAgICBpZDogXCJjYWxsT3B0aW9uc1wiLFxuICAgICAgICBoaWRlU2VjdGlvblNlcGFyYXRvcjogdHJ1ZSxcbiAgICAgICAgb3B0aW9uczogKCkgPT4ge1xuICAgICAgICAgIHJldHVybiB0aGlzLmdldFNlY29uZGFyeU9wdGlvbnMoXG4gICAgICAgICAgICBjYWxsTG9nID8/IHVuZGVmaW5lZCxcbiAgICAgICAgICAgIHRoZW1lID8/IHVuZGVmaW5lZFxuICAgICAgICAgICk7XG4gICAgICAgIH0sXG4gICAgICB9KTtcbiAgICByZXR1cm4gdGVtcGxhdGU7XG4gIH1cblxuICBwcml2YXRlIHN0YXRpYyBnZXRTZWNvbmRhcnlPcHRpb25zKFxuICAgIGNhbGxMb2c/OiBhbnksXG4gICAgdGhlbWU/OiBDb21ldENoYXRUaGVtZVxuICApOiBDb21ldENoYXRDYWxsRGV0YWlsc09wdGlvbltdIHtcbiAgICBjb25zdCBvcHRpb25zOiBDb21ldENoYXRDYWxsRGV0YWlsc09wdGlvbltdID0gW107XG4gICAgY29uc3QgbG9jYWxpemVkUGFydGljaXBhbnRzID0gXCJQYXJ0aWNpcGFudHNcIjtcbiAgICBjb25zdCBsb2NhbGl6ZWRSZWNvcmRpbmcgPSBcIlJlY29yZGluZ3NcIjtcbiAgICBjb25zdCBsb2NhbGl6ZWRIaXN0b3J5ID0gXCJIaXN0b3J5XCI7XG5cbiAgICBvcHRpb25zLnB1c2goXG4gICAgICBuZXcgQ29tZXRDaGF0Q2FsbERldGFpbHNPcHRpb24oe1xuICAgICAgICBpZDogXCJwYXJ0aWNpcGFudHNcIixcbiAgICAgICAgdGl0bGU6IGxvY2FsaXplZFBhcnRpY2lwYW50cyxcbiAgICAgICAgdGFpbDogY2FsbExvZy5wYXJ0aWNpcGFudHMubGVuZ3RoLFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyMCwgMjAsIDIwLCAwLjA0KVwiLFxuICAgICAgfSlcbiAgICApO1xuICAgIGlmIChjYWxsTG9nPy5oYXNSZWNvcmRpbmcpIHtcbiAgICAgIG9wdGlvbnMucHVzaChcbiAgICAgICAgbmV3IENvbWV0Q2hhdENhbGxEZXRhaWxzT3B0aW9uKHtcbiAgICAgICAgICBpZDogXCJyZWNvcmRpbmdzXCIsXG4gICAgICAgICAgdGl0bGU6IGxvY2FsaXplZFJlY29yZGluZyxcbiAgICAgICAgICB0YWlsOiBjYWxsTG9nLnJlY29yZGluZ3MubGVuZ3RoLFxuICAgICAgICAgIGJhY2tncm91bmRDb2xvcjogXCJyZ2JhKDIwLCAyMCwgMjAsIDAuMDQpXCIsXG4gICAgICAgIH0pXG4gICAgICApO1xuICAgIH1cblxuICAgIG9wdGlvbnMucHVzaChcbiAgICAgIG5ldyBDb21ldENoYXRDYWxsRGV0YWlsc09wdGlvbih7XG4gICAgICAgIGlkOiBcImNhbGxIaXN0b3J5XCIsXG4gICAgICAgIHRpdGxlOiBsb2NhbGl6ZWRIaXN0b3J5LFxuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IFwicmdiYSgyMCwgMjAsIDIwLCAwLjA0KVwiLFxuICAgICAgfSlcbiAgICApO1xuXG4gICAgcmV0dXJuIG9wdGlvbnM7XG4gIH1cbn1cbiJdfQ==