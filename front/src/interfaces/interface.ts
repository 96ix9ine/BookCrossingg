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


export interface IServerUser {
    vkId: string,
}