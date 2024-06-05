
let display = document.getElementById('display');
  
let  setValue=(num)=>{
       display.value+=num;
   }
let equal = ()=>{
   try {
       display.value = eval(display.value);
   } catch (error) {
       alert('invalid calculation')
   }
  
}

let Clear = ()=>{
 display.value = '';
}

let del= () =>{
   display.value= display.value.slice(0,-1)
}