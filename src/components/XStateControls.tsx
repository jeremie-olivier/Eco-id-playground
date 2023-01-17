import React, { useContext } from 'react';
import { GlobalStateContext } from '../providers/globalState';
import { useActor } from '@xstate/react';
import BlockInvitationToConnect from './BlockInvitationToConnect';
import HomePage from './HomePage';
import UserDashboard from './UserDashboard';


function XStateControls(){

    const globalServices = useContext(GlobalStateContext);
    const [state,send] = useActor(globalServices.stateService);

    
    return (
        <div>
        {state.matches('Idle') && <BlockInvitationToConnect></BlockInvitationToConnect>}
        {state.matches('connecting') && <p>connecting</p>}
        {state.matches('connected') && <p>connected</p>}
  
        {state.matches({"connected": "Home Page"}) && <HomePage></HomePage>}
  
        {state.matches({"connected": {"Create Attestation": "Empty Form"}}) && <p>empty form</p>}
        
        {state.matches({"Claim Eco ID": "submit file"}) && <UserDashboard></UserDashboard>}
  
        <div>
          <button onClick={() => send('Connect')}>Connect</button>
  
          {/** You can send events to the running service */}
          <button onClick={() => send('Create')}>Create</button>
          <button onClick={() => send('Claim')}>Claim</button>
  
          <button onClick={() => send('done')}>Done</button>
          <button onClick={() => send('fail')}>Fail</button>
        </div>
      </div>
    )
}

export default XStateControls