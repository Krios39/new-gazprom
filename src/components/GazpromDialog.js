import {Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle} from "@material-ui/core";
import {GazpromButton} from "./GazpromButton";
import React from "react";

export default function GazpromDialog({dialogOpen, setDialogOpen, errorText}) {
    return (
        <Dialog
            open={dialogOpen}
            onClose={() => setDialogOpen(false)}>
            <DialogTitle>{"ОШИБКА"}</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {errorText}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <GazpromButton
                    onClick={() => setDialogOpen(false)}
                    variant="contained"
                    color="primary"
                    className="submit"
                    autoFocus>
                    Закрыть
                </GazpromButton>
            </DialogActions>
        </Dialog>
    )
}