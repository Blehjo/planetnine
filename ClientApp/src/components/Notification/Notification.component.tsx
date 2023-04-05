import { Component } from "react";
import { NotificationsContainer, SidebarContainer } from "./Notifications.styles";

export class Notification extends Component {
    render() {
        return (
            <SidebarContainer className="fixed-top" >
                <NotificationsContainer>
                    <h1>Journal Logs</h1>
                </NotificationsContainer>
            </SidebarContainer>
        );
    }
}