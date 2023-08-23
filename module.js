function Sprintf(){

  //need string and at least 1 argument
  if (arguments.length === 0) return;

  if (arguments.length  === 1) return arguments[0];


  const convertString = (str,$type) =>{
    if (str === '') {
      return str;
    }
    switch ($type) {

      //ASCII character
      case 'c':
          str = parseInt(str);
          str = (String.fromCharCode(str));
        break;

        //int number with 2 decimals
      case 'd':
          str = parseInt(str).toFixed(2);
        break;

        //octal number
      case 'o':
          str = parseInt(str);
          str = str.toString(8);
        break;
      default:
        break;
    }
    return str;
  }

  let $str = arguments[0]
  let items = [...arguments];
  items.shift();

  //regex that matchs on number and
  const baseRegex = /(\%[0-9]\$[b-g|o|s|u|x]|\%[b-g|o|s|u|x])/g;

  const totals = [...$str.match(baseRegex)];


  let currentElement = 0;
  let output = $str.replaceAll(baseRegex,function(match, contents, offset, input_string){

      //check if is int number
      let isIndex = contents.matchAll(/\%([0-9])\$([b-g|o|s|u|x])/g);

      let outString = '';
      if (isIndex) {
        isIndex = [...isIndex];
        if (isIndex.length > 0) {
          //get index inside string @example %1$s
          let index = parseInt(isIndex[0][1]) - 1;
          let $elI = items[index];
          if (typeof $elI != 'undefined') {
            outString = $elI;
          }
        }
      }
      if (outString === '') {
        let argItem = items[currentElement];
        if (typeof argItem != 'undefined') {
          outString = argItem;
        }
      }

      let $type = contents.slice(-1);
      outString = convertString(outString,$type);
      //update index of args
      currentElement++;

      return outString;
  });


  return output;

}


export default Sprintf;
