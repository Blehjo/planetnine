import { AnyAction } from 'redux';

import { ArtificialIntelligence } from './artificialintelligence.types';

import {
    artificialIntelligenceCreateStart,
    artificialIntelligenceCreateSuccess,
    artificialIntelligenceCreateFailed,
    artificialIntelligenceUpdateStart,
    artificialIntelligenceUpdateSuccess,
    artificialIntelligenceUpdateFailed,
    artificialIntelligenceDeleteStart,
    artificialIntelligenceDeleteSuccess,
    artificialIntelligenceDeleteFailed,
    artificialIntelligenceFetchSingleStart,
    artificialIntelligenceFetchSingleSuccess,
    artificialIntelligenceFetchSingleFailed,
    artificialIntelligenceFetchAllStart,
    artificialIntelligenceFetchAllSuccess,
    artificialIntelligenceFetchAllFailed,
} from './artificialintelligence.action';

export type ArtificialIntelligenceState = {
    readonly artificialIntelligenceId: number | null;
    readonly singleArtificialIntelligence: ArtificialIntelligence | null;
    readonly userArtificialIntelligences: ArtificialIntelligence[] | null;
    readonly artificialIntelligences: ArtificialIntelligence[] | null;
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_STATE: ArtificialIntelligenceState = {
    artificialIntelligenceId: null,
    singleArtificialIntelligence: null,
    userArtificialIntelligences: [],
    artificialIntelligences: [],
    isLoading: false,
    error: null,
};

export const artificialIntelligenceReducer = (
    state = INITIAL_STATE, action: AnyAction
): ArtificialIntelligenceState => {
    if (
        artificialIntelligenceFetchAllStart.match(action) 
    ) {
        return { ...state, isLoading: true }
    }
    if (
        artificialIntelligenceCreateSuccess.match(action) ||
        artificialIntelligenceUpdateSuccess.match(action) ||
        artificialIntelligenceDeleteSuccess.match(action) ||
        artificialIntelligenceFetchAllSuccess.match(action) 
    ) {
        return { ...state, isLoading: false, artificialIntelligences: action.payload };
    } 
    if (
        artificialIntelligenceCreateFailed.match(action) ||
        artificialIntelligenceUpdateFailed.match(action) ||
        artificialIntelligenceDeleteFailed.match(action) ||
        artificialIntelligenceFetchSingleFailed.match(action) ||
        artificialIntelligenceFetchAllFailed.match(action) 
    ) {
      return { ...state, isLoading: false, error: action.payload };
    }
  
    return state;
};