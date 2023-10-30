import { Component, OnInit } from '@angular/core';
import { Router} from '@angular/router';
import { Receita } from 'src/app/services/pratos/prato';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-adicionar',
  templateUrl: './adicionar.page.html',
  styleUrls: ['./adicionar.page.scss'],
})
export class AdicionarPage implements OnInit {
  public nome! : string;
  public preparo! : string;
  public criador! : string;
  public historia!: string;
  public tipo!: number;
  public image!: any;
  novoIngrediente: string = '';
  ingredientes: string[] = [];
  
  constructor(private router : Router,
    private firebaseService : FirebaseService ) { }

  ngOnInit() {
  }

  cadastrar(){
    if(this.nome && this.ingredientes && this.preparo){
      let novaReceita : Receita = new Receita(this.nome, this.ingredientes, this.preparo);
      novaReceita.criador = this.criador;
      novaReceita.historia = this.historia;
      novaReceita.tipo = this.tipo;
      novaReceita.image = this.image;
      this.firebaseService.cadastrar(novaReceita);
      .then(() =>  this.router.navigate(["/home"]))
      .catch((error) => {
        console.log(error)
      this.presentAlert("Erro de cadastro", "Campos não preenchidos corretamente!");
    })
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
}
