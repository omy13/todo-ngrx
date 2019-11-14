import { Component, OnInit } from '@angular/core';
import * as fromFiltro from '../../filter/filter.actions';
import * as fromTodo from '../todo.actions';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {Todo} from '../models/todo.model';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styles: []
})
export class TodoFooterComponent implements OnInit {

  filtrosValidos: fromFiltro.filtrosValidos[] = ['todos', 'completados', 'pendientes'];
  filtroActual: string;
  pendientes: number;

  constructor(private strore: Store<AppState>) { }

  ngOnInit() {
    this.strore.subscribe( state =>{
      this.contarPendientes(state.todos);
      this.filtroActual = state.filtro;
    });
  }

  cambiarFiltro(nuevoFiltro: fromFiltro.filtrosValidos){
    const accion = new fromFiltro.SetFiltroAction(nuevoFiltro);
    this.strore.dispatch(accion);
  }

  contarPendientes(  todos: Todo[] ){
    this.pendientes = todos.filter( todo => !todo.completado ).length;
  }

  borrarTodo(){
    const accion = new fromTodo.BorrarAllTodoAction();
    this.strore.dispatch(accion);
  }

}
