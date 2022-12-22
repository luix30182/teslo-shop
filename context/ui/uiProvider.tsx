import React from 'react';
import { FC, useReducer } from 'react';
import { UiContext, UiReducer } from './';

export interface uiState {
	isMenuOpen: boolean;
}

const Ui_INITIAL_STATE = {
	isMenuOpen: false
};

interface Props {
	children: React.ReactNode;
}

export const UiProvider: FC<Props> = ({ children }) => {
	const [state, dispatch] = useReducer(UiReducer, Ui_INITIAL_STATE);

	const toggleSideMenu = () => {
		dispatch({ type: '[Ui] - ToggleMenu' });
	};

	return <UiContext.Provider value={{ ...state, toggleSideMenu }}>{children}</UiContext.Provider>;
};
