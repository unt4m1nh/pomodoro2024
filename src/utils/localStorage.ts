export const createLocalStorage = (key: string) => {
    console.log(localStorage.getItem(key));
    let store = JSON.parse(localStorage.getItem(key) ?? '{}');

    const save = () => {
        localStorage.setItem(key, JSON.stringify(store));
    }

    const storage = {
        get: () => {
            return store;
        },
        set: (value: any) => {
            store = value;
            save();
        },
        remove: () => {
            //delete store;
            save();
        }
    } 
    return storage
}


