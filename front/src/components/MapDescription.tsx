export interface PlacemarkInfo {
    name: string;
    type: string;
    address: string;
    time: string;
    prompt: string;
}

export const PlacemarkData: Record<number, PlacemarkInfo> = {
    1: {
        name: "Van Loft",
        type: "Коворкинг",
        address: "ул. Кирова 139",
        time: "11:00 - 20:00",
        prompt: "Уточните время работы"
    },
    2: {
        name: "Первый формат",
        type: "Коворкинг",
        address: "Комсомольский просп., 122",
        time: "10:00 – 20:00",
        prompt: "Уточните время работы"
    },
    3: {
        name: "Косатка",
        type: "Коворкинг",
        address: "просп. Ленина, 2",
        time: "09:00 - 20:00",
        prompt: "Уточните время работы"
    },
    4: {
        name: "Лепота",
        type: "Бьюти-Коворкинг",
        address: "ул. Молодогвардейцев, 60В",
        time: "09:00 - 21:00",
        prompt: "Уточните время работы"
    },
    5: {
        name: "SvetLook",
        type: "Коворкинг",
        address: "просп. Победы, 325",
        time: "09:00 - 21:00",
        prompt: "Уточните время работы"
    },
    6: {
        name: "Верещагин",
        type: "Коворкинг",
        address: "просп. Победы, 360Б",
        time: "11:00 - 15:00",
        prompt: "Уточните время работы"
    },
    7: {
        name: "Brovki Bar",
        type: "Бьюти-Коворкинг",
        address: "ул. Чайковского, 149",
        time: "08:00 - 20:00",
        prompt: "Уточните время работы"
    },
    8: {
        name: "ПБУ",
        type: "Коворкинг",
        address: "просп. Победы, 168",
        time: "10:30 - 15:00",
        prompt: "Уточните время работы"
    },
    9: {
        name: "Антифриз",
        type: "Коворкинг",
        address: "ул. Свободы, 2",
        time: "09:00 - 20:00",
        prompt: "Уточните время работы"
    },
    10: {
        name: "Uranus",
        type: "Коворкинг",
        address: "ул. Свободы, 2",
        time: "10:00 - 20:00",
        prompt: "Уточните время работы"
    },
    11: {
        name: "Lidsmi",
        type: "Коворкинг",
        address: "ул. Свободы, 2, корп. 5",
        time: "09:00 - 18:00",
        prompt: "Уточните время работы"
    },
    12: {
        name: "Sobranie",
        type: "Коворкинг/Кальян-бар",
        address: "ул. Труда, 158",
        time: "15:00 - 02:00",
        prompt: "Уточните время работы"
    },
    13: {
        name: "Среди своих",
        type: "Коворкинг/Кальян-бар",
        address: "ул. Кирова, 167",
        time: "15:30 - 02:00",
        prompt: "Уточните время работы"
    },
    14: {
        name: "Tochka",
        type: "Коворкинг",
        address: "площадь МОПРа, 8А",
        time: "10:00 - 21:00",
        prompt: "Уточните время работы"
    }
}