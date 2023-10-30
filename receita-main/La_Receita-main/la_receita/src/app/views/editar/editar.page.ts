import { Component, OnInit } from '@angular/core';
import { Router, } from '@angular/router';
import { Receita } from 'src/app/services/pratos/prato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-editar',
  templateUrl: './editar.page.html',
  styleUrls: ['./editar.page.scss'],
})
export class EditarPage implements OnInit {
  public nome! : string;
  public preparo! : string;
  public criador! : string;
  public historia!: string;
  public tipo!: number;
  public image!: any;
  novoIngrediente: string = '';
  ingredientes: string[] = [];
  index!: number;
  receita!: Receita;
  
  constructor(private router : Router,
    private firebaseService: FirebaseService) {
      this.routeAct.paramMap.subscribe(params => {
        const index = params.get('id');
        console.log('Índice recebido na página de detalhes:', indeid);
      });
     }

  ngOnInit() {
    this.receita = history.state.receita;
    console.log(this.receita);
    this.nome = this.receita.nome;
    this.preparo = this.receita.preparo;
    this.criador = this.receita.criador;
    this.historia = this.receita.historia;
    this.tipo = this.receita.tipo;
    this.image = this.receita.image;
    this.ingrediente = this.receita.ingrediente;
  }
    


  editar(){
    if(this.nome && this.ingredientes && this.preparo){
      let novaReceita : Receita = new Receita(this.nome, this.ingredientes, this.preparo);
      novaReceita.criador = this.criador;
      novaReceita.historia = this.historia;
      novaReceita.tipo = this.tipo;
      novaReceita.image = this.image;
      this.firebaseService.cadastrar(novaReceita);
      this.router.navigate(["/home"]);
    }else{
      this.presentAlert("Erro de cadastro", "Campos não preenchidos corretamente!");
    }
  }

  async presentAlert(subHeader: string, message: string) {
    const alert = await this.alertController.create({
      header: 'Erro!!!',
      subHeader: subHeader,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  adicioneImagem(event: any) {
    const file = event.target.files[0];
  
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.image = reader.result;
      };
      reader.readAsDataURL(file);
    }
  }


  adicionarIngrediente() {
    if (this.novoIngrediente.trim() !== '') {
      this.ingredientes.push(this.novoIngrediente);
      this.novoIngrediente = ''; // Limpa o campo de entrada
    }
  }

  removerIngrediente(index: number) {
    this.ingredientes.splice(index, 1);
  }

  excluir(){
    this.firebaseService.excluirReceita(this.receita);
    this.router.navigate(['/home']);
  }

  uploadFile(imagem: any) {
    this.imagem = imagem.files
  }


}
