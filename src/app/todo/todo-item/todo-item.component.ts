import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {Todo} from '../models/todo.model';
import {FormControl, Validators} from '@angular/forms';
import {Store} from '@ngrx/store';
import {AppState} from '../../app.reducers';
import {EditarTodoAction, ToggleTodoAction} from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styles: []
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;
  @ViewChild('txtInput') txtInput: ElementRef;
  checkField: FormControl;
  textInput: FormControl;
  edit: boolean;

  constructor(private store: Store<AppState>) { }

  ngOnInit() {
    console.log(this.todo);
    this.checkField = new FormControl(this.todo.completado);
    this.textInput = new FormControl(this.todo.texto, Validators.required);

    this.checkField.valueChanges.subscribe( value => {
        const accion = new ToggleTodoAction( this.todo.id );
        this.store.dispatch(accion);
    });
  }

  editar(){
    this.edit = true;

    setTimeout( ()=> {
      this.txtInput.nativeElement.focus();
    },1 );

  }

  terminarEdicion(){
    this.edit = false;
    const accion = new EditarTodoAction( this.todo.id, this.textInput.value );
    this.store.dispatch(accion);
  }

}
