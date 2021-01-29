//Constantes para los elementos de la calculadora y variables usadas
const numeros = document.querySelectorAll("[numero]");
const operaciones = document.querySelectorAll("[operacion]");
const botonIgual = document.querySelector("[igual]");
const botonDelete = document.querySelector("[delete");
const botonAc = document.querySelector("[ac]");
const anterior = document.querySelector("[anterior]");
const actual = document.querySelector("[actual]");
const coma = document.querySelector("[coma]");
const operacionesComa = document.querySelectorAll("[operacionComa]");


//Variables usadas 
let numAnterior = 0;
let oper = "";
let stringOrdenada = "";
let indexComa = 0;
let arrayComa = [];
let suma = 0;


//Funciones flecha usadas

//Funcion para añadir un numero en la pantalla de la calculadora
let añadirNumero = numero => {
    if (actual.innerText.includes(".") && numero.innerText === ".") return;
    actual.innerText = actual.innerText.toString() + numero.innerText.toString();
}

//Añade la operacion pedida
let añadirOperacion = operacion => {
    if(actual.innerText.toString() === ""){
      return;
    }
    else if(actual.innerText.toString().includes(",")){ return;}
    oper = operacion.innerText.toString();
    actual.innerText = actual.innerText + operacion.innerText.toString();
    anterior.innerText = actual.innerText;
    actual.innerText = "";
    numAnterior = anterior.innerText.substring(0, anterior.innerText.toString().length - 1);

}

//Funcion que realiza las operaciones aritmeticas
let calcular = (num1, num2, operacion) =>{
    if (anterior.innerText.toString() == "") {
        anterior.innerText = actual.innerText;
    }

    let primerNum = parseFloat(num1);
    let segundoNum = parseFloat(num2);
     
    if (operacion.toString() === "+") {
        actual.innerText = primerNum + segundoNum;
    } else if (operacion === "-") {
        actual.innerText = segundoNum - primerNum;
    } else if (operacion === "*") {
        actual.innerText = primerNum * segundoNum;
    } else if (operacion === "/") {
        actual.innerText = segundoNum / primerNum;
    }else if(operacion === "!"){
        actual.innerText = factorial(primerNum);
    }else if(operacion === "%"){
        actual.innerText = segundoNum%primerNum;
    }else if (operacion === "POW"){
      actual.innerText = Math.pow(segundoNum,primerNum);
    }else if (operacion === "SQRT"){
      actual.innerText = Math.sqrt(segundoNum);
    }

    anterior.innerText = "";
}


//Calcula el factorial recursivamente
let factorial = num =>{
  if(num === 1 ){
      return 1;
  }
  else{
      return num * factorial(num-1);
  }
}



//Todas las funciones con coma
let funcionesComa = operacion =>{
    if(operacion.innerText== "Ordenar"){ 
     ordenarComa(arrayComa);
    }else if(operacion.innerText == "Revertir"){
      revertirComa(arrayComa);
    }else if(operacion.innerText == "Quitar"){
      quitarComa(arrayComa);
    }else if(operacion.innerText == "Sumatorio"){
      sumatorioComa(arrayComa); 
    }
}

//Parsea una array de string a float
let parseArray = array =>{
    for(let i=0;i<array.length;i++){
      array[i] = parseFloat(array[i]);
    }
    return array;
}

//Ordena los valores con coma de menor a mayor con un bubble sort
let ordenarComa = array =>{
  let arrayOrdenada = parseArray(arrayComa);
  let comodin = 0;

  for(let i=0;i<arrayOrdenada.length;i++){
    for(let j=0;j<arrayOrdenada.length;j++){
        if (arrayOrdenada[j] > arrayOrdenada[j + 1]) {
            comodin = arrayOrdenada[j];
            arrayOrdenada[j] = arrayOrdenada[j + 1];
            arrayOrdenada[j + 1] = comodin;
    }
  }
    actual.innerText = "";
    for(let i=0;i<arrayOrdenada.length;i++){
        actual.append(arrayOrdenada[i]+",");
    }
 }
 arrayOrdenada = [];
}

//Revierte los valores con coma
let revertirComa = array =>{
  let arrayNormal = parseArray(array);
  let arrayRevertida = [];
  
  for(let i=0;i<arrayNormal.length;i++){
   arrayRevertida.push(arrayNormal[(arrayNormal.length-1)-i]);
  }
  actual.innerText = "";
  for(let i=0;i<arrayRevertida.length;i++){
    actual.append(arrayRevertida[i]+",");
  }
  arrayNormal = [];
  arrayRevertida = [];
}

//Quita el valor de la derecha de los valores con coma
let quitarComa = array =>{
  arrayComa.pop();
  actual.innerText = "";
 
  for(let i=0;i<arrayComa.length;i++){
    actual.append(arrayComa[i]+",");
  }
}

//Metodo que suma los numeros en la sequencia de comas
let sumatorioComa = array =>{
suma = 0;
let arraySuma = [];

for(let i=0;i<arrayComa.length;i++){
  arraySuma.push(parseFloat(arrayComa[i]));
}

for(let i=0;i<arraySuma.length;i++){
    suma += arraySuma[i];
}

actual.innerText = "";
actual.append(suma);
arraySuma = [];
suma = 0;
}

//Eventos

//Evento para añadir numeros en la pantalla
numeros.forEach(num => {
    num.addEventListener("click", () => {
        añadirNumero(num);
    })
})

//Evento para añadir operaciones
operaciones.forEach(operacion => {
    operacion.addEventListener("click", () => {
        añadirOperacion(operacion);
    })
})

//El boton igual que proporciona el resultado a esas operaciones
botonIgual.addEventListener("click", () => {
  
    if(anterior.innerText.toString().includes("!")){
        actual.innerText = factorial(numAnterior);
    }else if(anterior.innerText != ""){
        calcular(actual.innerText, numAnterior, oper);
    }else {
      anterior.innerText = actual.innerText;
      actual.innerText = "";
    }  

    if(actual.innerText == ""){
        return;
    }

    if(actual.innerText == "NaN"){
      actual.innerText = "";
      anterior.innerText = "";
    } 
})

//Boton para limpiar info
botonAc.addEventListener("click", ()=>{

    actual.innerText = "";
    anterior.innerText = "";
    arrayComa = [];
    indexComa = 0;
})

//Borra un numero o operacion
botonDelete.addEventListener("click", () =>{
  let num = actual.innerText.length;
  actual.innerText = actual.innerText.toString().substring(0,num-1);
  console.log(num);
  arrayComa.pop();
})

//Boton coma para entrar en modo operaciones con coma
coma.addEventListener("click",() =>{
  if(anterior.innerText.toString() != ""){
    return;
  }
  if(actual.innerText.toString().substring(actual.innerText.length-1,actual.innerText.length) != "," && actual.innerText.length >=0){
    actual.innerText = actual.innerText.toString() + ",";
    arrayComa.push(actual.innerText.toString().substring(indexComa, actual.innerText.length-1));
      indexComa = actual.innerText.length;
      
    }
})

//Evento para cada operacion con comas
operacionesComa.forEach(operacion =>{
   operacion.addEventListener("click", ()=>{
     funcionesComa(operacion);
   })
})