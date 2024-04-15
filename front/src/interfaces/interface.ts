export interface IBook {
    title: string,
    author: string,
    description: string,
    genre: string,
    dealType: string,
    damageLevel: string,
    userId: string
}


export interface IDataState extends IBook {}


export interface IResultBook extends IBook {
    imagePath: string
}


export interface IServerUser {
    vkId: string,
}


export interface IDeal {
    bookId: string,
    userId: string,
}