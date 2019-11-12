import * as fromTodo from './todo.actions';
import {Todo} from './models/todo.model';

const estadoInicial: Todo[] = [];

export function todoReducer ( state = estadoInicial, action: fromTodo.Acciones ) {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            // clona el array, añade uno y retorna uno nuevo
            return [ ...state, todo ];
        case fromTodo.TOGGLE_TODO:
            // Siempre hay que retornar un estado nuevo, por eso el uso del map, crea un nuevo array
            return state.map( todoEdit => {
                if (todoEdit.id === action.id){
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });
        case fromTodo.EDITAR_TODO:
            // Siempre hay que retornar un estado nuevo, por eso el uso del map, crea un nuevo array
            return state.map( todoEdit => {
                if (todoEdit.id === action.id){
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });
        default:
            return state;
    }
}
