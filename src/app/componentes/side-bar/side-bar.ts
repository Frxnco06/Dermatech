import { Component } from '@angular/core';
import { RouterModule } from "@angular/router";

@Component({
  selector: 'app-sidebar',
  templateUrl: './side-bar.html',
  styleUrls: ['./side-bar.css'],
  imports: [RouterModule]
})
export class SidebarComponent {

  pacientesOpen = false;

  togglePacientes() {
    this.pacientesOpen = !this.pacientesOpen;
  }
}
