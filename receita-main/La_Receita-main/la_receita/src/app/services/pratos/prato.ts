export class Receita{
    subscribe(arg0: (receita: any) => void) {
      throw new Error('Method not implemented.');
    }
    private _nome: string;
    private _ingrediente: string[];
    private _preparo!: string;
    private _criador!: string;
    private _historia!: string;
    private _tipo!: number;
    private _image!: string;
   
    constructor(nome: string, ingrediente: string[], preparo: string){
     this._nome = nome;
      this._ingrediente = ingrediente;
     this._preparo = preparo;
    }
    
    //nome
    public get nome() : string{
     return this._nome;
    }
    public set nome(nome: string){
     this._nome = nome;
    }

    //criador
    public get criador() : string{
        return this._criador;
    }
    public set criador(criador: string){
        this._criador = criador;
    }

    //hitoria
    public get historia() : string{
        return this._historia;
    }
    public set historia(historia: string){
        this._historia = historia;
    }

    //preparo
    public get preparo() : string{
     return this._preparo;
    }
    public set preparo(preparo: string){
     this._preparo = preparo;
    }

    //ingredientes
    public get ingrediente(): string[] {
        return this._ingrediente;
    }
    public set ingrediente(ingrediente: string[]) {
        this._ingrediente = ingrediente;
    }

    //tipo
    public get tipo(): number {
        return this._tipo;
    }
    public set tipo(value: number) {
        this._tipo = value;
    }

    //tipo
    public get image(): string {
        return this._image;
    }
    public set image(image: string) {
        this._image = image;
    }

    private _downloadURL: any; //não vai no construtor:
    get downloadURL() : any{
    return this._downloadURL
    }

    set downloadURL(downloadURL : any){
    this._downloadURL = downloadURL;
    }

   
   
   
   }