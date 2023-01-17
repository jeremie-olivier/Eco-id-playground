import React, { createContext } from 'react';
import  machine from '../machine';
import { InterpreterFrom } from 'xstate';




export const GlobalStateContext = createContext({ stateService: {} as InterpreterFrom<typeof machine> });