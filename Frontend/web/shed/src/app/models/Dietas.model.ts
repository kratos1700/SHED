export interface DietaModel {

    id?: number,
    dia:Date,
    hores: number,
    tipoDieta: number,
    observaciones: string,
    pendent: boolean, // 
    cobrat: boolean

  }
  
  export interface DietasModelResponse {
    dietas: DietaModel[]
  }
  
  export interface DietaModelResponse {
    dieta: DietaModel,
    msg: string
  }
  
  export interface DeleteDietaResponse {
    msg: string
  }