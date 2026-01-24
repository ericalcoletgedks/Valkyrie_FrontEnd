import { isAxiosError } from "axios";

export function formatDate(isoString : string) : string {

    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
    })
    return formatter.format(date);
}


export function formatDateFull(isoString : string) : string {

    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    })
    return formatter.format(date);
}

export function formatTimeShort(isoString : string) : string {

    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeStyle: "short",
    })
    return formatter.format(date);
}

export function todaysDate(isoString : string) : boolean {

    const today = new Date();
    const date = new Date(isoString);
    const formatter = new Intl.DateTimeFormat('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
    });

    const formatedToday = formatter.format(today);
    const formatedDate = formatter.format(date);

    return formatedToday === formatedDate;
}

export function handleError(error: unknown) {
    if (isAxiosError(error) && error.response) {

        const data = error.response.data;

        if (Array.isArray(data?.errors) && data.errors[0]?.msg) {
            throw new Error(error.response.data.errors[0].msg);
        }

        throw new Error(error.response.data.error)
    }
}