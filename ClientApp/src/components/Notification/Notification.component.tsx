import { Component } from "react";
import { NotificationsContainer, SidebarContainer } from "./Notifications.styles";

export class Notification extends Component {
    render() {
        return (
            <SidebarContainer className="fixed-top" >
                <NotificationsContainer>
                    <div className="sticky-top" >
                        <h1>Journal Logs</h1>
                    </div>
                </NotificationsContainer>
            </SidebarContainer>
        );
    }
}