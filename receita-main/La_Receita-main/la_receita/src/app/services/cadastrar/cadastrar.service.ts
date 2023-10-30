import { Injectable } from '@angular/core';
import { Receita } from '../pratos/prato';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { finalize } from 'rxjs/operators';
import { AngularFireStorageModule } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})

export class FirebaseService {
  private PATH : string = 'receita'

  constructor( private angularFirestore: AngularFirestore) {
    let c1 : Receita = new Receita('Pão com mateiga', ['pão', 'manteiga'] ,'Pegue o pão e passe manteiga nele');
    c1.tipo = 0
    c1.image = "https://media-cdn.tripadvisor.com/media/photo-s/09/fe/4e/47/pao-com-manteiga-na-chapa.jpg"
    this.listaDeReceitas.push(c1);
   }

   cadastrar(receita : Receita){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
   }

   buscarTodos(){
    return this.angularFirestore.collection(this.PATH).snapshotChanges();
  }

   deletar(receita : Receita){
    return this.angularFirestore.collection(this.PATH).doc(receita.id).delete();
   }

   atualizar(receita : Receita , id : string){
    return this.angularFirestore.collection(this.PATH).doc(id)
    .update({
      nome: receita.nome,
      ingrediente: receita.ingrediente,
      preparo: receita.preparo,
      criador: receita.criador,
      historia: receita.historia,
      tipo: receita.tipo,
      image: receita.image
    })

   }

   obterPorIndice(indice : number) : Receita{
    return this.listaDeReceitas[indice];
   }


   
  uploadImage(imagem: any, receita: Receita){
    const file = imagem.item(0)
    if (file.type.split('/')[0] !== 'image') {
     console.error('Tipo Não Suportado!')
     return;
    }
    const path = `images/${new Date().getTime()}_${file.name}`;
    const fileRef = this.angularFireStorage.ref(path);
    let task = this.angularFireStorage.upload(path, file)
    task.snapshotChanges().pipe(
      finalize(()=>{
        let uploadedFileURL = fileRef.getDownloadURL();
        uploadedFileURL.subscribe(resp=>{
          receita.downloadURL = resp;
          if(!receita.id){
            this.create(receita);
          }else{
            this.update(receita, receita.id);
          }

      })
    })).subscribe()
    return task;
  }

  }
  