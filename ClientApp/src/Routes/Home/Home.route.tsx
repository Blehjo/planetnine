import { Component, Fragment } from "react";
import { HomeContainer, TextContainer } from "./Home.styles";

export class Home extends Component {
    render() {
        return (
            <HomeContainer>
                <TextContainer>
                    <div>Hello World! The year is 2099. Space travel is no longer a dream. Pioneers are no longer folklore and you're amongst the many brave pilots needed to pave the way for future generations.<br></br><br></br>You might be familiar with the planet formerly known as Pluto. Research has been done and it turns out there are many others similar to Pluto. Your mission is to identify these planets and log them into your terminal. <br></br><br></br>You have your crew at your disposal. They will be your council and workers. They're tasked with refining your research and keeping you in one piece. Godspeed, Pilot. </div>
                </TextContainer>
            </HomeContainer>
        )
    }
}