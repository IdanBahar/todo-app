export const storageService ={
    saveToStorage,
    loadFromStorage
}
 function saveToStorage(key, value) {
    return new Promise((resolve) => {
        setTimeout(() => {
            localStorage.setItem(key, JSON.stringify(value));
            resolve();
        }, 1000); });
}

 function loadFromStorage(key) {
    return new Promise((resolve) => {
        setTimeout(() => {
            const value = localStorage.getItem(key);
            resolve(value ? JSON.parse(value) : null);
        }, 1000); 
    });
}