import {Toaster} from '@gravity-ui/uikit';
import {toaster} from '../App';

const defaultOptions = {
    autoHiding: 3000,
    theme: 'info' as const,
};

export function toastSuccess(title: string, options = {}) {
    toaster.add({
        name: crypto.randomUUID(),
        ...defaultOptions,
        theme: 'success',
        title,
        ...options,
    });
}

export function toastError(title: string, options = {}) {
    toaster.add({
        name: crypto.randomUUID(),
        ...defaultOptions,
        theme: 'danger',
        autoHiding: 5000,
        title,
        ...options,
    });
}

export function toastInfo(title: string, options = {}) {
    toaster.add({
        name: crypto.randomUUID(),
        ...defaultOptions,
        theme: 'info',
        title,
        ...options,
    });
}

// export function toastRaw(options: Parameters<typeof toaster.add>[0]) {
//   toaster.add({
//     ...defaultOptions,
//     ...options,
//   });
// }
