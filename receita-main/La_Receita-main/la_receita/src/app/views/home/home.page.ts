import { Component } from '@angular/core';
import { Receita } from 'src/app/services/pratos/prato';
import { Router } from '@angular/router';
import { FirebaseService } from 'src/app/model/services/firebase.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage {
  public lista_receitas : Receita[] = [];


  constructor(private router : Router,
    private firebaseService: FirebaseService) {
      this.firebaseService.buscarTodos().subscribe(res => { this.lista_receitas = res.map(receita=> {
        return{
          id: receita.payload.doc.id,
          ...receita.payload.doc.data()as any
        }as Receita;
      })
    })

  }

  irParaCadastrarPage(){
    this.router.navigate(['/adicionar']);
  }

  editar(receita:Receita){
    this.router.navigateByUrl("/editar",
    {state: {receita:receita}});
  }

}


