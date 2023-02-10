import React, { useContext } from "react";
import { GlobalStateContext } from "../providers/globalState";
import { useActor } from "@xstate/react";

import Button from "@mui/material/Button";
import UploadIcon from "@mui/icons-material/Upload";

import { ethers, TypedDataDomain, TypedDataField } from "ethers";
import EcoID from "../abi/EcoID.json";
import Grid from "@mui/material/Unstable_Grid2";
import NoteAddOutlinedIcon from "@mui/icons-material/NoteAddOutlined";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";

import { useSigner, useProvider } from "wagmi";

type TypeData = {
  domain: TypedDataDomain;
  types: Record<string, TypedDataField[]>;
  message: AttestationValues;
  verifySig: string;
  sig: string;
};

type AttestationValues = {
  claim: string;
  feeAmount: Number;
  revocable: boolean;
  recipient: string;
  verifier: string;
  deadline: Number;
  nonce: Number;
};

function UploadAttestation() {
  const globalServices = useContext(GlobalStateContext);
  const [state, send] = useActor(globalServices.stateService);

  const { data: signer } = useSigner();
  let attestation: TypeData;

  const provider = useProvider();

  const readFileOnUpload = (uploadedFile: File) => {
    const fileReader = new FileReader();
    fileReader.onloadend = async () => {
      let a = await provider.getCode(
        "0x6FEC2db7DD68adbb28bF17F4e9Dd0c566Ec75b49"
      );

      console.log("contract code ", a);

      try {
        console.log(fileReader.result);

        if (fileReader.result && typeof fileReader.result == "string") {
          attestation = JSON.parse(fileReader.result);
          send({ type: "submit file", attestation });
          // register()
        }
      } catch (e) {
        console.log("**Not valid JSON file!**", e);
      }
    };
    if (uploadedFile !== undefined) fileReader.readAsText(uploadedFile);
  };

  return (
    <Grid
      container
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      spacing={2}
    >
      
      <Grid>
        <Card
          sx={{ gridColumn: "span 1", borderRadius: "3" }}
          onClick={() => send("claim")}
        >
          <CardActionArea>
            <NoteAddOutlinedIcon
              style={{ fontSize: "1rem", padding: "1rem" }}
              color="secondary"
            >
              {" "}
            </NoteAddOutlinedIcon>
            <CardContent>
              <Typography color="secondary" gutterBottom variant="body2" component="div">
                Drag end drop file or choose from drive
              </Typography>
              <Typography variant="body2" color="text.secondary">
                .pdf, .txt, max 1 MB
              </Typography>
              <Button
                variant="contained"
                color="secondary"
                component="label"
                endIcon={<UploadIcon />}
              >
                Upload File
                <input
                  type="file"
                  hidden
                  //@ts-ignore
                  onChange={(e) => readFileOnUpload(e.target.files[0])}
                />
              </Button>
            </CardContent>
          </CardActionArea>
        </Card>
      </Grid>
    </Grid>
  );
}

export default UploadAttestation;
