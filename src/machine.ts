
import { resolve } from 'path';
import { createMachine } from 'xstate';
import generateAttestation from './utilities/generateAttestation';
import GetVerifierSignature from './utilities/getVerifierSignature';
import getReceiverSignature from  './utilities/getReceiverSignature';
import callRegister from  './utilities/register';




import { FetchSignerResult } from "@wagmi/core";
import { Signer } from "ethers";
import { Attestation } from './types/types';

const returnTrue = () => {
  return true
};

const hasBothSignature = (context: any,event: any) => {
  return event.attestation.verifySig && event.attestation.sig
};

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

/** @xstate-layout N4IgpgJg5mDOIC5QFEDGB7ABASQCKdwEMAHYgOgEsIAbMAYgwDtGxUAXAbQAYBdRUYulgU2FdI34gAHogCMAdjIAOJQCZ5AZgCsATll6uANlWqALABoQAT0SmlhsocNdZKrUtPqtsgL4-LaFh4BCTkTCzskHQQFLDhrJy8koLCouKSMgiyjhqGptr5su7yWvL2ljYIGjqmZDqqRfI16lx2Zn4BGDj4RKRk8ZEQZAAW6AC2YJjEhDAMAE5ghGxg3HxIICkiYhLrmaamXGSm+nZaWqY61VyqGhVyN9mqOpqyXGet2qodIIHdIX0DZZDUYTKYzeioaiEChjVbJIRbdK7Wz7I6GDRcDTydEqPKqLR3LKyVHyLg6QxKLQaJSNeSmb6-YK9MLiCJA-oLJaTJbLWBsJbbOhQLBsLAgybTGBw9abNI7UCZDSuMhcVoeC4HfQ6IyE2QYhyXLhqClObFlBldJmhfqshKQDmLZaYHlwflysgAM3QczGmFimAAboRqFRPd7fZyIFZMKLMMIoIw6AGwHMKB6KCm4xQE9KBAi5RlEPJSWQtK1DHpLucnrqLhoVTpDUqjKcLUEetbAfbUJynS6+QLxGGfX7YIHg6GvSP4ywINF0AB3RjUdCECC5jb57aFhDFxRKJolJSqjRY566tT10maDQatSeLRtv7Mm3MO1DHuO7lsXlu7bD31-SDEMPxTUR01QQdGEwCBF2XVcICiT8uUwFgFw3WVt2RLIGlUMgMSxUwnGNBoCWsORjB0I4XGvUpK3cJ8rQBW1BgdFD+z-Icp0AsdgNDABlbNGAoRgoHnFhKEYAN0AAazAMhGQ7Zi31Y5C+x-V0oIA0dxxAshBITESoAQETpMguVVgwrckQVRAdG8MgWm8BRTHOVxVF1PIHEMUoy0bIwlVcxilJZFT2TU79fy07idL4oYDOE0S6BTOZvTIYgoTYbiFMtELXzZbte0izT3RioCJ3ioSjJMqT0HM7ZLKSGVrPlaQ7IUOp7KIo03iMDzyKyDVS0bDE1FVIpgv+UKCo-KEYUwVgsCoIURTFcYJXBKzUiw2yqmVVVTiNQwShMEpdSMQ5iTOOwW2PeRJpfLtZuhX1Fr9IYqFoOhYAAVwAIzGERMHTWgtsRVrMnsPCDg0VQnGeS57CUQlPEUcktArdFrlkCklAezsWPCubXq6UNPvoX6AaBkGVlkNY822my2oQJRT3wjUbjMckil1DFHIUHG9BuVpnkMfHlJm-piYW0mPpoCn-sBthgYoUHVHpzdGYhxBjuybHZDhlzzlKQkMTw28XEMV5nm8clxem98pZemWlqGDioJ0lc13td25UwQHYDHBZUDAChkzmLMEyWH6Fm+oSwYLbC9XOOpXC4YsqW1LRVGRgb9DIWlcmOVzMQN+38sdyFnbe0Nfe2T2EPtGcjPE+TTNk+TFKmivVOlmu3Y0gc-f9L3EKGZvRJqsyoMajXMKZzIDeLfCGj1Ix0VKC5CVUN5lFcg3qS8Ux5D1cunqd+b+7IOvxAb73x6qpKUrSjKlmyrvHsJ7s+9l6-B846CI9G4P0MpPdu9VxCz3hFrHcRQsTKFKPYY4BsTBkUqOoOoxxNAlCMAeNQZd-A-Fyt3c+VdL6-xvoAsco8fb-w9pGaMsY-qTAWFAWIywFhzkgtQagmBWHsMzBMNgox1xNQZuDWBTwtAqj1HSHeRojyEm8LUSiNwPDom1LkM+X9nrkNdn-KKw9qHAP6MGEMok+FgDYXyFMrdJLSTkjldsJCdEXxJvoyhd8x6mJ4UZSx1iOFTzqjPXgCcdrMz1B1Kk1Jjw7zUHoQk8gGhHANoUSkx1HyEI-gTMK39q4ULoUYzANCPxmL8fwmxcxkpzFSnMdKmV37EM-rk3R7j3oGJKvXIB98fHmKgP4gRcwgkQMYFA5qMCk4G0OKeCkqpShGn2LnSo3gHDyJpJSG6Sg7ZZKaTkyWZC2m10KV04xPSKkcKQmY-2IllZCJEWEhechYbZFZm8KkREahljQYgDZyhnmuVJMcMseMdnOOafsn+Hjjm326d47hfTrmMDYHY9ujjskS0rpC9pnjYXdjKRYwGSLhkhJ4A87WRInAF0uHoHGR4DznV3rkGlFx040XuqC58ezMX5KhYYk5xSTHwr8YS5Fz86mvyyuGJxnKMW9x5di6FVCBU9KFQSm5xKLKhLEZrCRkzl5w3GsYDGxZbgDXSdRLETxSIb3pBypiDs5V6IVXymFpzvGeJnJATAf1ozB1DuHb6YBqAekRYkOeLVYGniUAXUkKgdCs3jY2eQptXIqicDnZOx0mi+DtXlUhWKjkuqVSUjpQ966eogN631rB-W2NgkuUeZLYGAscioew7hiQn20NvYwdQ4ZmDhpoVmTQ-CEMYOgRC8B1jouINA3Vu0AC0shlSklyM4Rsm8TWEgXdUKiqo1BUh8q5Uo7LOhgutOTOdidF0llXU4Mk9k6RboGsfR4G8ihlmxPDbRLSr3hMXk0HIm8bglCxO5bdSpsjAvxNgvq+wf2S3FGCGAf7HkIFOkBuRWIqQnzULqB4jlnhPHsI+lQCHK5FWdIq1D5LnC1GqKzHydFqTdrzg0Ki+xXBuAUJcao5HVKUcodpcqIEaM7h8ubeNuQzhNBY98rI+pME73xHDE9Ytc0uJaWxdSRbhO8QqtpBhMYsAzjE9hE+VETQtleGqeledqi1H2A0YwLhciuBzWemVDrwqCcVXp3Sk5wyR1nGZ3aJQqJ6GqMu28FZj46F1KSaRGNS6XAyVifjPmvxUd02VfTekQ5zHAhQEZME4IlNC8zTQl0MlEVJP2reectkqIHccJ4moDwZcKlloTuWAuVVAVACrmRSTTKk0x2TrN5NFArGQJJ2caT+QOpkzz9qe5E3lVQIbiBdBozsK4Ao1Qzj9UqAukwtR90geOs4aoeROutJdu0y94z53MzyNImo6yDv2WzijPmag223i2UjHQd23EPcLZ011yqx5bayOnc2uRjxvFjYs7deoHDQeONUBoAUQUrbza4g54OB5Fq8bQ0nAcg41rDpmGc0cFiw9SRxpUkXs6aG3RcFURozDeCNAoJUGhQdE6vjit1TdH6Dee9eiJcN6w4yIrhEoyj5P1COFsvImgra6AV0LgtJPIfFpMZ4ozTCWFWMGZARncMHB87sOibECglm2AwejRLxY6ys0Fxp8F3KnUQ7LVDktqr+nnJTFbmodQtmuHJG2rwSjVfp08DB6kFYPC642-rgPhuznm8qZbqX-6nmeCOGWTE9gpk50SRHs4xJsdtFSenv3meAFk9Kb4tVSLGfPNLPDoFh47BO4QDUR4xYDwZrayD73XLHWHObx7XFQxGAeluTc-P4jpeL1PPWGoSoKxRc0Ooc6dhSyUhPfkI0t5ltEPPbK9bTfS0t4Xw-j2Faq2WJDjTuYVvdCzdeNh3CSex2iAcM0a42+wugDQB47KfgQAA */
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
            }
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
  {"type": "connect"}|
  {"type": "done"}|
  {"type": "fail"}|
  {"type": "create"}|
  {"type": "claim"}|
  {"type": "user input"}|
  {"type": "validate form"}|
  {"type": "disconnect"}|
  {"type": "sign", signer : {}}|
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
  },
  delays : {},
  services : {
    getReceiverSignature,
    GetVerifierSignature,
    callRegister,
  }
})

export default machine;