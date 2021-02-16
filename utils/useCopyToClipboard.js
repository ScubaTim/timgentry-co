import React, { useState } from 'react'
import copy from 'copy-to-clipboard';

export default function useCopyToClipboard() {
    const [isCopied, setCopied] = React.useState(false);

    const handleCopy = (text) => {
        if (typeof text.children === 'string' || typeof text.children === 'number') {
            copy(text.children.toString());
            setCopied(true);
        } else {
            setCopied(false);
            alert.error(`Cannot copy typeof ${typeof text.children} to clipboard, must be a string or number.`);
        }
    }
    return [isCopied, handleCopy];
}