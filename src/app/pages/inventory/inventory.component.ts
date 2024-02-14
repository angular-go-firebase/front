import { Component, OnInit } from '@angular/core';
import { ConnectionApiService } from 'src/app/connection-api.service';

@Component({
  selector: 'app-inventory',
  templateUrl: './inventory.component.html',
  styleUrls: ['./inventory.component.scss']
})
export class InventoryComponent implements OnInit {

  constructor(private apiService: ConnectionApiService){}

  public products: any = [] //tipar
  public ready: boolean = true;
  public searchTerm: string = '';

  ngOnInit(): void {
    this.apiService.getProducts().subscribe({
      next: data => this.products = data,
      error: error => console.log(error),
      complete: () => {
        console.log(this.products),
        this.ready = false;
      }
    })
  }

  filteredProducts(): any[] {
    if (!this.searchTerm) {
      return this.products;
    }
    return this.products.filter((product: { Description: string; }) =>
      product.Description.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  productSold(id: string) {
    //AQUI ABRIR UM POPUP E PERGUNTAR O PREÇO QUE FOI VENDIDO, E ALTERAR A DATA DO PRODUTO PARA A DATA DA VENDA
    this.apiService.deleteProduct(id).subscribe({
      next: res => console.log("resposta:", res),
      complete: () => window.location.reload() //AQUI ATIVAR UM SPINNER ATÉ RECARREGAR A PÁGINA OU TENTAR USAR OBSERVABLES PARA ATUALIZAR AUTOMATICAMENTE
    })
  }

  editProduct(id: string) {
    alert("editar")
  }
}
