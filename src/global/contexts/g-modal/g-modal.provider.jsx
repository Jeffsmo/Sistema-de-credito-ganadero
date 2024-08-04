import React, { useState } from "react";
import GmodalContext from "./g-modal.context";

function GmodalProvider({ children }) {
    const [isGmodalOpen, setGmodalOpen] = useState(false);

    const closeGmodal = () => {
        setGmodalOpen(false);
    };

    const openGmodal = () => {
        setGmodalOpen(true);
    };

    return (
        <GmodalContext.Provider value={{
            isGmodalOpen,
            setGmodalOpen,
            closeGmodal,
            openGmodal
        }}>
            {children}
        </GmodalContext.Provider>
    );
}

export default GmodalProvider;
