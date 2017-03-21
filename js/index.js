var calc = (function() {
var calcRes = ["0"]; var tempVal = "0"; var dispOk =true;
  function isValid(){
    var chk1=calcRes.reduce(function(a,b){
      return a.concat(b);},'');
      //check to see if max digit exceeded
      dispOk=(chk1.length>24 )||( tempVal.length > 11)?false:true;
      //if result is decimal then trim to 11 numbers
      if (!dispOk){tempVal='0';calcRes=['Max digit exceeded'];}
  };
  function sign(val) {
    if (calcRes[0]=='Max digit exceeded'){clear();return;}
    if (calcRes[calcRes.length - 1].replace(/=/,'').length > 0) {
      if(calcRes[calcRes.length-1][0]==='='){
      calcRes=[calcRes[calcRes.length - 1].replace(/=/,'')];
      calcRes.push(val);
      calcRes.push('')
      tempVal = val;
      }else {
        calcRes.push(val);
        calcRes.push('')
      tempVal = val;
      }
      isValid();
};
     };
     //update all results for equals sign
  function result() {
    var tVal;
    tVal=calcRes.reduce(function(a,b){return a.concat(b);}).replace('x','*').replace('÷','/');
    if(/=/.test(tVal)){return};
    if(/[0-9][\+\-\/*\xF7][0-9]/.test(tVal)) { tempVal=eval(tVal);} else {return;};
    //if it is a decimal result then make fixed
    tempVal=(Number.isInteger(tempVal))?tempVal:tempVal=Number(tempVal.toFixed(3)).toString();
    calcRes.push('='+ tempVal);
    isValid();
  };
  function clear() {
    calcRes = ["0"]; tempVal = "0";  };
  //cancel the last entry
  function cancel() {
    var tVal;
    tVal=calcRes.reduce(function(a,b){return a.concat(b);}).replace('x','*').replace('÷','/');
    if(/=/.test(tVal)){
      clear();
      return;};
    if(calcRes.length!==0 && calcRes[0]!=='0'){
    calcRes.pop() ;
    calcRes=calcRes.length===0?['0']:calcRes;

    tempVal = calcRes[calcRes.length - 1];
     if (/^[+-x\xF7]/.test(tempVal)){calcRes.push('');}
  }else {    clear();
  } };
  return {
  display: function() { return [tempVal, calcRes]; },
  keyVal:  function(val) {
    switch(val){
    case '0':  tempVal=(tempVal==='0')?'0':tempVal+val; break;
    case 'plus': sign('+'); break;
    case 'minus': sign('-'); break;
    case 'divide': sign('÷'); break;
    case 'times': sign('x'); break;
    case 'point': if (/\./.test(tempVal)){
      val='';
    } else{
      tempVal=tempVal.replace(/^[\+\-\/x\.\xF7]/,'') + '.'}
      tempVal=tempVal.toString().replace(/^\./,'0.');
      ; break;
    case 'ac': clear(); break;
    case  'ce': cancel(); break;
    case  'result': result(); break;
    default: if (/\./.test(tempVal)){
      tempVal=tempVal.toString().replace(/^[\+\-\/x\xF7]/,'')
      }else{
        tempVal=tempVal.toString().replace(/^[0\+\-\/x\.\xF7]/,'');
      }
    tempVal+= val;

    if (calcRes.length > 0) {calcRes.pop(); };
    calcRes.push(tempVal);
  }
  isValid();
  }
   };
    })();
    $(".btn").click(function(eventObject) {
      calc.keyVal(eventObject.target.id);
    $("#dv").text(calc.display()[0]);
    $("#ds").text(calc.display()[1].reduce(function(a,b){
      return a.concat(b);},'')
                  );
    });
