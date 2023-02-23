import { createMachine } from 'xstate';
import generateAttestation from '../utilities/generateAttestation';
import GetVerifierSignature from '../services/getVerifierSignature';
import getReceiverSignature from  '../services/getReceiverSignature';
import callRegister from  '../services/callRegister';
import callMint from  '../services/callMint';
import callIsClaimRegistered from  '../services/callIsClaimRegistered';
import callIsMinted from  '../services/callIsMinted';
import { FetchSignerResult } from "@wagmi/core";
import { Signer } from "ethers";
import { Attestation } from '../types/types';


const hasBothSignature = (context: any,event: any) => {
  return event.attestation.verifySig && event.attestation.sig
};

const hasVerifierSignature = (context: any,event: any) => {
  return event.attestation.verifySig
};


const machine = 

/** @xstate-layout N4IgpgJg5mDOIC5QFEDGB7ABASQCKYAUAbAQwE8oAndAVwDsIA6ASwiLAGIM66xUAXANoAGALqJQAB3Sxm-ZujoSQAD0QBGAMzDGAFgCchgBzqArAHYAbKfUAmWwBoQZREeHnG63acvCjN211LS3UAX1CnNCw8QlIKanomVnYOKCx+LBIAI1p+TEkSGBFxJBBpWXlFZTUEMx0DYzMrAMdnDU1bRmFu4VNbTSNddX1gy3DIjBx8YnIqWgZGbl4BSA4IZlglviExZXK5BSVSmq96w30TC2s7VpcEcx9GS28Q4WDTP11dcZAoqdjZgkFlsVkwABboAC2YHyhU4qEoYBI-DAxT2MgOVWOiA+pkY-jMtnM5i++j61icd3UJKMT2EmgCIQMunMth+fxiM3i8yYIJR4KhMIKMC4pGYkLRpX2lSOoBqpm8+JsfWJpPJlMQlnMmkYPls1KMRNshoe7MmnLic0Si0Uy35jAh0NhIrSmAymGyuWdqN2UoxMuqONseIJKpJBnVbVqplM+k8Ri1rOEBjM3wiv3N00tQN5tu2kEWiORMORKNg-GRh1S6SwjqFcMlUn9h0DCGVSsJqojtksGtqlgunnpNhZWp8MbN0SzgJ5Np4+d5RZRHv4ZYrMsYADN0JRIZgNpgAG4kIisLc7vdFiBkN1YWRQOgcQ9gSjMTfMF+Ye90RtlZtYuV2gVRgRmEfR+ljdxnluDQjCMOMiWEWx9GHPxLCMSd-i5K1gTzUFCyRZdSzgddDnPXd91gI8TzPbcKO-VYIHQAB3OgiHQEgIF-aUW2xWp9F0HUGTMdQwKCXoLD7akvEYYkkNZMkUMsBlMItGdrT5AsEUIktVxIytFHIvcD2PU9eRfeR31QAy6EwJjWPYzjVm04tMF4ZjuP-WVVA0JCdHMUSUIC2x6QGXQpKMbVGAZTQQmCYQ7ACsZ0w5aduQ0vD7Rcoi9PLGyjMo6izMYABlZgH2YOgoDWRQwBYOhD3QABrOrUoBdLcPnfDst0td8ro4yqNMs8yoqqqEEqxrrJlYpPIqXjANqQYdT1FUBIVMlzAiqK-ONeD9E0WKBNUtKcNzLqsqXXr9I3AbCuGphRroSrqpfahKEYSRSH4AbGDa7CcznO0tKulc+tui97pox7yue8bJvQabDlm30m3mgCfNqBldBA3xwIZILoIioZZPMeTwKU2MTvas6gYXRYxT3PgsFYatb0wOtvTmzFvPlRVQyJcMyR7PtLH6LoxfUNxdGDL5TAwlLMxpwHNN5RnMGZ-ckjYThYBoLJITkTB33YbmAz48w3E8YXDt0el1C0GCEHiulNGpboRkEt3qYB2dVYZkhxQ1yYz2SXX9cNvITdRdQSjRnnWzk62+lt+3Hb7AL1CHN2tQEgYvAViYp2Vv3Mq09XNdDnWOD1g2jejwRbDjv90d5xA3cCLoDvQyLRLFp3jQ8XwOmNfRhjAsCfezUuLvLwOmZDphiLymVCsciAC2X0jFEwQ3YCoxFUDAZhn0oL9YeRGhERr2GzYWzGHbdxh+kE0SWVMTQ86k-os8E4IUPUAOZSRhNBT3Up1YGat57BxZkvXK29bIHnXgWb8L0aq8Hqo1Fqf0la+wyrPKBQdK5wPBocNeHEN5MFQfDBqiMbIo2bjxDGJxlJ4hTodMW4ZWRbSjHYYYuphgjENEaPwYCOrnUgQHIhi9GBbxsuQpyVDYZoLejuT631fr-WnvgyRqAK4yLkavJBFCUHKJoVNehYg77MI0FoLOL83bJgeJ-QSUkpY6m7pbLwVhuiBDEbTf2ejoHENkfA+RxjFGhNITvK8N53RZBhIiKAGwUSIggFwE8RBMBJJSZ+aE-AIRcVRi3BOfF9QWFkpoQSbxST517Lw40Oph6aG1JFEkwx-EqzLoQhesCok3TIREyhixMkvWyWAZJ5YXzoLqgjbBWjwESPpkE6RfTDGDKosg3koyqrjMmakiatCkaKAYeiVurZykeG1NU54Bg6lSXzq7Bk7gyTeHlp0meuj9FrLCUYzZJjtlEFPLsnJUzKAcFUR9L6yJNG4O0RA5Z3ytb9JXhszAWyRlArGaCg5CNjk-iscUphbcECXMqTc2pJh6lUlttnQ6+htR9CCOYD5OjEXBIMb8tFGKcUvmcpk3elU8j5MKdYklPZWRPEioJD+4F-BOy0HBeMowBzUhliyxWxc8EIu6kis86yd5DK0jsqAgq6D8BmZg5qrU4WLLprqjlPzomIP+ZE6yWLdmG3NYcixM1CWMK8q2bQDJ8SCQCqqYS+gHlWGfgOBlvRRif2SkXLC8KlkOtWcig1Lr0UAsxcC01XqLWQvUTCi8OCtVpvtVlPVJCBmGtdcM91BazX8B9XQv1ogxUXLJvUbwwZiTmEMCSTQDy7ZSrHMIlpY9WU6prY6rNXKG25sidm8+D5ICYCyDeQ+x9T41zAEQTcrbu1lKaOS7QtyDpUu-odOlCaP4JUirO9N87M36qXTmjFa6GIQC3Tuvge7pn2TYhQ09i1hgshAv2keSE7YKtTK7YMSFwJIXgi+6tm8cg0DyMKTgrp3Sczw+BzGH8QzKkFmqEWvCPi0nQlqekhp349gw56HD3o2aEcFFzIlga+J1D0OcS4zQbh9hMIJ4wQxYxDvlmmFNalxGYZ6TAxdzqFHDLXbE9mCS9m5LSZauZNrK12sCbWlFCD1Ob0-eMzicSsA6d5Wk9t+LTl+nOWUkBOgTBWCCAmPu-QpL0g8CFGM8s7H9EGBh0zC6P1qaNXW1FMSkTXm04kiZenVgluhT9ctCzFPRffQliz8XzPyK0-EtL+y+UQGc5YrtvH3OLR7EhPQDtIqCyHd0Uw39jTW2NLoQ0AxAiGii90qRvTVP1q-XmxzmXKDvVLTl3cFbU0mbGysibsWpuWaYLNmreK6skZqMNvEZgBI9iAYdHhVJtSdGHMMIdFM42jYIeNlTW3EvTciXtgztD5m2vy+tsza6St7dq52o7iAewGFkgYIkn9mhWCks8YL8rx5eDsAN8I6Y6DoA3vAUoeWzpnNKYtAAtNSxAFOug9Fp3T9wGGw4k-NotGWfYDpdA+EhGw3Rqnahe5A5n98ahu1pMMPogxjQKljC0txnRh7NdjAJQw+oBf0yI3CIXNiECxUsMnfrUvvAHWu5qWKIEYzJi0AOL4Gr5OnS6a9nqYMpta5JehHG4v+vy2UsYKSsrSYJUAc4+wDPNWrcB470G2aComWhq7xOHR9eDG95-C4yOiTPzJpB-wTI2Rh4UwE9bUfP0x6GtDAq5W7yw3j-xwBONjR2AGG0wBRgIofGih-YekVg3HXz-bz5yzi-OtL0VWikNf016a+4DwyplJDAZYEA6EUQ2iQJsLWjCY1fdSH1NkfD1FgWTfMwfFdkWKgcUZPzGlsdCe+TwmVPrfeEJjxHJN23gGh-y35dHSzvPt7-L09C9JficPLDPl4uJL4IysvmwiFA3iyCMCFLbhmMZhHl8jFhAMAYgKyJ0J7qnG7OnFGCFDfvSIEO-BTLiF-nPIViwDrJgfcJbF0P4M-glIdA7OFFGFUjqKvvYIYNYDLIXMgeHoXo7sDtZvFnQcSDgTbFUmnB0OzjDmTAqG4Ghm7EgUTg7mgdQSDo2lZmpnvAfIBifJ+N+JfIiHQYaDftIXbPgXIQ0uLP4BwsGBdlqJQcpiEtoSusMtQlAHQVoAFE8MLFLO4PLGSOoG4mSF0IIl4t0IAsEK4W9u4WIToUVmVslnZlupVhlhgW5qTpjMGA7NBmTLLN4HYAJG4lLAEf1p-ESNcPERtu9ikX8p4cah6qao5r4QdHGNYCEOdglNqCbljFUnoJbB0HLP0M0HUaIXFskYwHtnQaQToD4JtAJIAmBI-lSP3LqAyIEN0NsUOmoQDsIZoZto0dynms2mMkWvMTnnoHjH4L0DKl4A8jYAHt0MPJjlLJMegaVk0RinQJuMKkKpAHQW7Bzp7jYI9lqHBNGniIhGBDGFUtYQcSgUceyloUkc0acTvL+v+uMkfEYZQL4W0tFLAdoEhIdMhN1g0qJHSlLDYNBAyvEWxrhprjkSzlfiFEnt4Pfr7jRtSJnrzvKnBMMMmoIQXoDMyd6CCWbrfvwdLsbuzjoH4PSgFH4KQcSNjqEEAA */
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
                },

                invoke: {
                  src: "callIsClaimRegistered",
                  onDone: "registered",
                  onError: {
                    target: "attestation ready to be registered",
                    internal: true
                  }
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
                },

                invoke: {
                  src: "callIsMinted",
                  onError: {
                    target: "registered",
                    internal: true
                  },
                  onDone: "nft minted"
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
    form : {}
    signer : any
    verifierSignature : string
    toast : {
      success : {} | null
      error : {} | null
    }
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
  signer : {},
  verifierSignature : "",
  toast:  {
    error : [],
    success : []
  }
},
preserveActionOrder: true,
},{
  actions : {
    storeAttestation: (context, event) => {
      if (event.type === 'submit file') context.attestation = event.attestation
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
    callMint,
    callIsClaimRegistered,
    callIsMinted,

  }
})

export default machine;