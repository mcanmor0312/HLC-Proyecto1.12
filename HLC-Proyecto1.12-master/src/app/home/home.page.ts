import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  animals: any[] = [];
  filteredAnimals: any[] = [];
  filtro: string = '';

  constructor(private httpClient: HttpClient) {
    this.httpClient.get<any[]>('https://raw.githubusercontent.com/mcanmor0312/JSON/refs/heads/master/JSON.json')
      .subscribe(data => {
        this.animals = data;
        this.filteredAnimals = data; // Inicialmente mostrar todos los animales
      });
  }

  // Método para filtrar animales
  applyFilter() {
    const filterText = this.filtro.toLowerCase();

    this.filteredAnimals = this.animals.filter(animal => {
      // Buscar el texto en cualquier propiedad relevante del animal
      return Object.values(animal).some(value => {
        if (value === null || value === undefined) {
          return false; // Ignorar valores nulos o indefinidos
        }
        return value.toString().toLowerCase().includes(filterText);
      });
    });
  }
}
