import React from "react";

export const getApiUrl = (url: string) => `${process.env.NEXT_PUBLIC_SERVER_URL}/${url}`;

export const ToastContext: React.Context<{
    showToast: (text: string) => void;
}> = React.createContext({
    showToast: (text: string) => { }
});