import { Component, OnInit } from '@angular/core';
import * as Leaflet from 'leaflet';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
})
export class MapComponent implements OnInit {

  map: Leaflet.Map;

  constructor() { }

  ngOnInit() {
    this.map = new Leaflet.Map('mapId').setView([52, 11],5);

    Leaflet.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png', {
      attribution: 'pnp'
    }).addTo(this.map);

    console.log(this.map)

  }

}
