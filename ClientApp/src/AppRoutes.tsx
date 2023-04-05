import Authentication from "./routes/Authentication/Authentication.component";
import { Vitals } from "./routes/Vitals/Vitals.component";
import { Home } from "./routes/Home/Home.component";
import { ArtificialIntelligence } from "./routes/ArtificialIntelligence/ArtificialIntelligence.component";
import { Chats } from "./routes/Chats/Chats.component";
import { Explore } from "./routes/Explore/Explore.component";
import { Favorites } from "./routes/Favorites/Favorites.component";
import { Messages } from "./routes/Messages/Messages.component";
import { Posts } from "./routes/Posts/Posts.component";
import { Profiles } from "./routes/Profiles/Profiles.component";
import { Resources } from "./routes/Resources/Resources.component";
import { SingleChat } from "./routes/SingleChat/SingleChat.component";
import { SinglePlanet } from "./routes/SinglePlanet/SinglePlanet.component";
import { SinglePost } from "./routes/SinglePost/SinglePost.component";
import { SingleProfile } from "./routes/SingleProfile/SingleProfile.component";
import { Space } from "./routes/Space/Space.component";

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
    element: <ArtificialIntelligence />
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
    element: <Messages />
  },
  {
    path: '/planets',
    element: <Space />
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