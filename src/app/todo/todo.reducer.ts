import * as fromTodo from './todo.actions';
import {Todo} from './models/todo.model';

const estadoInicial: Todo[] = getStateStorage();

export function todoReducer ( state = estadoInicial, action: fromTodo.Acciones ) {
    switch (action.type) {
        case fromTodo.AGREGAR_TODO:
            const todo = new Todo(action.texto);
            // clona el array, añade uno y retorna uno nuevo
            setStateStorage([ ...state, todo ]);
            return [ ...state, todo ];
        case fromTodo.TOGGLE_TODO:
            // Siempre hay que retornar un estado nuevo, por eso el uso del map, crea un nuevo array
            const newState = state.map( todoEdit => {
                if (todoEdit.id === action.id){
                    return {
                        ...todoEdit,
                        completado: !todoEdit.completado
                    };
                } else {
                    return todoEdit;
                }
            });
            setStateStorage(newState);
            return newState;
        case fromTodo.EDITAR_TODO:
            // Siempre hay que retornar un estado nuevo, por eso el uso del map, crea un nuevo array
            const nnewState = state.map( todoEdit => {
                if (todoEdit.id === action.id){
                    return {
                        ...todoEdit,
                        texto: action.texto
                    };
                } else {
                    return todoEdit;
                }
            });
            setStateStorage(nnewState);
            return newState;
        case fromTodo.BORRAR_TODO:
            setStateStorage(state.filter( todoEdit => todoEdit.id !== action.id));
            return state.filter( todoEdit => todoEdit.id !== action.id);
        case fromTodo.BORRAR_ALL_TODO:
            setStateStorage(state.filter( todoEdit => !todoEdit.completado));
            return state.filter( todoEdit => !todoEdit.completado);
        case fromTodo.TOGGLE_ALL_TODO:
            const nnnewState = state.map( todoEdit => {
                return {
                    ...todoEdit,
                    completado: action.completado
                };
            });
            setStateStorage(nnnewState);
            return nnnewState
        default:
            setStateStorage(state);
            return state;
    }
}

export function setStateStorage(state) {
    localStorage.setItem('state', JSON.stringify(state));
}

export function getStateStorage() {
    if (localStorage.getItem('state') != null) {
        return JSON.parse(localStorage.getItem('state'));
    } else {
        return [];
    }
}
