import { resolve } from 'path';
import { createMachine } from 'xstate';

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

const getVerifierSignature = ()=>{
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

/** @xstate-layout N4IgpgJg5mDOIC5QFEDGB7ABASQCKdwEMAHYgOgEsIAbMAYgwDtGxUAXAbQAYBdRUYulgU2FdI34gAHogC0ATgDMZAKwB2ABwA2ACzyVARhUaATFrUAaEAE9EO7WS1auB8wc1quW+VoC+vqzQsPAISciYWdgpGKDoIcTBuPiQQQWFRcUkZBBUtMnkDeRN9E3sDDR17K1sclS5VE0VzOq5PRR1Ff0CMHHwiUjII1jZIOIpYIfYkyTSRMQkU7INHJo6VDqMNNXVtasRFeR18kyM1Q5NPe1KukCDe0IHJkYgyAAt0AFswTGJCGAYAE5gQgjaYpWYZBagbKVeo6Qr2FTrJTyLiNPYIAyNZbFNSKAxcJFcNYmG53EL9cLiSLPN6fb6-f6oaiECgfMECIRzTKLOyVMg6LSKLiKNRCjTaHQmFQYgwGfmeHwaFSKDSnNQ6Mk9ClhQbU4aQQZAkHfEEjWBsEHzOhQLBsLDvL4-P6JXgzLmQrL7cpkLjEip6HQueSorSy4V5JRcUxabTmcwaLXBPq6p6G1DGkaYM1wS2QsgAM3QAI+mHGmAAboRqFRC8XS8aINZMPbMMIoIw6BWwACKAWKD22xQOxzUh75l6EGpPKpid5Cop1sVZXplFwQ8L8V5EUn7pS9cwDS8M8CszmLVbxHWS2XYJXq7Wizf2ywIHF0AB3RjUdCECCjiEJ15KcNQFfFijMQ4NHOWVp2WeFKkFJFNEJXcdUefV2HTTNTTYc083ma9S3LKsa2PHtRH7VBL0YTB4i-H8-1GE8TUwFgPwA8ceWhRAsSxMhNw1JwYxOGUbF4rRigFFxPG2M5CmMNCUwww8sOPHDszw3MaKI297zIsgAGVh0YaJYniFhKEYCt0AAazAMhyWUqlVNpFizy0i98yfYi71I2tjI7MyEGiGzqMhJJOPSICeIQIoVDILY-WVTxsXlWUnDUMhpUXM5iXkUxWiUh4XJpbDT1w-CdJ8vT-JeQLTJiOgewBYsyGIFk2B8xztWcg8yvUirNKq7z61qh96pM4LQvQcL5kit1wS4qFpEQJL8gjeNSkkvQV0ORxFWJAlnBMMxiv3NNjxZNlMFYLAqBtO0HXpZ0YCi7kVuyfENF9f06m0bZTu2WUvHqeUkXsbcNCKgJbl6kr+qPQZrtLO6yxeKhaDoWAAFcACMPhETB+1od7PWA7QTGkxQzG8M5VVjDEpSynxch8YUTljRNYachHLuR1lUZ6WtMfoXGCaJknEgMZJOWi7jVoQDRFGUdpzhpvQtCMcN6hONRXAKRp8rFc7U0wtyUdu4WMZoMX8cJthiYoUmTFlsd5c+xA3F9E4sS1jV1nUDEOYEoNXAJeRtkKPwefhi7zfTS20drc8CPEPTGIgQ1U5ozBCdgO8gVQMAKG7AEhw7EEcaBbGTLJmLFYMRcjgKaHpxVVEVBMDRZXkMh1VWcGRSxU2VIGgWbuTl4c8hDPfyzl4XzM99LJm+yeuTPmE6uwWrfu6fPLT2jy0zw0l5iELrNmmiFrdwCFaWC4sppuVNty3bxIQExCUSnRDEaUw2wdD606LHTe8dXKJ13lPMgM95hzyYovKaTUWptQ6iCbqvMIHj2ZNA62sDD65xPvPM+yCoCXzCjfXg9cH68RVFlFKko5SnWlBiC4+R4R4m2F4LYpgR5gL3GbSBO9J74LgenYhiCCEjXgY2ZsrY8bfCBFAcYIwgRvmotQagmBlGqMHF8Ng7x-yLTlh9ScWJ9C+ibhqb+0Ztg90-oYI4kkiiqkFAcEUMdujgKETgpOYjCGz0kQvQY1YawxB0WAFRFoewrwcmvByWDfFI1waI-e0jtJBLvKfY8YSzKROiWoih18IrUJMe7MxwEm7uFUCrCUaJozFAMBiNQJwBRYg2MqZoo9SopP8ek8Rx9skkNyVo-JuiYkAmagCVqAJ2qdUwXHZJakJ5CwGYE+BwT0x5IiRMopM05riFvu6D25isT1BVrGP06hoyVAcTUQweRbFqmVJDaCXi4Y+LHn0vB6yZESOGVIvZPZmJhLztER2BijE0M9piF+iVhRInaN4P+hIMSvIRScP+lwjDRh6YjFZqS1nowyV5TZgKQmaPCVAcFjA2BxKsjZdeSTvmEv6SSwZCDKU7JpYTOlxTDmMGOUtU5VTXB5AXAUVw9itggx-k0KVehWgyTUPi-mRK94co2QCzAOTQljIiXy+lqC5noK6vWDegjWUW1+Vq-5QzdUjP1dS2lbABVUJ4DCs505srOBcJJXI05FDotyNTVpRQjBCnWGq7eqzNUp21Q6vVnL6LfhGY9TAeNCCoFsi2dAXqqneCeRUA45RziuBMGw4k2U8TIUaKiUUTcY3CLjTAzlWyD72orq+TNzYi4lzLtjMA1ACyuoLbFJuqp+6eAlAVA40FI7Bz-r6Jw3cm6Bvks2vxtqE1do7aSo+3bIC9sicXUusTU2Z3HY3S42UJTaGMPKEBYkahmCpkUHaZg8TKzOP4WGjB0BZ3gCkFlxATmVNirIRoRwDirGVmqLwKowyf1kAcPuyVILSg7sqfFotwPk0g+UPIsHdDweOkhpmDgnAuAlMYZmhgt3DDMvhhuX1iOovUF3TmdRmmf3sHkaj5RlQVAuF3RjakWO0MxGcFY6gpSinoeUStKH8TLH+o0TwHdFICPQr0lZjoGQukk7CoGsmbEKcbaYWU2JsqR2KNofQmhubeKtXptyGlBnGcnM4GDc6tDISUMrF9vETh90qKdYeKIEzifc0NQZukSITS88BfzVN51NAC6qRcOtIxSncFzbh7QYvlVYvFmqiWDI1TkXm7tyXYr6z7rGZwugCT+llZ-Ju+1wsVpcE0coBhiuDVK4mhLfkJq6RfJAOritth9wKKWpugpDhnFgj-XIkWmjbFFINo0cWRvlbGwZYuAJKIUEFXRT8abEHTeyHiMGzRBSpR2vIWU2h6gFC1uoAkC7Fw7fcpVTJhEDv6QCmQm7iBPAXL85loLso2ZkFaV3NUIY-TEhUH99lVBwc5Ejhwl5zcDhImUzUKDpRfqmHaMdJb8gMc7ptrQbHugEpQXKAT-QXcmbCkSt3CU7RoLaGgrTtJdrAc6pydjgkrSBJNGhoSGddyMSyCbnkdTPmLHtFJDpvq6rMedtF0mp1nL86F1YAOwcL4q5Agl6UML+J5tdzxIrvQ5PSiGGjO4fEoCXO6YJTa4Xu79dctIUFGI1uhT910JJLE2wnHBbilTewPhgF9ZUIcSSQviUB7JWLw3ibIl-nkVgRRBS9HqLD3kd3-HRT+3uXYdhrNNPTlXMrL3nzXO+6gf7vX2eDdSKpeMqJpfrf7QKq3JUEpRMYlT1TVoUppTfu8BUDP8bu+Hv3cCsvIqIONw1wKFoDNzndxaftJE8oDilD4dcLXW8W0arbXn-d-fDUQol-CuorT4TqEjvYWvcV4Q1o8DXWKD0GX3vz3QpUNEYALEhQhSmy3wIx3xVg4XxG8FLTxAuBBnsFUGVHUA1GFGVj-lAICXAMdSkRTUu3F3gNY14i2ASiMFOhpnZzXV-zfWOEki1kaFIzlCIL+UD33U5UmwgBPX7XPQBGt1TwRwJAUxOFKBYTYVjEcGQkqGn3KGnD-V8CAA */
createMachine(
  {
  predictableActionArguments: true,
  id: "Eco ID Dapp",
initial: "idle",
states: {
"idle": {
  on: {
    "connect": {
      target: "connecting"
    }
  }
},
"connecting": {
  on: {
    "done": "connected"
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
              }
            },

            "certification downloaded": {
              on: {
                "create new": "form ready to sign"
              }
            },

            Signing: {
              invoke: {
                src: "getVerifierSignature",
                onDone : "form signed",
                onError : "form ready to sign"
              }
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
              entry : "StoreForm"
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
  },
  events: {} as {"type": "connect"}|
  {"type": "done"}|
  {"type": "fail"}|
  {"type": "create"}|
  {"type": "claim"}|
  {"type": "user input"}|
  {"type": "validate form"}|
  {"type": "disconnect"}|
  {"type": "sign"}|
  {"type": "verifier sign", form : {}}|
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
  form : {}
},
preserveActionOrder: true,
},{
  actions : {
    storeAttestation: (context, event) => {
      if (event.type == 'submit file') context.attestation = event.attestation
      console.log('event!',event);
    },
    StoreForm : (context, event) => {
      if (event.type == 'verifier sign') context.form = event.form
      console.log('event!',event);
    }
  },
  guards : {
    hasBothSignature,
    hasReceiverSignature
  },
  delays : {},
  services : {
    getReceiverSignature,
    getVerifierSignature,
  }
})

export default machine;