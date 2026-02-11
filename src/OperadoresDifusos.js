/*
 * Lógica difusa: operadores lógicos AND, OR y NOT.
 */

export function OperadorAND ( a, b ) {
    var valor = 0.0;
    valor = Math.min( a, b );
    return valor;
}

export function OperadorOR ( a, b ) {
    var valor = 0.0;
    valor = Math.max( a, b );
    return valor;
}

export function OperadorNOT ( a ) {
    var valor = 0.0;
    valor = 1.0 - a;
    return valor;
}
