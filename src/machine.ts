import { createMachine } from 'xstate';

const returnTrue = () => {
  return true
};


const machine = 
/** @xstate-layout N4IgpgJg5mDOIC5QFEDGB7ABASQCKdwEMAHYgOmwgBswBiAYXQDsmxUAXAbQAYBdRUMXSwAluxHMBIAB6IAjAGY5Zbqu5KATAE4tGhQDYFAVgA0IAJ6INRjWQDsAFh1H9Ruwvca5+gL4+zaFh4BCTkGCxs4kxQtBDMYDz8SCBCouKSybIINmaWCHJ2XmQ6Wo6qABz63Fr65X4BGDj4RKRk4awcItG0AGaEIlSJUqliEkxSWXIOymrqctq6Bsa5Vty2Gk5a5U7b2tb1IIFNIa3tkZCxIrBnHEPJI+njmfLTKmqaOnqGphaI5cqbEpycpaNwaQwHI7BFphZgddiQMgACXQAFswJgAAqEGAMABOYEICLugmEowyoCyDm4+hUcjc8zkujkqn0DhW+Ts2zI5QUCnU3AKOgcCkhjWhoTacPOEGRaIx2Nx9Co-VRJJSZMeE0QDnBdIZXmZrPZvwQWmqxW8Rn5lT0Ol8-kO4uakpuCNl9AJRIxAEF2AjYOwiWNaABxLDsLAo9FYnEJPjDTVjbUIaa0wUGpleY0cgoKBxkPn8ozlIzmozqIxioIu07SjiIz2EhGYP0BoOPMjIVHEdjmTAAMXQeNRtAArrAwHjMF1iGOuAn7kmKTJEGzbOUNJv9Ft5ja7ByNNZuPYnK4lBWmaVq8cYVKIg2PV6W224B2xmQhyOZ7BMAA3QgqBECBx0nadZ3ndUHmTZ4EFcDct3BXc9G4coD1NI9VDIDYan+FxuDsB0GhrE5YQfd0yCbb1W39N9g2YT9h1RH9-0A4CyB6JjMC9CB+0jTBRCgJhaEEpgoOXJ5KT+XkyDLBRQV5NwHCqH48gKSpT1KapSkUDR1BvCU63Ixtn19WjA3ophGO-K5WKA2VOO-Hi+KwUSRJEITODkJJSTSGCpLguw7B5RCd3+FC0NzdxlEcUoFF5f5ynKAiDNrMj4RM5szPbSzrOY2yAPsjiuNEi5cHQAB3JgqHQQgIHEvyV0mPQjBUfQNHcDwHDLEEoo02K7G0uxdP0x0oTS+8MqfLKaJyzsv3y39CvY1Ap3EHoRFQSzMDiKqarqi4qJbAA5MAKoa8lJNXfJDFpYwtPUGplN0PraQGoaRtFMbnVIyaZUo0zZrozsumWiBMEc0cweoyGLq1WD1xC7dkP3XMjF1MhNjsa15OxpKNFS363Uy6jXwskGmDBiGmNoaGW1h7zE0aq7Jn0NnCzLQbHrZHcNEPKZgvenRhoUAnvpIu9iY9FURGY8awywAAVKN5VjGA4f867dXTelhsNbMaRNPJSy0TGrTLDrtB6wnJfrCjlVVTBxrIYCaBEscACNUTECGBnjHyNWZlNClNzQ2a8eluBcI35G4brMZ0XktBFGoajF4jb1dO3GxluXnRdym2PBok5pDOmMRL4GxkwCqxAAC3-KcRA2qcBI8pgiTHAkNaaxB4qMVrN22eSdJpVwOUI1qtCtNCplF4w5BtrPjOlx3ndBovMEr8my6L6jt-fZga-rxu8WbkRW9Ezvu8Zpcg4R0FC3mQxUPpTdc1F8pikTuQWW0RQSxLyMlNSiucnb5wPttWy+0IAXFROgCAzd+yw0XL5S6KZ+6Dy3CnUebNVLSWCkWTC8lphRzqOLTOwD-oO1luAmsZBIGPBYjAxEjDq4FSLrTPeLZbJsKPnXQgv4wBMHBhOS+7dr7+yZug2ClQTy6j0oKCONgDATz5JpLQ8U0J4OGkA9K1CwHOz4UwZhtVYGymMSxMGXD7LUV4eZQ+JiBFCJEZgMR04r7sC7gkW+aD4YBTkZjTCSjf4qP0ByZOBZ2pOCUbqEUKUKGGX0Y+UBa8IEOKgb+FhFiMlMOcpgfiHsMQEigFcBEBIQJbSoFQbiYBSmBlbuidgdcEE9xZlYOwOgVBcnil4GwwJ0Ycm2MFHCuhk6G0Gl9DOSS-opJoXnehljoFmNYbk6u+TCnFLqWUqcFwqk1JKTs6cTSWn1V8YHGRAUNjJWwuoPkaFeTxRjggTp6xNhuH+JMhJ0yJpS1SbQoxayj7LIOjk0uR8NlYCKW3ISkBMAe37MI0RYF3KeVQRc-x10CgFGwlpE2tRrRJQiQ4KJOFYkbH5HYPRsz7aGPSeCkxILzEMKBSYyF8KMSlXBgizASK3EotEl5AO0Fe75BFLSNwcdBrWgcJ0tmQyQRkGiWM+COhf7Ur+fMuhTQWUMtMaCsghyGkVNoPszA3smDsHNWAZprT0UivaQgPkWwgmGlFoKKOeghmyuwpsbQ1I2STI1dnVeAL6VV2BVklZsojXlL2YBGpFqrUnNaech1GCWQKExh4f4tQ9DyT5qaV5vrnBcgKAKKliTfkhv+QsnVSyo0Gssbtaq0aFbwsIKgAA1gU9AbSUx6HjgotYXgnCKEiqac0BYSggnalUXNREnQS2XiArVgK9VMtWXqrl8LEWuPcbESqra6omAEny-izSRB4nBsQKcsBmD9tgoaU2ZbZXeFFu4TRESB4Jy2PoLkFZrBsmDSvWt2q8C6ojYyxtzLLE7p5Xyg9k4qA9HNV0BcwqJIDqvPYf4b7DAdXkgoIZ6Nf26GUiLQiWg-COiYAguAUhxqkWkZirIABacJpoONvDUK4Qo8UDDo2pZQGgLHNZUkLXkaeSrRl6UqJo6w5CflEztl0KAYnRXaFpFUZOxh8xcl0-zE8jylDGE3NaPQSml2UOSe6DTjqvAjNcP+tCCmkLEdNG+ktSU0JbjQqNZTttQPRgVHGezA7XDYWc1yTposkJDMGsUPB2hhq5t1CB1dgMyaOPC7BEsygh5IXCqjU0UxSMlGxrqVCGYqxVpU6Bo62UoNdh7H2QcTFcsBXUrYTphRf7-oMN1dCakYslsGsLEatXAsruoVl1leUrFF069ddqptCthT3KhYb8g2QFhwnrc0HV3CLqY0FzLM1su5QWotoqkNal1RcjCq66aEZJUxoRMoSkjDzD6iMpw42dLuqmdZmZmq5sMoWxw27JV26QGW5MaorV8wFsGsNdqGxftjY+kDjLs2Lvzeu1Dlaa1z5bSYS27J8P5AGFNuCEsw85Em0xzhPjBbrD0lx3M8HzWN72WpiOKnCBthf0qO4ZG5pahyEPHpLNLO8JVEIpz2laSayC7cKHZ+No36ScQAPL+sUkqdOBCS7QSuc4q51a7MAgu2RI816-EsOv8hxynonEh8kdztTN6GutEHefAS3qywXRvCwGBpBHd9E61JPN-VycEAzKve7A+uqD+rzE246k-cEWvHcch5iW6ezrsZTZB9WhrdLFmsrT1u1PROIA2+xlnl+eF36TvivYV+vMo4in2HVs7BiLcQYbZgbJkGd4QsJLxXtHLan1LjfXu+lzro4VsDuAeb7HBTHUN6wWfrxmBoC6X+rq6K-1qr5usFqf2XQvg3u5FU5BeKH0MoHT6NBvtRpPgs08d5gxN-xS1CJPNdcNcfaDEfaNQ1bZY1OHRfVjPuYEYKaoakHqO5akDzY2H1WKMZANWVQ-U7GbOZU-Ifc-GDREY6AcRWNDS1GAvxcTPuWoLNEEaoedf4X+IKHfTSbRTcMoDnPvAg5XMNSvDdUgy-UAnaI9SnWAughAFfJVUEdGYaTfNA79eRbwZ6KYVwaedOI-fvQgwfXAMfRxavUQow2-XlfdMCR-QvWSXAqoPjBSYlVqX-UEXpKYe0GjHwIAA */

