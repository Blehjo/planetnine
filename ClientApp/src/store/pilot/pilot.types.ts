import { Favorite } from "../favorite/favorite.types";
import { Follower } from "../follower/follower.types";
import { Moon } from "../moon/moon.types";
import { Planet } from "../planet/planet.types";

export enum PILOT_ACTION_TYPES  {
    FETCH_SINGLE_START = 'pilot/FETCH_SINGLE_START',
    FETCH_SINGLE_SUCCESS = 'pilot/FETCH_SINGLE_SUCCESS',
    FETCH_SINGLE_FAILED = 'pilot/FETCH_SINGLE_FAILED',
    FETCH_ALL_START = 'pilot/FETCH_ALL_START',
    FETCH_ALL_SUCCESS = 'pilot/FETCH_ALL_SUCCESS',
    FETCH_ALL_FAILED = 'pilot/FETCH_ALL_FAILED',
};

export type Pilot = {
    userId: number | null;
    username: string | null;
    firstName: string | null;
    lastName: string | null;
    dateOfBirth: string | null;
    emailAddress: string | null;
    password: string | null;
    about: string | null;
    imageLink: string | null;
    imageSource: string | null;
    type: string | null;
    dateCreated: Date | null;
    planets: Planet[] | null;
    moons: Moon[] | null;
    followers: Follower[] | null;
    favorites: Favorite[] | null;
}