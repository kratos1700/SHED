export interface HoraModel {

    id?: number,
    dia:Date,
    hores: number,
    dieta: boolean,
    observaciones: string,
    pendent: boolean, // 
    cobrat: boolean

  }
  
  export interface HorasModelResponse {
    hores: HoraModel[]
  }
  
  export interface HoraModelResponse {
    hora: HoraModel,
    msg: string
  }
  
  export interface DeleteHoraResponse {
    msg: string
  }