createMachine({
  predictableActionArguments: true,
  "id": "Eco ID Dapp",
"initial": "idle",
"states": {
"idle": {
  "on": {
    "connect": {
      "target": "connecting"
    }
  }
},
"connecting": {
  "on": {
    "done": {
      "target": "connected",
      "cond": returnTrue
    },
    "fail": {
      "target": "idle",
      "cond": returnTrue
    }
  }
},
"connected": {
  "initial": "home page",
  "states": {
    "home page": {
      "on": {
        "create": {
          "target": "create attestation"
        },
        "claim": {
          "target": "claim eco id"
        }
      }
    },
    "create attestation": {
      "initial": "empty form",
      "states": {
        "empty form": {
          "on": {
            "user input": {
              "target": "invalid form"
            }
          }
        },
        "form is valid": {
          "initial": "form ready to sign",
          "states": {
            "form ready to sign": {
              "on": {
                "sign": [
                  {
                    "target": "form signed",
                    "cond": returnTrue
                  },
                  {
                    "target": "form ready to sign",
                    "cond": returnTrue,
                    "internal": false
                  }
                ]
              }
            },
            "form signed": {
              "on": {
                "download": {
                  "target": "certification downloaded"
                }
              }
            },
            "certification downloaded": {
              "on": {
                "create new": {
                  "target": "#Eco ID Dapp.connected.create attestation.empty form"
                }
              }
            }
          },
          "on": {
            "user input": {
              "target": "invalid form"
            }
          }
        },
        "invalid form": {
          "on": {
            "validate form": [
              {
                "target": "form is valid",
                "cond": returnTrue
              },
              {
                "target": "invalid form",
                "cond": returnTrue,
                "internal": false
              }
            ]
          }
        }
      },
      "on": {
        "go to home page": {
          "target": "home page"
        }
      }
    },
    "claim eco id": {
      "initial": "idle",
      "states": {
        "idle": {
          "on": {
            "submit file": {
              "target": "invalid attestation"
            }
          }
        },
        "invalid attestation": {
          "on": {
            "validate attestation with verifier signature": [
              {
                "target": "attestation is loaded",
                "cond": returnTrue
              },
              {
                "target": "invalid attestation",
                "cond": returnTrue,
                "internal": false
              }
            ]
          }
        },
        "attestation is loaded": {
          "initial": "attestation is valid",
          "states": {
            "attestation is valid": {
              "on": {
                "validate is attestation has end user signature": [
                  {
                    "target": "attestation ready to be registered",
                    "cond":returnTrue
                  },
                  {
                    "target": "attestation ready to be signed by end user",
                    "cond": returnTrue
                  }
                ]
              }
            },
            "attestation ready to be registered": {
              "on": {
                "call register method": [
                  {
                    "target": "registered",
                    "cond": returnTrue
                  },
                  {
                    "target": "attestation ready to be registered",
                    "cond": returnTrue,
                    "internal": false
                  }
                ]
              }
            },
            "attestation ready to be signed by end user": {
              "on": {
                "sign": [
                  {
                    "target": "attestation signed by end user",
                    "cond": returnTrue
                  },
                  {
                    "target": "attestation ready to be signed by end user",
                    "cond": returnTrue,
                    "internal": false
                  }
                ]
              }
            },
            "registered": {
              "on": {
                "call mint method": [
                  {
                    "target": "nft minted",
                    "cond": returnTrue
                  },
                  {
                    "target": "registered",
                    "cond": returnTrue,
                    "internal": false
                  }
                ]
              }
            },
            "nft minted": {},
            "attestation downloaded": {
              "on": {
                "go back to": {
                  "target": "attestation signed by end user"
                }
              }
            },
            "attestation signed by end user": {
              "on": {
                "download, send to third person": {
                  "target": "attestation downloaded"
                },
                "self mint": {
                  "target": "attestation ready to be registered"
                }
              }
            }
          },
          "on": {
            "modify form": {
              "target": "invalid attestation"
            }
          }
        }
      },
      "on": {
        "go to home page": {
          "target": "home page"
        }
      }
    }
  },
  "on": {
    "disconnect": {
      "target": "idle"
    }
  }
}
}
,
schema: {
  context: {} as {
    
  },
  events: {} as {"type": "connect"}| {"type": "done"}| {"type": "fail"}| {"type": "create"}| {"type": "claim"}| {"type": "user input"}| {"type": "validate form"}| {"type": "disconnect"}| {"type": "sign"}| {"type": "download"}| {"type": "create new"}| {"type": "go to home page"}| {"type": "submit file"}| {"type": "validate attestation with verifier signature"}| {"type": "validate is attestation has end user signature"}| {"type": "call register method"}| {"type": "call mint method"}| {"type": "download, send to third person"}| {"type": "self mint"}| {"type": "go back to"}| {"type": "modify form"}
},
context: {},
preserveActionOrder: true,
})

export default machine;