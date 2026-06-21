import { Component, Input, OnInit , OnChanges, SimpleChanges} from '@angular/core';

@Component({
    selector: 'app-notificacion',
    templateUrl: './notificacion.component.html',
    styleUrls: ['./notificacion.component.css'],
    standalone: false
})
export class NotificacionComponent implements OnChanges {

  @Input() mensaje: string | null = null;
  @Input() tipo: 'exito' | 'error' = 'exito';
  visible: boolean = false;

  ngOnChanges() {
    if (this.mensaje) {
      this.visible = true;
      setTimeout(() => this.visible = false, 5000); // Muestra el mensaje por 3 segundos
    }
  }
}
