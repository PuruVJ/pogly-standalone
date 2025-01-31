import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  Radio,
  RadioGroup,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { StyledInput } from "../StyledComponents/StyledInput";

interface IProp {
  setInstanceSettings: Function;
}

export const ChooseInstanceModal = (props: IProp) => {
  const [type, setType] = useState<string>("Testnet");
  const [customDomain, setCustomDomain] = useState<string>("");
  const [moduleName, setModuleName] = useState<string>("");
  const [authKey, setAuthKey] = useState<string>("");
  const [remember, setRemember] = useState<boolean>(true);

  const [isModalOpen, setIsModalOpen] = useState<boolean>(true);

  const isOverlay: Boolean = window.location.href.includes("/overlay");

  const handleSave = () => {
    let domain: string = "";

    switch (type) {
      case "Testnet":
        domain = "wss://testnet.spacetimedb.com";
        break;
      case "Local":
        domain = "ws://127.0.0.1:3000";
        break;
      case "Custom":
        domain = "ws://" + customDomain;
        break;
    }

    props.setInstanceSettings({
      domain: domain,
      module: moduleName,
      authKey: authKey,
      remember: remember,
    });

    if (remember) {
      localStorage.setItem("stdbConnectDomain", domain);
      localStorage.setItem("stdbConnectModule", moduleName);
      localStorage.setItem("stdbConnectModuleAuthKey", authKey);
    }

    setIsModalOpen(false);
  };

  if(isOverlay) return (<></>);

  return (
    <Dialog open={isModalOpen}>
      <DialogTitle sx={{ backgroundColor: "#0a2a47", color: "#ffffffa6" }}>
        Connect to Pogly Standalone instance
      </DialogTitle>

      <DialogContent sx={{ backgroundColor: "#0a2a47", paddingBottom: "3px", paddingTop: "10px !important" }}>
        <FormGroup sx={{ gap: "20px" }}>
          <RadioGroup row sx={{ color: "#ffffffa6", display: "block", textAlign: "center" }}>
            <FormControlLabel
              control={
                <Radio checked={type === "Testnet"} onChange={() => setType("Testnet")} sx={{ color: "#ffffffa6" }} />
              }
              label="Testnet"
              labelPlacement="top"
            />
            <FormControlLabel
              control={
                <Radio checked={type === "Local"} onChange={() => setType("Local")} sx={{ color: "#ffffffa6" }} />
              }
              label="Local"
              labelPlacement="top"
            />
            <FormControlLabel
              control={
                <Radio checked={type === "Custom"} onChange={() => setType("Custom")} sx={{ color: "#ffffffa6" }} />
              }
              label="Custom"
              labelPlacement="top"
            />
          </RadioGroup>

          {type === "Custom" && (
            <StyledInput
              focused={true}
              label="Custom domain"
              color="#ffffffa6"
              onChange={(text: any) => setCustomDomain(text)}
              defaultValue={""}
            />
          )}

          <StyledInput
            focused={true}
            label="Module name"
            color="#ffffffa6"
            onChange={(text: any) => setModuleName(text)}
            defaultValue={""}
          />
          <div style={{ display: "grid" }}>
            <StyledInput
              focused={false}
              label="Authentication key"
              color="#ffffffa6"
              onChange={(text: any) => setAuthKey(text)}
              defaultValue={""}
            />
            <Typography variant="subtitle2" color="#ffffffa6">
              (Only if Required by Module)
            </Typography>
          </div>

          <div style={{ display: "grid" }}>
            <FormControlLabel
              componentsProps={{
                typography: { color: "#ffffffa6" },
              }}
              control={
                <Checkbox
                  defaultChecked
                  sx={{ color: "#ffffffa6", height: "20px" }}
                  onChange={() => setRemember((remember) => !remember)}
                />
              }
              label="Remember connection"
            />
            <Typography variant="subtitle2" color="#ffffffa6">
              (Can be reset in settings menu)
            </Typography>
          </div>
        </FormGroup>
      </DialogContent>

      <DialogActions sx={{ backgroundColor: "#0a2a47", paddingTop: "25px", paddingBottom: "20px" }}>
        <Button
          disabled={moduleName === "" ? true : false}
          variant="outlined"
          sx={{
            color: "#ffffffa6",
            borderColor: "#ffffffa6",
            "&:hover": { borderColor: "white" },
            "&:disabled": {
              borderColor: "gray",
              color: "gray",
            },
          }}
          onClick={handleSave}
        >
          Connect
        </Button>
      </DialogActions>
    </Dialog>
  );
};
