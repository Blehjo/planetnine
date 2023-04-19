import Authentication from "./routes/Authentication/Authentication.route";
import { Vitals } from "./routes/Vitals/Vitals.route";
import { Home } from "./routes/Home/Home.route";
import ArtificialIntelligenceRoute from "./routes/ArtificialIntelligence/ArtificialIntelligence.route";
import { Chats } from "./routes/Chats/Chats.route";
import { Explore } from "./routes/Explore/Explore.route";
import { Favorites } from "./routes/Favorites/Favorites.route";
import MessagesRoute from "./routes/Messages/Messages.route";
import { Posts } from "./routes/Posts/Posts.route";
import { Profiles } from "./routes/Profiles/Profiles.route";
import { Resources } from "./routes/Resources/Resources.route";
import { SingleChat } from "./routes/SingleChat/SingleChat.route";
import { SinglePlanet } from "./routes/SinglePlanet/SinglePlanet.route";
import { SinglePost } from "./routes/SinglePost/SinglePost.route";
import { SingleProfile } from "./routes/SingleProfile/SingleProfile.route";
import { Planets } from "./routes/Planets/Planets.route";
import { Moons } from "./routes/Moons/Moons.route";

const AppRoutes = [
  {
    index: true,
    element: <Home />
  },
  {
    path: '/vitals',
    element: <Vitals />
  },
  {
    path: '/authentication',
    element: <Authentication />
  },
  {
    path: '/chats',
    element: <Chats />
  },
  {
    path: '/crew',
    element: <ArtificialIntelligenceRoute/>
  },
  {
    path: '/explore',
    element: <Explore />
  },
  {
    path: '/favorites',
    element: <Favorites />
  },
  {
    path: '/messages',
    element: <MessagesRoute/>
  },
  {
    path: '/moons',
    element: <Moons />
  },
  {
    path: '/planets',
    element: <Planets />
  },
  {
    path: '/posts',
    element: <Posts />
  },
  {
    path: '/pilots',
    element: <Profiles />
  },
  {
    path: '/profile',
    element: <SingleProfile />
  },
  {
    path: '/resources',
    element: <Resources />
  },
  {
    path: '/singlechat/:id',
    element: <SingleChat />
  },
  {
    path: '/singleplanet/:id',
    element: <SinglePlanet />
  },
  {
    path: '/singlepost/:id',
    element: <SinglePost />
  },
  {
    path: '/singleprofile/:id',
    element: <SingleProfile />
  },
];

export default AppRoutes;