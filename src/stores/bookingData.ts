// stores/bookingData.ts
import { useState, useEffect, useCallback } from 'react';

const initialState = {
    specialty: {},
    dataAndTime: {},
    basicInformation: {},
    payment: {},
    confirmation: {}
};

type StoreData = typeof initialState;
type StoreKey = keyof StoreData;

let storeData: StoreData = { ...initialState };
const subscribers: Set<() => void> = new Set();

const subscribe = (callback: () => void): (() => void) => {
    subscribers.add(callback);
    return () => {
        subscribers.delete(callback);
    };
};

const notifySubscribers = (): void => {
    subscribers.forEach(callback => callback());
};

export const setData = (key: StoreKey, value: any): void => {
    storeData = {
        ...storeData,
        [key]: {
            ...storeData[key],
            ...value
        }
    };
    notifySubscribers();
};

export const getData = (key: StoreKey): any => {
    return storeData[key];
};

export const getAllData = (): StoreData => {
    return { ...storeData };
};

export const clearData = (): void => {
    storeData = { ...initialState };
    notifySubscribers();
};

export const useBookingData = () => {
    const [data, setDataState] = useState<StoreData>(() => ({ ...storeData }));

    useEffect(() => {
        const unsubscribe = subscribe(() => {
            setDataState({ ...storeData });
        });
        return unsubscribe;
    }, []);

    const updateData = useCallback((key: StoreKey, value: any): void => {
        setData(key, value);
    }, []);

    const resetData = useCallback((): void => {
        clearData();
    }, []);

    return {
        data,
        updateData,
        getData: (key: StoreKey) => data[key],
        getAllData: () => data,
        resetData
    };
};