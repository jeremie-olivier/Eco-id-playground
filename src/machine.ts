
import { resolve } from 'path';
import { createMachine } from 'xstate';
import generateAttestation from './utilities/generateAttestation';
import generateAttestation from './utilities/generateAttestation';
import GetVerifierSignature from './utilities/getVerifierSignature';
import getReceiverSignature from  './utilities/getReceiverSignature';
import callRegister from  './utilities/register';
import callMint from  './utilities/mint';




import { FetchSignerResult } from "@wagmi/core";
import { Signer } from "ethers";
import { Attestation } from './types/types';

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



const machine = 

/** @xstate-layout N4IgpgJg5mDOIC5QFEDGB7ABASQCKdwEMAHYgOgEsIAbMAYgwDtGxUAXAbQAYBdRUYulgU2FdI34gAHogC0AJgCcAZjLyA7AEYVXAKy7FXABzKALKYA0IAJ6J1pxWUVGAbOvkuXR05s0aAvv5WaFh4BCTkVLR0UFhsWIQARugArmyYxIQw3HxIIILCouKSMgiyvo56uvJKitpeLuZWtgi66qpG7WbGysouXH2BwRg4+ESkZEws7JB0EBSwU6ycvJIFImISeaUK6rpkBo26jepdfs2I8pouZFw+Rnd3mspcR0MgIaPhE0szEGQAC3QAFswBksvRUAAnMCENhgHJrIQbYrbRDmLhkHyKUxGfQOZSGeTKC4IPzKTRqRTtTRVO7KarvT5hcbkX7w-5A0HgmAMaiECjAxF5dZFLagUrmUxYlwvZTqWVGVymeS6Um+cxkdRcRReXTKIyaNr2JkjFkRSbiaYcwEgsGZXmxTDxTBJVLpB0I1Yi5FikqXPpORUNYnuIyKdWaLRU9zOFyKNpK02hMYW9mQSYwuFguHw2BsOGbGJxLBc+0Q4UCX2bf0IClGW53bwOUxcbSGFzql43HRGDyuNxuIzJr6sy3MZYZ6Gw+Guth5gtisgAM3QUOBmAWmAAboRqFQV2uN1mINZnVhhFBGHRt2AoRRlxQ75hL4xK-lq6iJXZtQc7vHtAZFUIxsRBNAJW5FB0ClXlxXQR3NH4rUnf5p2zOcF0LcRD3XTdYB3PcD1XXDX1mCB0AAd0Yah0EICB31FGs0QQU51DITpqV0B4Bnlal1T7VRtS6Fs+xVeCgg+M1UyQic-kzGcc3nOBF02HCNy3Xd91Qu9REfVAsMYTByKomi6NmNDZxYCiGM-cVpDAq55DIOV7E8PsXCuNVQLJDzHFbKMuD2dQ6gTYcJOZaS2WQuSLMUzCl2I9T8M0g8AGUKCvChGCgOZxDAShGG3dAAGt8oi74otkm1Yow5SDLUvCCK0sh0sy7KECyor9LFHIbMKJjvwQBNKQ0PRfHsXR7nkdVGhuFw2l0HUOwpUxxOGFMKvHa0pyzWdczqhKj0alL-laxgspyu8oTXMhiH5NhErIcqx3TVDdrig7VMS47CNOjLzvazr0G6zZeu9Kt+q-eyhqjJwE1MfoHkWjz1RbA4oJePsuDbNbJI2l7ouq-lBUwVgsCoYtz0wMseS9XIIZROzSnrRs4OMNxqg0LyWlpfoyHA-EHkaB51AQyKtpQyZiY3MnN3+KJ6FgFJEmBERMEfWg+sZ2tXCc1tlA8eNgoNLxSRVNjdWOXUXiuLwwvW0c00JqdpdJkYDwVuglZVtWNYRTR6Y-SGmcQExVDMHFiXkBwXCNLtMSuLQAOJO5qRcMXNteqWBRl935ZoRXldV9I-Y4eRA8YqHSjcSkuCuPxY4m1b1FJG3nP82OdT2eoM4JqqXZzt3yf+fb8wMxrTIgDNR5U8RMFV2B8JhVAwAoW8oRff64RSGEvf+rW-WY55JqcTQRb2Qk9HkIx1UcI1Tj6HxVoGPxe6d-vUNd2WDxn8et0njMr4Lq5RYAVIqpUnpSUzs7T+g9v4jyUmPMUE9aJT3+EAwGhVgYGTBhXWytY-CnGcvXbsso2gOFJPIPQ7FVrkj7HsUwWhlBvxkttWBJN4FkF-sg-+qDAH-WAVdG6d04SPWeu-Nh2cOF5y4Yg2ehleFmXQQIzBXUcG8APgNaGRp5TsUTI0XwNRVSUItj4doexXidD7K-cKUC+6SNQF-GR3DNgoKUbI+KriTxnhdIkMEMIoALHhDCCADA9zUEwAEoJz5QRsCBPRcGQdtZHyUPsNs8oVTY06FxUkuhwJkF8sSbwspDCDFsfjCRktHFwOcXIv++EAGoXCRdSJYBAn5jvCA-KQMIHiNYVUpxw8PGfTnootBkxmnZVae04JHUsEg3ELgpEwcCEUjYvqA0DwqF9jqKSdwlIfDR3rMcPYLDKoOMGXLYZSDXFjKnJMqA0zolQjoEIqEt17piLsZUmKlyf51J4Q0vhTTqD7imVEjpUI5lqJ6hoxJlcQ5kj8JiXoXhsZtGMOYG+3k8k3CocYM+k0HjhnTuUx2-Tfk1KGS40ZQL3EQuCeZcJ88srpFifEzRVcwIG0pCYKoZh4zP25qHE+JgrjNyeIte2eNyXnIGVSq5NKFF0vGfpUFLTVaMDYF0sBJUyrfIpUTBV-zPG0swI0iZ6qpmarYNC7BsKeCcsRb4Tw-MVB1GuHsJULdvK0moX0D1DhAptlOGciWlLpHUoBbclV9yrWPJta8qE113kiIekeSBFTDUD0jYq6NZqLVqrBQm1ldqFlvjhXglZR8oxsQ8Nja4qo3DtFJHiG4+tYyeTIaYMNWdqm5pNSM5V5rgXXPkZvK8kBMCJDPMvVe68vZgGoMuFlWqnWrINPzbUSpnCEnDHxbyZg0meGvsfZtdRe0wKkbnKNprh0WqVROlgEBp2ztYPOzpxlqKoPXUfbU0pr5KnmoaRhx9KEeScB4aOHh2gmGCmGt0aRaaUxdDTT0v7BoKATFqKCGLDQ4h1NNHF7R2LtCUKcYpdxcZ9LlXJRDHoIQodLHaWmGHtGBTUCbODHZeatpMFiLi4F9nVDrj294jB0BT3gHkGjyzkmYbMIJXD27tCtkUERloshCSVGMDUUwhIfBDjDQrOTh9MO-m1H0foynGEtu8qBtQZCjSLQVJ4RQl6P6ma0aUAwnHXDcdeLSAwlhvJad8H+PsVCEwGBtqSh2iFaM2jQxCLzXKEA1DYmQ+woZ9RaD7OqYkI1qRKFcAmdQSYyUJfDdVd6tUblQwRbWfo0o919H0MbEwwqyRXD8tiZwOIzCrQ8w42rSqGoaV+qlxF80nKtfmm0FQnX449mxO4bGdcvBifi+LPto382MHG8lX6DVvFU1fFN2sWhHANFgn63EnQuw4ixCqRt6TY6GmG1Uvbd7DtNSIkdUiEALvMT2I4OohJfACpxMFdU2p9jHBfioDm8pPsxW+0O37J1Jg6QfBQctRlKLfqUcDwa7RMSesmm4Db0cQI83DNKDyKpDkEbPqLSrO2r01TG99CbzUzoXRJ9DbUKLd3zY6wydUVstSqlPVBdbQ32fQI-teoectBc+epE4XEZ8gKEn0BpuQenGyiUpzqPJHhUdGoHfnWg6vEBHC14aTr+nosG4QPpzEfYlQmFxHGcMluc03rzXetxaC7dkkCrNvo3E8NYtJOUQMUro7VG8McGoAf2FB8HfV+9o7H0LyXu+tez5XzbxhOHvwDgsQUnB9UOzmmq9ZOT7SQ0NJmGK-sfK63Y76kjvcRgqAFePCqGuAjRyew8mrVJOprEJLGF9CNDiDyGeVecMfXchBIfTu+P8W055kAh+uoJbiWUCoozYpaObIMGLjQEjDiv-tWfN9DtD3G4tTzIVD6e-1s+upvdc1yRn0ChVFVFg3jG8Afz+Wfxz1f3+AZTvAPx9GrUGmeBVAE2xhNmRWvj2Se30HAkJGjmsWjkgONWgPHQ30tXfxtQrx5T-HcB8AW3sCVGnx8DUAozDD8BxHcw7x+Styfx70BT73GUYGXDZVZUQIZjM20V6FUAG2uHdSjANh9R5ibAODxFv0xiPRIO73X1jTIPHkB1fVaRXmLyhCH18y0AGD2EchALd37AKXa3MAMCuE6DZ22yV0kXo1pnDxqB7AR3Uz9UNBNlbSoScC4mJGqEHHDHkAQ2SCQ09HD1kF1C1A1DP2JA7Hy28njBH3a0mignK0E0CECCAA */
createMachine(
  {
  predictableActionArguments: true,
  id: "Eco ID Playground",
initial: "idle",
states: {
  "idle": {
    on: {
      "connect": {
        target: "connected"
      },

      "go to about page": "about page"
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
          },

          "go to about page": "about page"
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
      },

      "about page": {
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
  },

  "about page": {
    on: {
      "go to home page": "idle"
    }
  }
}
,
schema: {
  context: {} as {
    attestation : Attestation | {}
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
  {"type": "go to about page"}|
  {"type": "submit file", attestation : {}}|
  {"type": "validate attestation with verifier signature"}|
  {"type": "validate is attestation has end user signature"}|
  {"type": "call register method", signer : {}}|
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
    GetVerifierSignature,
    callRegister,
    callMint,
  }
})

export default machine;