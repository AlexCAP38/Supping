import {api} from "@services/api";
import {openDB} from "idb";

//Создание базы IDB
export const dbPromise = openDB("imageCache", 1, {
    upgrade(db) {
        db.createObjectStore("images");
    },
});


//Функция сохранения изображения
export const cacheImage = async (id: string) => {
    const db = await dbPromise;
    if (!id) return;

    const key = await db.getKey("images", id);

    if (!key) api.v1.getFile(id)
        .then((response) => {
            db.put("images", response.data, id);
        })


};


// Функция получения изображения
export const getCachedImage = async (id: string) => {
    const db = await dbPromise;
    return db.get("images", id);
};