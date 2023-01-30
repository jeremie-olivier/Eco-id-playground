
import { resolve } from 'path';
import { createMachine } from 'xstate';
import generateAttestation from './utilities/generateAttestation';
import generateAttestation from './utilities/generateAttestation';
import GetVerifierSignature from './utilities/getVerifierSignature';
import getReceiverSignature from  './utilities/getReceiverSignature';

import { FetchSignerResult } from "@wagmi/core";
import { Signer } from "ethers";

const returnTrue = () => {
  return true
};

const hasBothSignature = (context: any,event: any) => {
  return event.attestation.verifySig && event.attestation.sig
const hasBothSignature = (context: any,event: any) => {
  return event.attestation.verifySig && event.attestation.sig
};

const hasVerifierSignature = (context: any,event: any) => {
  return event.attestation.verifySig
const hasVerifierSignature = (context: any,event: any) => {
  return event.attestation.verifySig
};







const callMint = ()=>{
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve("foo");
    }, 3000);
  });
  
  return promise
}



const machine = 

/** @xstate-layout N4IgpgJg5mDOIC5QFEDGB7ABASQCKdwEMAHYgOgEsIAbMAYgwDtGxUAXAbQAYBdRUYulgU2FdI34gAHogCMAdjIAOJQCZ5AZgCsATll6uANlWqALABoQAT0SmlhsocNdZKrUtPqtsgL4-LaFh4BCTkTCzskHQQFLDhrJy8koLCouKSMgiyjhqGptr5su7yWvL2ljYIGjqmZDqqRfI16lx2Zn4BGDj4RKRk8ZEQZAAW6AC2YJjEhDAMAE5ghGxg3HxIICkiYhLrmaamXGSm+nZaWqY61VyqGhVyN9mqOpqyXGet2qodIIHdIX0DZZDUYTKYzeioaiEChjVbJIRbdK7Wz7I6GDRcDTydEqPKqLR3LKyVHyLg6QxKLQaJSNeSmb6-YK9MLiCJA-oLJaTJbLWBsJbbOhQLBsLAgybTGBw9abNI7UCZDSuMhcVoeC4HfQ6IyE2QYhyXLhqClObFlBldJmhfqshKQDmLZaYHlwflysgAM3QczGmFimAAboRqFRPd7fZyIFZMKLMMIoIw6AGwHMKB6KCm4xQE9KBAi5RlEPJSWQtK1DHpLucnrqLhoVTpDUqjKcLUEetbAfbUJynS6+QLxGGfX7YIHg6GvSP4ywINF0AB3RjUdCECC5jb57aFhDFxRKJolJSqjRY566tT10maDQatSeLRtv7Mm3MO1DHuO7lsXlu7bD31-SDEMPxTUR01QQdGEwCBF2XVcICiT8uUwFgFw3WVt2RLIGlUMgMSxUwnGNBoCWsORjB0I4XGvUpK3cJ8rQBW1BgdFD+z-Icp0AsdgNDABlbNGAoRgoHnFhKEYAN0AAazAMhGQ7Zi31Y5C+x-V0oIA0dxxAshBITESoAQETpMguVVgwrckQVRAdG8MgWm8BRTHOVxVF1PIHEMUoy0bIwlVcxilJZFT2TU79fy07idL4oYDOE0S6BTOZvTIYgoTYbiFMtELXzZbte0izT3RioCJ3ioSjJMqT0HM7ZLKSGVrPlaQ7IUOp7KIo03iMDzyKyDVS0bDE1FVIpgv+UKCo-KEYUwVgsCoIURTFcYJXBKzUiw2yqmVVVTiNQwShMEpdSMQ5iTOOwW2PeRJpfLtZuhX1Fr9IYqFoOhYAAVwAIzGERMHTWgtsRVrMnsPCDg0VQnGeS57CUQlPEUcktArdFrlkCklAezsWPCubXq6UNPvoX6AaBkGVlkNY822my2oQJRT3wjUbjMckil1DFHIUHG9BuVpnkMfHlJm-piYW0mPpoCn-sBthgYoUHVHpzdGYhxBjuybHZDhlzzlKQkMTw28XEMV5nm8clxem98pZemWlqGDioJ0lc13td25UwQHYDHBZUDAChkzmLMEyWH6Fm+oSwYLbC9XOOpXC4YsqW1LRVGRgb9DIWlcmOVzMQN+38sdyFnbe0Nfe2T2EPtGcjPE+TTNk+TFKmivVOlmu3Y0gc-f9L3EKGZvRJqsyoMajXMKZzIDeLfCGj1Ix0VKC5CVUN5lFcg3qS8Ux5D1cunqd+b+7IOvxAb73x6qpKUrSjKlmyrvHsJ7s+9l6-B846CI9G4P0MpPdu9VxCz3hFrHcRQsTKFKPYY4BsTBkUqOoOoxxNAlCMAeNQZd-A-Fyt3c+VdL6-xvoAsco8fb-w9pGaMsY-qTAWFAWIywFhzkgtQagmBWHsMzBMNgox1xNQZuDWBTwtAqj1HSHeRojyEm8LUSiNwPDom1LkM+X9nrkNdn-KKw9qHAP6MGEMok+FgDYXyFMrdJLSTkjldsJCdEXxJvoyhd8x6mJ4UZSx1iOFTzqjPXgCcdrMz1B1Kk1Jjw7zUHoQk8gGhHANoUSkx1HyEI-gTMK39q4ULoUYzANCPxmL8fwmxcxkpzFSnMdKmV37EM-rk3R7j3oGJKvXIB98fHmKgP4gRcwgkQMYFA5qMCk4G0OKeCkqpShGn2LnSo3gHDyJpJSG6Sg7ZZKaTkyWZC2m10KV04xPSKkcKQmY-2IllZCJEWEhechYbZFZm8KkREahljQYgDZyhnmuVJMcMseMdnOOafsn+Hjjm326d47hfTrmMDYHY9ujjskS0rpC9pnjYXdjKRYwGSLhkhJ4A87WRInAF0uHoHGR4DznV3rkGlFx040XuqC58ezMX5KhYYk5xSTHwr8YS5Fz86mvyyuGJxnKMW9x5di6FVCBU9KFQSm5xKLKhLEZrCRkzl5w3GsYDGxZbgDXSdRLETxSIb3pBypiDs5V6IVXymFpzvGeNgkuEpK1MB-UIKgGSMZ0BktgZjRyHhqiuGaDjfq6DWiOU0GcJJVwsSnztXlUhWKjkuqVSUjpQ964zkgL66MwdQ7h2+mAagHpEWJDni1WBp4lAF1JCoHQrN22NnkKbVyKonA52TsdJovh00uJaW4l2zrOmuuVe6xVkdZwlssSHMOtjPXwTXCGpOgLw24ncMSE+2ht7GDqHDMwcNNCsyaH4QhjB0CIXgOsdFxBoG6t2gAWlkMqUkuRnCNk3iawk77qhUVVGoDGFZaXqHLuTV9icP0lh-U4Mk9k6SAYGsfR4G8ihlmxPDbRLS4PhMXk0HIm8bglFTWoIDSpsjAvxHuA8egNAEcluKMEMAiOPIQKdMjcisRUhPtRvODxHLPCePYVDKhWOVyKs6RVXHyXOFqNUVmPk6LUiPSJ-O+wGiqb0B4TEMnVJycodpcqIFFM7h8ubdtuQk2Iy05UNeBpPDW3qPYWGxnwqmcVeZ3iFVtIMKDQuqz2ET5URNC2V4ap6V52qLUXTMaXC5FcCOzoYKuUma-PJnN-ndKTnDAuyAYXdolCosxmlt4KzHx0LqUk0iMal0uBkrE3nCo5bM2VALekQ5zHAhQEZME4IlNK8zTQl0MlEVJGereectkqPPccJ4moDztY-L5vL3WCuVVAVAMbmRSTTLs+ppomnvlZAxlRJJ2caT+QOpkjLMqHVE3lVQA7iBdBozsK4Ao1QzixsQO+kwtQwNmF1k0a42h1sTqvrB8Zb7mZ5GkTUdZf37LZxRnzNQKhWZ2HbRSHQMODmTuzdO3NwCPtZHTubXIx43itsWUBvUDh6PaB8qSPUnhidZoHjmrxtD+cByDqwctmYZzRwWFT1JVFCjMezpoIDFwVRGjMN4I0CglQsdHeC7lTqycFpnXmie+2EfwYiXDesOMiK4RKMoi79QjhbLyJoK2ugbc87e3z8nAvveG+gsFphLCrGDJK2b4j9xKUa7sOibECglm2AwejBrxY6ys2109+1PdXv679wA33vTykh8qdLlbdQtlRtxmoM6A1dB4XTp4Bj1IKweE97n-N+fcVDHOSmMP4jzeL1vNDMsmJ7BTJzokmopZlHVDMPg9oOuss58OXnj2XfC9qqRdL55pYadAsPHYBPCAaiPGLAeAdK2ieL9lcv0nq+il5sYB6W5Ny+86oH08tmNQlQVkjZodQ50dgpYlIpQdIo0t4j2RCmWN+eS7eOKbqguPu66o24e3GrgJQBc2cnMGOA6R+Z6p6xgVsNweQNI6WUBz22esBK+Hea+CB9+haQkxaf0paouq6cwpeugZAJ8mIJ0qSJggOPGFIjgSa+wde6B7KfgQAA */
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
      target: "connected"
    }
  },
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
              {target : "attestation is loaded.attestation miss receiver signature", cond: "hasVerifierSignature"},
              {target : "attestation is loaded.attestation miss receiver signature", cond: "hasVerifierSignature"},
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

            "attestation signed by receiver": {
              on: {
                "self mint": "attestation ready to be registered",

                download: {
                  target: "attestation signed by receiver",
                  internal: true
                }
              },
              entry : "storeReceiverSignature"
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
    attestation : Attestation | {}
    form : {}
    signer : FetchSignerResult<Signer> | undefined
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
  signer : undefined,
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
    storeReceiverSignature  : (context, event) => {
      console.log("storeReceiverSignature",event);
      
      //@ts-ignore
      context.receiverSignature = event.data
      //@ts-ignore
      context.attestation.sig = event.data

    },
    
  },
  guards : {
    hasBothSignature,
    hasVerifierSignature
    hasVerifierSignature
  },
  delays : {},
  services : {
    getReceiverSignature,
    GetVerifierSignature: (context, event) => GetVerifierSignature(context,event)

  }
})

export default machine;