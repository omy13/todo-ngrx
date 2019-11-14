import {Todo} from './todo/models/todo.model';
import {ActionReducerMap} from '@ngrx/store';
import * as fromTodo from './todo/todo.reducer';
import * as fromFiltro from './filter/filter.reducer';

export interface AppState {
    todos: Todo[];
    filtro: string;
}
export const AppReducers: ActionReducerMap<AppState> = {
    todos: fromTodo.todoReducer,
    filtro: fromFiltro.filtroReducer
};
