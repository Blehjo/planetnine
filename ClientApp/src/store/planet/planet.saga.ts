import { takeLatest, put, all, call } from 'typed-redux-saga';

import { PLANET_ACTION_TYPES, Planet } from './planet.types';

import {
    planetCreateStart,
    planetCreateSuccess,
    planetCreateFailed,
    planetUpdateStart,
    planetUpdateSuccess,
    planetUpdateFailed,
    planetDeleteStart,
    planetDeleteSuccess,
    planetDeleteFailed,
    planetFetchSingleStart,
    planetFetchSingleSuccess,
    planetFetchSingleFailed,
    planetFetchAllStart,
    planetFetchAllSuccess,
    planetFetchAllFailed,
    PlanetCreateStart,
    PlanetUpdateStart,
    PlanetDeleteStart,
    PlanetFetchAllStart,
    PlanetFetchSingleStart,
    PlanetFetchUserPlanetsStart
} from './planet.action';

import { 
    getSinglePlanet,
    getUserPlanets,
    getUsersPlanets,
    getPlanets, 
    addPlanet, 
    editPlanet,
    deletePlanet
} from '../../utils/api/planet.api';

export function* createPlanet({ payload: { 
    planetName,
    planetMass,
    perihelion,
    aphelion,
    gravity,
    temperature,
    imageLink,
    imageFile
}}: PlanetCreateStart ) {
    try {
        const planet = yield* call(
            addPlanet,
            planetName,
            planetMass,
            perihelion,
            aphelion,
            gravity,
            temperature,
            imageLink,
            imageFile
        ); 
        yield* put(planetCreateSuccess(planet));
    } catch (error) {
        yield* put(planetCreateFailed(error as Error));
    }
}

export function* updatePlanet({ payload: { 
    planetId,
    planetName,
    planetMass,
    perihelion,
    aphelion,
    gravity,
    temperature,
    imageLink 
}}: PlanetUpdateStart) {
    try {
        const planet = yield* call(
            editPlanet,
            planetId,
            planetName,
            planetMass,
            perihelion,
            aphelion,
            gravity,
            temperature,
            imageLink 
        ); 
        yield* put(planetUpdateSuccess(planet));
    } catch (error) {
        yield* put(planetCreateFailed(error as Error));
    }
}


export function* removePlanet({ payload: { planetId }}: PlanetDeleteStart) {
    try {
        const planets = yield* call(
            deletePlanet,
            planetId
        ); 
        yield* put(planetDeleteSuccess(planets));
    } catch (error) {
        yield* put(planetDeleteFailed(error as Error));
    }
}

export function* fetchUserPlanets() {
    try {
        const planets = yield* call(getUsersPlanets);
        if (!planets) return;
        yield* put(planetFetchAllSuccess(planets));
    } catch (error) {
        yield* put(planetFetchAllFailed(error as Error));
    }
}

export function* fetchOtherUsersPlanets({ payload: { userId } }: PlanetFetchUserPlanetsStart) {
    try {
        const planets = yield* call(
            getUserPlanets,
            userId
        );
        if (!planets) return;
        yield* put(planetFetchAllSuccess(planets));
    } catch (error) {
        yield* put(planetFetchAllFailed(error as Error));
    }
}

export function* fetchSinglePlanetAsync({ 
    payload: { planetId } }: PlanetFetchSingleStart) {
    try {
        const planetSnapshot = yield* call(
            getSinglePlanet,
            planetId 
        );
        yield* put(planetFetchSingleSuccess(planetSnapshot as Planet));
    } catch (error) {
        yield* put(planetFetchSingleFailed(error as Error));
    }
}

export function* fetchAllPlanetsAsync() {
    try {
        const planets = yield* call(getPlanets);
        yield* put(planetFetchAllSuccess(planets));
    } catch (error) {
        yield* put(planetFetchAllFailed(error as Error));
    }
}

export function* onCreateStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.CREATE_START, 
        createPlanet
    );
}

export function* onUpdateStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.UPDATE_START, 
        updatePlanet
    );
}

export function* onDeleteStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.DELETE_START, 
        removePlanet
    );
}

export function* onFetchUserPlanetsStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.FETCH_USER_PLANETS_START, 
        fetchUserPlanets
    );
}

export function* onFetchSinglePlanetStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.FETCH_SINGLE_START, 
        fetchSinglePlanetAsync
    );
}
  
export function* onFetchPlanetsStart() {
    yield* takeLatest(
        PLANET_ACTION_TYPES.FETCH_ALL_START,
        fetchAllPlanetsAsync
    );
}

export function* planetSagas() {
    yield* all([
        call(onCreateStart),
        call(onUpdateStart),
        call(onDeleteStart),
        call(onFetchUserPlanetsStart),
        call(onFetchSinglePlanetStart),
        call(onFetchPlanetsStart)
    ]);
}