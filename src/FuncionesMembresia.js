/*
 * Lógica difusa: funciones de membresía.
 */

export function FuncionBool ( x, x0 ) {
    var membresia = 0.0;
    x = parseInt(x);

    if (x <= x0) { membresia = 0.0; }
    else { membresia = 1.0; }

    return membresia;
}

export function FuncionBoolInversa ( x, x0 ) {
    var membresia = 0.0;
    x = parseInt(x);

    if (x < x0) { membresia = 1.0; }
    else { membresia = 0.0; }

    return membresia;
}

export function FuncionGrado ( x, x0, x1 ) {
    var membresia = 0.0;
    x = parseInt(x);

    if (x <= x0) { membresia = 0.0; }
    else if (x>x0 && x<x1) {
        membresia = (x/(x1-x0)) - (x0/(x1-x0));
    }
    else if (x>=x1) { membresia = 1.0; }

    return membresia;
}

export function FuncionGradoInversa ( x, x0, x1 ) {
    var membresia = 0.0;
    x = parseInt(x);

    if (x <= x0) { membresia = 1.0; }
    else if (x>x0 && x<x1) {
        membresia = (x/(x1-x0)) + (x0/(x1-x0));
    }
    else if (x>=x1) { membresia = 0.0; }

    return membresia;
}

export function FuncionTriangulo ( x, x0, x1, x2 ) {
    var membresia = 0.0;
    x = parseInt(x);

    if (x <= x0) { membresia = 0.0; }
    else if (x>x0 && x<=x1) {
        membresia = (+x/(x1-x0)) - (x0/(x1-x0));
    }
    else if (x>x1 && x<=x2) {
        membresia = -((x/(x2-x1))) + (x2/(x2-x1));
    }
    else if (x>x2) { membresia = 0.0; }

    return membresia;
}

export function FuncionTrapezoide ( x, x0, x1, x2, x3 ) {
    var membresia = 0.0;
    x = parseInt(x);

    if (x<=x0) { membresia = 0.0; }
    else if (x>x0 && x<=x1) { membresia = (x/(x1-x0)) - (x0/(x1-x0)); }
    else if (x>x1 && x<=x2) { membresia = 1.0; }
    else if (x>x2 && x<=x3) { membresia = - (x/(x3-x2)) + (x3/(x3-x2)); }
    else if (x>x3) { membresia = 0.0; }

    return membresia;
}
