import api from "@/lib/axios";
import { userSchema, type ConfirmToken, type newPasswordForm, type requestConfirmationCodeForm, type UserLoginForm, type UserRegistrationForm } from "../types";
import { handleError } from "@/utils/utils";

export async function createAccount(formData: UserRegistrationForm) {
    try {

        const url = '/auth/create-account';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function confirmAccount(token: ConfirmToken['token']) {
    try {
        const url = '/auth/confirm-account';
        const { data } = await api.post<string>(url, { token });
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function requestConfirmationCode(formData: requestConfirmationCodeForm) {
    try {
        const url = '/auth/request-code';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function login(formData: UserLoginForm) {
    try {
        const url = '/auth/login';
        const { data } = await api.post<string>(url, formData);
        localStorage.setItem('VALKYRIE_TOKEN', data);
        return data;

    } catch (error) {
        handleError(error);
    }
}

// Forgot password

export async function forgotPassword(formData: requestConfirmationCodeForm) {
    try {
        const url = '/auth/forgot-password';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function validateToken(formData: ConfirmToken) {
    try {
        const url = '/auth/validate-token';
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function updatePasswordWithToken({ formData, token }: { formData: newPasswordForm, token: ConfirmToken['token'] }) {
    try {
        const url = `/auth/update-password/${token}`;
        const { data } = await api.post<string>(url, formData);
        return data;

    } catch (error) {
        handleError(error);
    }
}

export async function getUser() {
    try {

        const { data } = await api('/auth/user');
        const response = userSchema.safeParse(data);
        if (response.success) {
            return response.data
        };

    } catch (error) {
        handleError(error);
    }
}