import { uiState } from './';

type UiActionType = { type: '[Ui] - ToggleMenu' };

export const UiReducer = (state: uiState, action: UiActionType): uiState => {
	switch (action.type) {
		case '[Ui] - ToggleMenu':
			return {
				...state,
				isMenuOpen: !state.isMenuOpen
			};

		default:
			return state;
	}
};
