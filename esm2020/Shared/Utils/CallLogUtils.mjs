import { CometChatUIKitConstants, localize } from "@cometchat/uikit-resources";
export class CallLogUtils {
    static isSentByMe(call, loggedInUser) {
        const senderUid = call.getInitiator()?.getUid();
        return !senderUid || senderUid === loggedInUser?.getUid();
    }
    static isMissedCall(call, loggedInUser) {
        const callStatus = call.getStatus();
        const sentByMe = this.isSentByMe(call, loggedInUser);
        // If the user sent the call and it was unanswered, it's not counted as missed
        if (sentByMe && callStatus === CometChatUIKitConstants.calls.unanswered) {
            return false;
        }
        // The following statuses are considered missed for the receiver
        const missedStatuses = [
            CometChatUIKitConstants.calls.unanswered,
            CometChatUIKitConstants.calls.cancelled,
        ];
        // If the user didn't send the call and the status matches one of the missed statuses, it's a missed call
        return !sentByMe && missedStatuses.includes(callStatus);
    }
    static getCallStatusWithType(call, loggedInUser, includeType = false) {
        if (!call || !loggedInUser) {
            return "";
        }
        let callMessageText = "";
        const callStatus = call.getStatus();
        const sentByMe = this.isSentByMe(call, loggedInUser);
        const missedCall = this.isMissedCall(call, loggedInUser);
        const callTypeKey = "_";
        if (missedCall) {
            callMessageText = `MISSED${callTypeKey}CALL`;
        }
        else {
            switch (callStatus) {
                case CometChatUIKitConstants.calls.initiated:
                    callMessageText = sentByMe
                        ? `OUTGOING${callTypeKey}CALL`
                        : `INCOMING${callTypeKey}CALL`;
                    break;
                case CometChatUIKitConstants.calls.ongoing:
                    callMessageText = sentByMe
                        ? `ONGOING${callTypeKey}CALL`
                        : `ONGOING${callTypeKey}CALL`;
                    break;
                case CometChatUIKitConstants.calls.ended:
                    callMessageText = sentByMe
                        ? `OUTGOING${callTypeKey}CALL`
                        : `INCOMING${callTypeKey}CALL`;
                    break;
                case CometChatUIKitConstants.calls.unanswered:
                    callMessageText = sentByMe
                        ? `UNANSWERED${callTypeKey}CALL`
                        : `MISSED${callTypeKey}CALL`;
                    break;
                case CometChatUIKitConstants.calls.cancelled:
                    callMessageText = sentByMe
                        ? `CANCELLED${callTypeKey}CALL`
                        : `MISSED${callTypeKey}CALL`;
                    break;
                case CometChatUIKitConstants.calls.rejected:
                    callMessageText = sentByMe
                        ? `REJECTED${callTypeKey}CALL`
                        : `MISSED${callTypeKey}CALL`;
                    break;
                case CometChatUIKitConstants.calls.busy:
                    callMessageText = sentByMe
                        ? `UNANSWERED${callTypeKey}CALL`
                        : `MISSED${callTypeKey}CALL`;
                    break;
                default:
                    callMessageText = `INCOMING${callTypeKey}CALL`;
            }
        }
        return localize(callMessageText);
    }
    static convertMinutesToHoursMinutesSeconds(minutes) {
        const hours = Math.floor(minutes / 60);
        const remainingMinutes = Math.floor(minutes % 60);
        const seconds = Math.floor((minutes - Math.floor(minutes)) * 60);
        let hoursString = "";
        let minutesString = "";
        let secondsString = "";
        if (hours > 0) {
            hoursString = `${hours}h`;
        }
        if (remainingMinutes > 0) {
            minutesString = `${remainingMinutes}m`;
        }
        if (seconds >= 0) {
            secondsString = `${seconds}s`;
        }
        return `${hoursString} ${minutesString} ${secondsString}`;
    }
    static convertSecondsToHoursMinutesSeconds(seconds) {
        const hours = Math.floor(seconds / 3600);
        const remainingMinutes = Math.floor((seconds % 3600) / 60);
        const remainingSeconds = Math.floor((seconds % 3600) % 60);
        let hoursString = "";
        let minutesString = "";
        let secondsString = "";
        if (hours > 0) {
            hoursString = `${hours}h`;
        }
        if (remainingMinutes > 0) {
            minutesString = `${remainingMinutes}m`;
        }
        if (remainingSeconds >= 0) {
            secondsString = `${remainingSeconds}s`;
        }
        return `${hoursString} ${minutesString} ${secondsString}`;
    }
    static isDateDifferent(firstDate, secondDate) {
        let firstDateObj, secondDateObj;
        firstDateObj = new Date(firstDate * 1000);
        secondDateObj = new Date(secondDate * 1000);
        return (firstDateObj.getDate() !== secondDateObj.getDate() ||
            firstDateObj.getMonth() !== secondDateObj.getMonth() ||
            firstDateObj.getFullYear() !== secondDateObj.getFullYear());
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ2FsbExvZ1V0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vcHJvamVjdHMvY2hhdC11aWtpdC1hbmd1bGFyL3NyYy9TaGFyZWQvVXRpbHMvQ2FsbExvZ1V0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFBRSx1QkFBdUIsRUFBRSxRQUFRLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUkvRSxNQUFNLE9BQU8sWUFBWTtJQUN2QixNQUFNLENBQUMsVUFBVSxDQUFDLElBQVMsRUFBRSxZQUE0QjtRQUN2RCxNQUFNLFNBQVMsR0FBVyxJQUFJLENBQUMsWUFBWSxFQUFFLEVBQUUsTUFBTSxFQUFFLENBQUM7UUFDeEQsT0FBTyxDQUFDLFNBQVMsSUFBSSxTQUFTLEtBQUssWUFBWSxFQUFFLE1BQU0sRUFBRSxDQUFDO0lBQzVELENBQUM7SUFFRCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQVMsRUFBRSxZQUE0QjtRQUN6RCxNQUFNLFVBQVUsR0FBRyxJQUFJLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDcEMsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFckQsOEVBQThFO1FBQzlFLElBQUksUUFBUSxJQUFJLFVBQVUsS0FBSyx1QkFBdUIsQ0FBQyxLQUFLLENBQUMsVUFBVSxFQUFFO1lBQ3ZFLE9BQU8sS0FBSyxDQUFDO1NBQ2Q7UUFFRCxnRUFBZ0U7UUFDaEUsTUFBTSxjQUFjLEdBQUc7WUFDckIsdUJBQXVCLENBQUMsS0FBSyxDQUFDLFVBQVU7WUFDeEMsdUJBQXVCLENBQUMsS0FBSyxDQUFDLFNBQVM7U0FDeEMsQ0FBQztRQUVGLHlHQUF5RztRQUN6RyxPQUFPLENBQUMsUUFBUSxJQUFJLGNBQWMsQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUM7SUFDMUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxxQkFBcUIsQ0FDMUIsSUFBUyxF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RUFBRTtZQUN6QixhQUFhLEdBQUcsR0FBRyxnQkFBZ0IsR0FBRyxDQUFDO1NBQ3hDO1FBRUQsT0FBTyxHQUFHLFdBQVcsSUFBSSxhQUFhLElBQUksYUFBYSxFQUFFLENBQUM7SUFDNUQsQ0FBQztJQUVELE1BQU0sQ0FBQyxlQUFlLENBQ3BCLFNBQTZCLEVBQzdCLFVBQThCO1FBRTlCLElBQUksWUFBa0IsRUFBRSxhQUFtQixDQUFDO1FBQzVDLFlBQVksR0FBRyxJQUFJLElBQUksQ0FBQyxTQUFVLEdBQUcsSUFBSSxDQUFDLENBQUM7UUFDM0MsYUFBYSxHQUFHLElBQUksSUFBSSxDQUFDLFVBQVcsR0FBRyxJQUFJLENBQUMsQ0FBQztRQUM3QyxPQUFPLENBQ0wsWUFBWSxDQUFDLE9BQU8sRUFBRSxLQUFLLGFBQWEsQ0FBQyxPQUFPLEVBQUU7WUFDbEQsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLGFBQWEsQ0FBQyxRQUFRLEVBQUU7WUFDcEQsWUFBWSxDQUFDLFdBQVcsRUFBRSxLQUFLLGFBQWEsQ0FBQyxXQUFXLEVBQUUsQ0FDM0QsQ0FBQztJQUNKLENBQUM7Q0FDRiIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLCBsb2NhbGl6ZSB9IGZyb20gXCJAY29tZXRjaGF0L3Vpa2l0LXJlc291cmNlc1wiO1xuXG5pbXBvcnQgeyBDb21ldENoYXQgfSBmcm9tIFwiQGNvbWV0Y2hhdC9jaGF0LXNkay1qYXZhc2NyaXB0XCI7XG5cbmV4cG9ydCBjbGFzcyBDYWxsTG9nVXRpbHMge1xuICBzdGF0aWMgaXNTZW50QnlNZShjYWxsOiBhbnksIGxvZ2dlZEluVXNlcjogQ29tZXRDaGF0LlVzZXIpIHtcbiAgICBjb25zdCBzZW5kZXJVaWQ6IHN0cmluZyA9IGNhbGwuZ2V0SW5pdGlhdG9yKCk/LmdldFVpZCgpO1xuICAgIHJldHVybiAhc2VuZGVyVWlkIHx8IHNlbmRlclVpZCA9PT0gbG9nZ2VkSW5Vc2VyPy5nZXRVaWQoKTtcbiAgfVxuXG4gIHN0YXRpYyBpc01pc3NlZENhbGwoY2FsbDogYW55LCBsb2dnZWRJblVzZXI6IENvbWV0Q2hhdC5Vc2VyKSB7XG4gICAgY29uc3QgY2FsbFN0YXR1cyA9IGNhbGwuZ2V0U3RhdHVzKCk7XG4gICAgY29uc3Qgc2VudEJ5TWUgPSB0aGlzLmlzU2VudEJ5TWUoY2FsbCwgbG9nZ2VkSW5Vc2VyKTtcblxuICAgIC8vIElmIHRoZSB1c2VyIHNlbnQgdGhlIGNhbGwgYW5kIGl0IHdhcyB1bmFuc3dlcmVkLCBpdCdzIG5vdCBjb3VudGVkIGFzIG1pc3NlZFxuICAgIGlmIChzZW50QnlNZSAmJiBjYWxsU3RhdHVzID09PSBDb21ldENoYXRVSUtpdENvbnN0YW50cy5jYWxscy51bmFuc3dlcmVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuXG4gICAgLy8gVGhlIGZvbGxvd2luZyBzdGF0dXNlcyBhcmUgY29uc2lkZXJlZCBtaXNzZWQgZm9yIHRoZSByZWNlaXZlclxuICAgIGNvbnN0IG1pc3NlZFN0YXR1c2VzID0gW1xuICAgICAgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuY2FsbHMudW5hbnN3ZXJlZCxcbiAgICAgIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLmNhbGxzLmNhbmNlbGxlZCxcbiAgICBdO1xuXG4gICAgLy8gSWYgdGhlIHVzZXIgZGlkbid0IHNlbmQgdGhlIGNhbGwgYW5kIHRoZSBzdGF0dXMgbWF0Y2hlcyBvbmUgb2YgdGhlIG1pc3NlZCBzdGF0dXNlcywgaXQncyBhIG1pc3NlZCBjYWxsXG4gICAgcmV0dXJuICFzZW50QnlNZSAmJiBtaXNzZWRTdGF0dXNlcy5pbmNsdWRlcyhjYWxsU3RhdHVzKTtcbiAgfVxuXG4gIHN0YXRpYyBnZXRDYWxsU3RhdHVzV2l0aFR5cGUoXG4gICAgY2FsbDogYW55LFxuICAgIGxvZ2dlZEluVXNlcjogQ29tZXRDaGF0LlVzZXIsXG4gICAgaW5jbHVkZVR5cGU6IGJvb2xlYW4gPSBmYWxzZVxuICApOiBzdHJpbmcge1xuICBcbiAgICBpZiAoIWNhbGwgfHwgIWxvZ2dlZEluVXNlcikge1xuICAgICAgcmV0dXJuIFwiXCI7XG4gIH1cblxuICBsZXQgY2FsbE1lc3NhZ2VUZXh0ID0gXCJcIjtcbiAgY29uc3QgY2FsbFN0YXR1cyA9IGNhbGwuZ2V0U3RhdHVzKCk7XG4gIGNvbnN0IHNlbnRCeU1lID0gdGhpcy5pc1NlbnRCeU1lKGNhbGwsIGxvZ2dlZEluVXNlcik7XG4gIGNvbnN0IG1pc3NlZENhbGwgPSB0aGlzLmlzTWlzc2VkQ2FsbChjYWxsLCBsb2dnZWRJblVzZXIpO1xuXG5cbiAgY29uc3QgY2FsbFR5cGVLZXkgPSBcIl9cIlxuXG4gIGlmIChtaXNzZWRDYWxsKSB7XG4gICAgICBjYWxsTWVzc2FnZVRleHQgPSBgTUlTU0VEJHtjYWxsVHlwZUtleX1DQUxMYDtcbiAgfSBlbHNlIHtcbiAgICAgIHN3aXRjaCAoY2FsbFN0YXR1cykge1xuICAgICAgICAgIGNhc2UgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuY2FsbHMuaW5pdGlhdGVkOlxuICAgICAgICAgICAgICBjYWxsTWVzc2FnZVRleHQgPSBzZW50QnlNZVxuICAgICAgICAgICAgICAgICAgICAgID8gYE9VVEdPSU5HJHtjYWxsVHlwZUtleX1DQUxMYFxuICAgICAgICAgICAgICAgICAgICAgIDogYElOQ09NSU5HJHtjYWxsVHlwZUtleX1DQUxMYDtcbiAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgY2FzZSBDb21ldENoYXRVSUtpdENvbnN0YW50cy5jYWxscy5vbmdvaW5nOlxuICAgICAgICAgICAgICBjYWxsTWVzc2FnZVRleHQgPSBzZW50QnlNZVxuICAgICAgICAgICAgICAgICAgPyBgT05HT0lORyR7Y2FsbFR5cGVLZXl9Q0FMTGBcbiAgICAgICAgICAgICAgICAgIDogYE9OR09JTkcke2NhbGxUeXBlS2V5fUNBTExgO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLmNhbGxzLmVuZGVkOlxuICAgICAgICAgICAgICBjYWxsTWVzc2FnZVRleHQgPSBzZW50QnlNZVxuICAgICAgICAgICAgICAgICAgPyBgT1VUR09JTkcke2NhbGxUeXBlS2V5fUNBTExgXG4gICAgICAgICAgICAgICAgICA6IGBJTkNPTUlORyR7Y2FsbFR5cGVLZXl9Q0FMTGA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuY2FsbHMudW5hbnN3ZXJlZDpcbiAgICAgICAgICAgICAgY2FsbE1lc3NhZ2VUZXh0ID0gc2VudEJ5TWVcbiAgICAgICAgICAgICAgICAgID8gYFVOQU5TV0VSRUQke2NhbGxUeXBlS2V5fUNBTExgXG4gICAgICAgICAgICAgICAgICA6IGBNSVNTRUQke2NhbGxUeXBlS2V5fUNBTExgO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBjYXNlIENvbWV0Q2hhdFVJS2l0Q29uc3RhbnRzLmNhbGxzLmNhbmNlbGxlZDpcbiAgICAgICAgICAgICAgY2FsbE1lc3NhZ2VUZXh0ID0gc2VudEJ5TWVcbiAgICAgICAgICAgICAgICAgID8gYENBTkNFTExFRCR7Y2FsbFR5cGVLZXl9Q0FMTGBcbiAgICAgICAgICAgICAgICAgIDogYE1JU1NFRCR7Y2FsbFR5cGVLZXl9Q0FMTGA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuY2FsbHMucmVqZWN0ZWQ6XG4gICAgICAgICAgICAgIGNhbGxNZXNzYWdlVGV4dCA9IHNlbnRCeU1lXG4gICAgICAgICAgICAgICAgICA/IGBSRUpFQ1RFRCR7Y2FsbFR5cGVLZXl9Q0FMTGBcbiAgICAgICAgICAgICAgICAgIDogYE1JU1NFRCR7Y2FsbFR5cGVLZXl9Q0FMTGA7XG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIGNhc2UgQ29tZXRDaGF0VUlLaXRDb25zdGFudHMuY2FsbHMuYnVzeTpcbiAgICAgICAgICAgICAgY2FsbE1lc3NhZ2VUZXh0ID0gc2VudEJ5TWVcbiAgICAgICAgICAgICAgICAgID8gYFVOQU5TV0VSRUQke2NhbGxUeXBlS2V5fUNBTExgXG4gICAgICAgICAgICAgICAgICA6IGBNSVNTRUQke2NhbGxUeXBlS2V5fUNBTExgO1xuICAgICAgICAgICAgICBicmVhaztcbiAgICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgICBjYWxsTWVzc2FnZVRleHQgPSBgSU5DT01JTkcke2NhbGxUeXBlS2V5fUNBTExgO1xuICAgICAgfVxuICB9XG5cbiAgcmV0dXJuIGxvY2FsaXplKGNhbGxNZXNzYWdlVGV4dCk7XG4gICAgXG4gIH1cblxuICBzdGF0aWMgY29udmVydE1pbnV0ZXNUb0hvdXJzTWludXRlc1NlY29uZHMobWludXRlczogbnVtYmVyKTogc3RyaW5nIHtcbiAgICBjb25zdCBob3VycyA9IE1hdGguZmxvb3IobWludXRlcyAvIDYwKTtcbiAgICBjb25zdCByZW1haW5pbmdNaW51dGVzID0gTWF0aC5mbG9vcihtaW51dGVzICUgNjApO1xuICAgIGNvbnN0IHNlY29uZHMgPSBNYXRoLmZsb29yKChtaW51dGVzIC0gTWF0aC5mbG9vcihtaW51dGVzKSkgKiA2MCk7XG5cbiAgICBsZXQgaG91cnNTdHJpbmcgPSBcIlwiO1xuICAgIGxldCBtaW51dGVzU3RyaW5nID0gXCJcIjtcbiAgICBsZXQgc2Vjb25kc1N0cmluZyA9IFwiXCI7XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICBob3Vyc1N0cmluZyA9IGAke2hvdXJzfWhgO1xuICAgIH1cblxuICAgIGlmIChyZW1haW5pbmdNaW51dGVzID4gMCkge1xuICAgICAgbWludXRlc1N0cmluZyA9IGAke3JlbWFpbmluZ01pbnV0ZXN9bWA7XG4gICAgfVxuXG4gICAgaWYgKHNlY29uZHMgPj0gMCkge1xuICAgICAgc2Vjb25kc1N0cmluZyA9IGAke3NlY29uZHN9c2A7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2hvdXJzU3RyaW5nfSAke21pbnV0ZXNTdHJpbmd9ICR7c2Vjb25kc1N0cmluZ31gO1xuICB9XG5cbiAgc3RhdGljIGNvbnZlcnRTZWNvbmRzVG9Ib3Vyc01pbnV0ZXNTZWNvbmRzKHNlY29uZHM6IG51bWJlcik6IHN0cmluZyB7XG4gICAgY29uc3QgaG91cnMgPSBNYXRoLmZsb29yKHNlY29uZHMgLyAzNjAwKTtcbiAgICBjb25zdCByZW1haW5pbmdNaW51dGVzID0gTWF0aC5mbG9vcigoc2Vjb25kcyAlIDM2MDApIC8gNjApO1xuICAgIGNvbnN0IHJlbWFpbmluZ1NlY29uZHMgPSBNYXRoLmZsb29yKChzZWNvbmRzICUgMzYwMCkgJSA2MCk7XG5cbiAgICBsZXQgaG91cnNTdHJpbmcgPSBcIlwiO1xuICAgIGxldCBtaW51dGVzU3RyaW5nID0gXCJcIjtcbiAgICBsZXQgc2Vjb25kc1N0cmluZyA9IFwiXCI7XG5cbiAgICBpZiAoaG91cnMgPiAwKSB7XG4gICAgICBob3Vyc1N0cmluZyA9IGAke2hvdXJzfWhgO1xuICAgIH1cblxuICAgIGlmIChyZW1haW5pbmdNaW51dGVzID4gMCkge1xuICAgICAgbWludXRlc1N0cmluZyA9IGAke3JlbWFpbmluZ01pbnV0ZXN9bWA7XG4gICAgfVxuXG4gICAgaWYgKHJlbWFpbmluZ1NlY29uZHMgPj0gMCkge1xuICAgICAgc2Vjb25kc1N0cmluZyA9IGAke3JlbWFpbmluZ1NlY29uZHN9c2A7XG4gICAgfVxuXG4gICAgcmV0dXJuIGAke2hvdXJzU3RyaW5nfSAke21pbnV0ZXNTdHJpbmd9ICR7c2Vjb25kc1N0cmluZ31gO1xuICB9XG5cbiAgc3RhdGljIGlzRGF0ZURpZmZlcmVudChcbiAgICBmaXJzdERhdGU6IG51bWJlciB8IHVuZGVmaW5lZCxcbiAgICBzZWNvbmREYXRlOiBudW1iZXIgfCB1bmRlZmluZWRcbiAgKSB7XG4gICAgbGV0IGZpcnN0RGF0ZU9iajogRGF0ZSwgc2Vjb25kRGF0ZU9iajogRGF0ZTtcbiAgICBmaXJzdERhdGVPYmogPSBuZXcgRGF0ZShmaXJzdERhdGUhICogMTAwMCk7XG4gICAgc2Vjb25kRGF0ZU9iaiA9IG5ldyBEYXRlKHNlY29uZERhdGUhICogMTAwMCk7XG4gICAgcmV0dXJuIChcbiAgICAgIGZpcnN0RGF0ZU9iai5nZXREYXRlKCkgIT09IHNlY29uZERhdGVPYmouZ2V0RGF0ZSgpIHx8XG4gICAgICBmaXJzdERhdGVPYmouZ2V0TW9udGgoKSAhPT0gc2Vjb25kRGF0ZU9iai5nZXRNb250aCgpIHx8XG4gICAgICBmaXJzdERhdGVPYmouZ2V0RnVsbFllYXIoKSAhPT0gc2Vjb25kRGF0ZU9iai5nZXRGdWxsWWVhcigpXG4gICAgKTtcbiAgfVxufVxuIl19