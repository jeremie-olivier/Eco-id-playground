import { createContext } from 'react';
import  machine from '../stateMachines/machine';
import { InterpreterFrom } from 'xstate';

export const GlobalStateContext = createContext({ stateService: {} as InterpreterFrom<typeof machine> });