import { Component, OnInit } from '@angular/core';
import { Receita } from 'src/app/services/pratos/prato';
import { CadastrarService } from 'src/app/services/cadastrar/cadastrar.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-detalhes',
  templateUrl: './detalhes.page.html',
  styleUrls: ['./detalhes.page.scss'],
})
export class DetalhesPage implements OnInit {
  public receitas : Receita[] = [];
  index!: number;

  constructor( private cadastrarService : CadastrarService,
    private routeAct: ActivatedRoute,
    private router: Router) { 
    this.receitas = this.cadastrarService.obterTodos();
    this.routeAct.paramMap.subscribe(params => {
      const index = params.get('index');
      console.log('Índice recebido na página de detalhes:', index);
    });
  }

  ngOnInit() {
    this.routeAct.paramMap.subscribe(params => {
      const indexParam = params.get('index');
      if (indexParam !== null) {
        this.index = +indexParam;
      }
    });
  }

  excluir(){
    this.cadastrarService.deletar(this.index);
    this.router.navigate(["/home"]);
  }
}
