import { PLANET_ACTION_TYPES, Planet } from './planet.types';

import {
  createAction,
  withMatcher,
  Action,
  ActionWithPayload
} from '../../utils/reducer/reducer.utils';

export type PlanetCreateStart = ActionWithPayload<
    PLANET_ACTION_TYPES.CREATE_START, Planet
>;

export type PlanetCreateSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.CREATE_SUCCESS, 
    Planet[]
>;

export type PlanetCreateFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.CREATE_FAILED,
    Error
>;

export type PlanetUpdateStart = ActionWithPayload<
    PLANET_ACTION_TYPES.UPDATE_START,
    Planet
>;

export type PlanetUpdateSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.UPDATE_SUCCESS, 
    Planet[]
>;

export type PlanetUpdateFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.UPDATE_FAILED,
    Error
>;
   
export type PlanetDeleteStart = ActionWithPayload<
    PLANET_ACTION_TYPES.DELETE_START,
    Planet
>;

export type PlanetDeleteSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.DELETE_SUCCESS, 
    Planet[]
>;

export type PlanetDeleteteFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.DELETE_FAILED,
    Error
>;
   
export type PlanetFetchSingleStart = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_SINGLE_START,
    number
>;

export type PlanetFetchSingleSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_SINGLE_SUCCESS, 
    Planet
>;

export type PlanetFetchSingleFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_SINGLE_FAILED,
    Error
>;

export type PlanetFetchUserChatsStart = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_USER_PLANETS_START,
    number
>;

export type PlanetFetchUserChatsSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_USER_PLANETS_SUCCESS, 
    Planet[]
>;

export type PlanetFetchUserChatsFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_USER_PLANETS_FAILED,
    Error
>;

export type PlanetFetchAllStart = Action<
    PLANET_ACTION_TYPES.FETCH_ALL_START
>;

export type PlanetFetchAllSuccess = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_ALL_SUCCESS, 
    Planet[]
>;

export type PlanetFetchAllFailed = ActionWithPayload<
    PLANET_ACTION_TYPES.FETCH_ALL_FAILED,
    Error
>;

export const planetCreateStart = withMatcher(
    (planet: Planet): PlanetCreateStart => 
    createAction(PLANET_ACTION_TYPES.CREATE_START, planet)
);

export const planetCreateSuccess = withMatcher(
    (planet: Planet[]): PlanetCreateSuccess => 
    createAction(PLANET_ACTION_TYPES.CREATE_SUCCESS, planet)
);

export const planetCreateFailed = withMatcher(
    (error: Error) => 
    createAction(PLANET_ACTION_TYPES.CREATE_START, error)
);
 
export const planetUpdateStart = withMatcher(
    (planet: Planet): PlanetUpdateStart => 
    createAction(PLANET_ACTION_TYPES.UPDATE_START, planet)
);

export const planetUpdateSuccess = withMatcher(
    (planet: Planet[]): PlanetUpdateSuccess => 
    createAction(PLANET_ACTION_TYPES.UPDATE_SUCCESS, planet)
);

export const planetUpdateFailed = withMatcher(
    (error: Error): PlanetUpdateFailed => 
    createAction(PLANET_ACTION_TYPES.UPDATE_FAILED, error)
);

export const planetDeleteStart = withMatcher(
    (planet: Planet): PlanetDeleteStart => 
    createAction(PLANET_ACTION_TYPES.DELETE_START, planet)
);

export const planetDeleteSuccess = withMatcher(
    (planet: Planet[]): PlanetDeleteSuccess => 
    createAction(PLANET_ACTION_TYPES.DELETE_SUCCESS, planet)
);

export const planetDeleteFailed = withMatcher(
    (error: Error) => 
    createAction(PLANET_ACTION_TYPES.DELETE_START, error)
);

export const planetFetchSingleStart = withMatcher(
    (planetId: number): PlanetFetchSingleStart => 
    createAction(PLANET_ACTION_TYPES.FETCH_SINGLE_START, planetId)
);

export const planetFetchSingleSuccess = withMatcher(
    (planet: Planet): PlanetFetchSingleSuccess => 
    createAction(PLANET_ACTION_TYPES.FETCH_SINGLE_SUCCESS, planet)
);

export const planetFetchSingleFailed = withMatcher(
    (error: Error): PlanetFetchSingleFailed => 
    createAction(PLANET_ACTION_TYPES.FETCH_SINGLE_FAILED, error)
);

export const planetFetchUserChatsStart = withMatcher(
    (planetId: number): PlanetFetchUserChatsStart => 
    createAction(PLANET_ACTION_TYPES.FETCH_USER_PLANETS_START, planetId)
);

export const planetFetchUserChatsSuccess = withMatcher(
    (planet: Planet[]): PlanetFetchUserChatsSuccess => 
    createAction(PLANET_ACTION_TYPES.FETCH_USER_PLANETS_SUCCESS, planet)
);

export const planetFetchUserChatsFailed = withMatcher(
    (error: Error): PlanetFetchUserChatsFailed => 
    createAction(PLANET_ACTION_TYPES.FETCH_USER_PLANETS_FAILED, error)
);

export const planetFetchAllStart = withMatcher(
    (planet: Planet[]): PlanetFetchAllStart => 
    createAction(PLANET_ACTION_TYPES.FETCH_ALL_START, planet)
);

export const planetFetchAllSuccess = withMatcher(
    (planet: Planet[]): PlanetFetchAllSuccess => 
    createAction(PLANET_ACTION_TYPES.FETCH_ALL_SUCCESS, planet)
);

export const planetFetchAllFailed = withMatcher(
    (error: Error): PlanetFetchAllFailed => 
    createAction(PLANET_ACTION_TYPES.FETCH_ALL_FAILED, error)
);