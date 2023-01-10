import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import Button from "./button";
import HStack from "./hstack";


type ConnectWalletButtonProps = {
    buttonType?: 'primary' | 'secondary';
    showArrow?: boolean;
    small?: boolean;
}

const ConnectWalletButton = ({ buttonType = 'primary', showArrow = true, small }: ConnectWalletButtonProps) => {
    const [isUnsupportedChain, setIsUnsupportedChain] = useState(false);
   
    useEffect(() => {
        if (isUnsupportedChain) {
            toast.error("Unsupported Chain");
        }
    }, [isUnsupportedChain]);

    return (
        <ConnectButton.Custom>
            {({
                account,
                chain,
                openAccountModal,
                openChainModal,
                openConnectModal,
                mounted,
            }) => {
                if (!mounted || !account || !chain) {
                    return (
                        <Button
                            secondary={buttonType === 'secondary'}
                            title="Connect Wallet"
                            showArrow={showArrow}
                            onClick={openConnectModal}
                            small={small}
                        />
                    );
                }

                if (chain.unsupported) {
                    setIsUnsupportedChain(true);
                    return (
                        <Button
                            secondary={buttonType === 'secondary'}
                            title="Switch Networks"
                            showArrow={showArrow}
                            onClick={openChainModal}
                            small={small}
                        />
                    );
                }

                return (
                    <HStack>
                        <Button secondary onClick={openAccountModal} title={`${chain.name} • ${account.displayName}`} showArrow={showArrow} small={small} />
                    </HStack>
                );
            }}
        </ConnectButton.Custom>
    );
};

export default ConnectWalletButton;