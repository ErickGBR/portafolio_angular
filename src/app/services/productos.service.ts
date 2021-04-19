import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../interfaces/producto.interface';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {

  cargando = true;
  producto: Producto[] =[];
  productosFiltrado: Producto[] =[];

  constructor( private http:HttpClient ) { 
    this.cargarProductos();

  }

  private cargarProductos(){


    return new Promise( (resolve, reject)=>{
      this.http.get('https://angular-portafolio-e6be9-default-rtdb.firebaseio.com/productos_idx.json')
        .subscribe((resp: Producto[])=>{
          //console.log(resp);
          this.producto = resp;
          this.cargando = false;
          resolve
        })

    });
    
}

getProducto(id:String){
    return this.http.get(`https://angular-portafolio-e6be9-default-rtdb.firebaseio.com/productos/${id}.json`);
}

buscarProducto(termino:string){
  if(this.producto.length==0){
      this.cargarProductos().then(()=>{
        this.filtrarProductos(termino)
      })
  }else{
        this.filtrarProductos(termino);
  }
  
  //this.productosFiltrado = this.producto.filter(producto=>{
    //return true
  //});
  
}

  private filtrarProductos(termino: string){
    //console.log(this.producto)
    
    this.productosFiltrado = [];
    termino = termino.toLocaleLowerCase();
  this.producto.forEach(prod=>{
    
    const tituloLower = prod.titulo.toLocaleLowerCase();

    if(prod.categoria.indexOf(termino) >=0 || tituloLower.indexOf(termino) >=0 ){
        this.productosFiltrado.push(prod)
      }
  })

  }
}
