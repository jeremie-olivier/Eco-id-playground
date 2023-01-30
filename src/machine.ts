import { resolve } from 'path';
import { createMachine } from 'xstate';
import generateAttestation from './utilities/generateAttestation';
import GetVerifierSignature from './utilities/getVerifierSignature';

const returnTrue = () => {
  return true
};

const hasBothSignature = () => {
  return false
};

const hasReceiverSignature = () => {
  return true
};

const getReceiverSignature = ()=>{
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 3000);
  });
  
  return promise
}



const callRegister = ()=>{
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 3000);
  });
  
  return promise
}

const callMint = ()=>{
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 3000);
  });
  
  return promise
}



const machine = 

/** @xstate-layout N4IgpgJg5mDOIC5QFEDGB7ABASQCKdwEMAHYgOgEsIAbMAYgwDtGxUAXAbQAYBdRUYulgU2FdI34gAHogC0ATgDMZAKwB2ABwA2ACzyVARhUaATFrUAaEAE9EO7WS1auB8wc1quW+VoC+vqzQsPAISciYWdgpGKDoIcTBuPiQQQWFRcUkZBBUtMnkDeRN9E3sDDR17K1sclS5VE0VzOq5PRR1Ff0CMHHwiUjII1jZIOIpYIfYkyTSRMQkU7INHJo6VDqMNNXVtasRFeR18kyM1Q5NPe1KukCDe0IHJkYgyAAt0AFswTGJCGAYAE5gQgjaYpWYZBagbKVeo6Qr2FTrJTyLiNPYIAyNZbFNSKAxcJFcNYmG53EL9cLiSLPN6fb6-f6oaiECgfMECIRzTKLOyVMg6LSKLiKNRCjTaHQmFQYgwGfmeHwaFSKDSnNQ6Mk9ClhQbU4aQQZAkHfEEjWBsEHzOhQLBsLDvL4-P6JXgzLmQrL7cpkLjEip6HQueSorSy4V5JRcUxabTmcwaLXBPq6p6G1DGkaYM1wS2QsgAM3QAI+mHGmAAboRqFRC8XS8aINZMPbMMIoIw6BWwACKAWKD22xQOxzUh75l6EGpPKpid5Cop1sVZXplFwQ8L8V5EUn7pS9cwDS8M8CszmLVbxHWS2XYJXq7Wizf2ywIHF0AB3RjUdCECCjiEJ15KcNQFfFijMQ4NHOWVp2WeFKkFJFNEJXcdUefV2HTTNTTYc083ma9S3LKsa2PHtRH7VBL0YTB4i-H8-1GE8TUwFgPwA8ceWhRAsSxMhNw1JwYxOGUbF4rRigFFxPG2M5CmMNCUwww8sOPHDszw3MaKI297zIsgAGVh0YaJYniFhKEYCt0AAazAMhyWUqlVNpFizy0i98yfYi71I2tjI7MyEGiGzqMhJJOPSICeIQIoVDILY-WVTxsXlWUnDUMhpUXM5iXkUxWiUh4XJpbDT1w-CdJ8vT-JeQLTJiOgewBYsyGIFk2B8xztWcg8yvUirNKq7z61qh96pM4LQvQcL5kit1wS4qFpEQJL8gjeNSkkvQV0ORxFWJAlnBMMxiv3NNjxZNlMFYLAqBtO0HXpZ0YCi7kVuyfENF9f06m0bZTu2WUvHqeUkXsbcNCKgJbl6kr+qPQZrtLO6yxeKhaDoWAAFcACMPhETB+1od7PWA7QTGkxQzG8M5VVjDEpSynxch8YUTljRNYachHLuR1lUZ6WtMfoXGCaJknEgMZJOWi7jVoQDRFGUdpzhpvQtCMcN6hONRXAKRp8rFc7U0wtyUdu4WMZoMX8cJthiYoUmTFlsd5c+xA3F9E4sS1jV1nUDEOYEoNXAJeRtkKPwefhi7zfTS20drc8CPEPTGIgQ1U5ozBCdgO8gVQMAKG7AEhw7EEcaBbGTLJmLFYMRcjgKaHpxVVEVBMDRZXkMh1VWcGRSxU2VIGgWbuTl4c8hDPfyzl4XzM99LJm+yeuTPmE6uwWrfu6fPLT2jy0zw0l5iELrNmmiFrdwCFaWC4sppuVNty3bxIQExCUSnRDEaUw2wdD606LHTe8dXKJ13lPMgM95hzyYovKaTUWptQ6iCbqvMIHj2ZNA62sDD65xPvPM+yCoCXzCjfXg9cH68RVFlFKko5SnWlBiC4+R4R4m2F4LYpgR5gL3GbSBO9J74LgenYhiCCEjXgY2ZsrY8bfCBFAcYIwgRvmotQagmBlGqMHF8Ng7x-yLTlh9ScWJ9C+ibhqb+0Ztg90-oYI4kkiiqkFAcEUMdujgKETgpOYjCGz0kQvQY1YawxB0WAFRFoewrwcmvByWDfFI1waI-e0jtJBLvKfY8YSzKROiWoih18IrUJMe7MxwEm7uFUCrCUaJozFAMBiNQJwBRYg2MqZoo9SopP8ek8Rx9skkNyVo-JuiYkAmagCVqAJ2qdUwXHZJakJ5CwGYE+BwT0x5IiRMopM05riFvu6D25isT1BVrGP06hoyVAcTUQweRbFqmVJDaCXi4Y+LHn0vB6yZESOGVIvZPZmJhLztER2BijE0M9piF+iVhRInaN4P+hIMSvIRScP+lwjDRh6YjFZqS1nowyV5TZgKQmaPCVAcFjA2BxKsjZdeSTvmEv6SSwZCDKU7JpYTOlxTDmMGOUtU5VTXB5AXAUVw9itggx-k0KVehWgyTUPi-mRK94co2QCzAOTQljIiXy+lqC5noK6vWDegjWUW1+Vq-5QzdUjP1dS2lbABVUJ4DCs505srOBcJJXI05FDotyNTVpRQjBCnWGq7eqzNUp21Q6vVnL6LfhGY9TAeNCCoFsi2dAXqqneCeRUA45RziuBMGw4k2U8TIUaKiUUTcY3CLjTAzlWyD72orq+TNzYi4lzLtjMA1ACyuoLbFJuqp+6eAlAVA40FI7Bz-r6Jw3cm6Bvks2vxtqE1do7aSo+3bIC9sicXUusTU2Z3HY3S42UJTaGMPKEBYkahmCpkUHaZg8TKzOP4WGjB0BZ3gCkFlxATmVNirIRoRwDirGVmqLwKowyf1kB0H6-1SiGGjO4fE+LRbgfJpB8oeRYO6Hg8dJDTMHBOBcBKYwzNDBbuGGZAjDcvokdReoLunM6jNM-vYPINHyjKgqBcLuTG1KsdoZiM4Kx1BSlFPQ8olaUOLmWMlTDBI1R4gMBJ2kjoGQuik7CoGcmbGKcbaYWU2JsqR2KNofQmhubeKtb0wlGlBnGcnM4GDc6tDISUMrF9vETh90qKF1oxgaaoQEehNzbkPOJt0iRCaXngL+apvOpoAXVSLh1pGKUpQXDrDFJqWLfV1WJftclvyE1dJyLzd2tLsV9Z91jM4XQBJ-Sys-k3fa4WK0uCaOUXT5Wt4tvcpVTJhEaopYMjVF8kBmuK22H3Aopam6CkOGcWCP9cjDyUM0UUenyqsUGTV-StZi4AkohQQVdFPxpsQct7IeIwbNEFKlHa8hZTaHqAULW6gtMbhUCdwaZ2kuzdqwZBqLGRUQZW36ASfmctBdlGzMgrSu5qhDH6YkoOxvYJ+Wk9GL3EAqEjhwl5zcDhIhUzUKDQpZymD-lpnDo2XNxYJTaknItbZk4QLoBKUFyg0-0F3JmwpErdwlO0aC2hoJg9bQEvdFKlvw8I43VomWmjQ0JDOu5GJZDuDyBp1n2GdOgM5xV2NGq22Jq5dnB3+dC6sAHYOF8VcgQC46WF-E62u54iN3oX6LOsPafxFbz5rnudQN5526bOq9XnygD7swyhXCChOGJpxwW4pU3sD4YBw2KdZ6V3blXiek1Os5Q1hRSiol6PUWnpwvo1QCdFP7e5dh2Gs08OoDUgWVbl-ZbuqvjvRkuuBQCNP+0CqtyVBKMTGIKdU1aIV9QDMCplet+N7d8eD1ELVy8af6vTGa6WO0AvLQGbnO7i0-aSJ5QHFKHw64hPlk8+JWPslSenVUvySNR93hTqFaXhHUEjnsG7zinhBrQ8DXWKD0BHx3QT1-2rykUYALEhQhTPwqQv14hVmUEOHxG8FLTxAuBBnsFUGVAHw6GjHaAJ13yJzZRQMPyyUdSkRTUexyR9y2ASiMFOhpnFzXWgLfWOEki1kaDIzlGQIP3bWPzYPgUWwgBPX7XPRnw1zYxCwp0xwJEU2z0K3p0QDMB+n83kz-gjS2FVT-SAA */
createMachine(
  {
  predictableActionArguments: true,
  id: "Eco ID Dapp",
initial: "idle",
states: {
"idle": {
  on: {
    "connect": {
      target: "connected"
    }
  }
},
"connected": {
  initial: "home page",
  states: {
    "home page": {
      on: {
        "create": {
          target: "create attestation"
        },
        "claim": {
          target: "claim eco id"
        }
      }
    },
    "create attestation": {
      initial: "form is valid",
      states: {
        "form is valid": {
          initial: "form ready to sign",

          states: {
            "form ready to sign": {
              on: {
                "verifier sign": "Signing"
              }
            },

            "form signed": {
              on: {
                "download": {
                  target: "certification downloaded"
                }
              },
              entry : "storeVerifierSignature"
            },

            "certification downloaded": {
              on: {
                "create new": "form ready to sign"
              }
            },

            Signing: {
              invoke: {
                src: "GetVerifierSignature",
                onDone : "form signed",
                onError : "form ready to sign"
              },
              entry : "generateAttestation"
            }
          }
        }
      },
      on: {
        "go to home page": {
          target: "home page"
        }
      }
    },
    "claim eco id": {
      initial: "idle",
      states: {
        "idle": {
          on: {
            "submit file" : [
              {target : "attestation is loaded.attestation ready to be registered", cond: "hasBothSignature"},
              {target : "attestation is loaded.attestation miss receiver signature", cond: "hasReceiverSignature"},
              {
                target : "idle",
              },
            ]
        },
        exit : ["storeAttestation"]
      },

        "attestation is loaded": {
          states: {

            "attestation miss receiver signature": {
              on : {
                "sign" : "signing"
              }
            },
            "signing" : {
              invoke : {
                src : "getReceiverSignature",
                onDone : "attestation signed by receiver",
                onError : "attestation miss receiver signature"
              },
            },
            "attestation ready to be registered": {
              on : {
                "call register method" : "calling register"
              }
            },
            "calling register" : {
              invoke : {
                src : "callRegister",
                onDone : "registered",
                onError : "attestation ready to be registered"
              }
            },
            "registered": {
              on :{
                "call mint method" : "calling mint"
              }
            },
            "calling mint" : {
              invoke:  {
                src : "callMint",
                onDone : "nft minted",
                onError : "registered"
              }
            },

            "nft minted": {

            },

            "attestation downloaded": {
              on: {
                "go back to": {
                  target: "attestation signed by receiver"
                }
              }
            },

            "attestation signed by receiver": {
              on: {
                "self mint": "attestation ready to be registered",

                download: {
                  target: "attestation downloaded"
                }
              }
            },


          },

          initial: "attestation miss receiver signature"
        }
      },
      on: {
        "go to home page": "home page"
      }
    }
  },
  on: {
    "disconnect": {
      target: "idle"
    }
  }
}
}
,
schema: {
  context: {} as {
    attestation : {}
    form : {}
    signer : {}
    verifierSignature : string
  },
  events: {} as 
  {"type": "connect", signer : {}}|
  {"type": "done"}|
  {"type": "fail"}|
  {"type": "create"}|
  {"type": "claim"}|
  {"type": "user input"}|
  {"type": "validate form"}|
  {"type": "disconnect"}|
  {"type": "sign"}|
  {"type": "verifier sign", form : {}, signer : {}}|
  {"type": "download"}|
  {"type": "create new"}|
  {"type": "go to home page"}|
  {"type": "submit file", attestation : {}}|
  {"type": "validate attestation with verifier signature"}|
  {"type": "validate is attestation has end user signature"}|
  {"type": "call register method"}|
  {"type": "call mint method"}|
  {"type": "download, send to third person"}|
  {"type": "self mint"}|
  {"type": "go back to"}|
  {"type": "modify form"}
},
context: {
  attestation : {},
  form : {},
  signer : {},
  verifierSignature : ""
},
preserveActionOrder: true,
},{
  actions : {
    storeAttestation: (context, event) => {
      if (event.type == 'submit file') context.attestation = event.attestation
      console.log('event!',event);
    },
    generateAttestation,
    
    storeVerifierSignature : (context, event) => {
      console.log("storeVerifierSignature",event);
      
      //@ts-ignore
      context.verifierSignature = event.data
      //@ts-ignore
      context.attestation.verifySig = event.data

    },
    
  },
  guards : {
    hasBothSignature,
    hasReceiverSignature
  },
  delays : {},
  services : {
    getReceiverSignature,
    GetVerifierSignature: (context, event) => GetVerifierSignature(context,event)

  }
})

export default machine;