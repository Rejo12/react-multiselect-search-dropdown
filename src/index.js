import React,{useState,useEffect} from 'react';
import './dropdown.css';

let currentState="";

function MultiSelectDropDown(props){
  // console.log("props",props);
const [click,setClick]=useState(null);
const [selectedValues,setSelectedValues]=useState([]);
const [propArray,setPropArray] = useState(props.options);
const [tooltipText,setToolTipText]=useState([]);

useEffect(() => {
  let selectArr=[];
  // props.options.map((item)=>{
  //   if(item.selected == true){
  //     console.log("item",item);
  //     let obj = {};
  //       obj = item;
  //       selectArr.push(obj);
  //   }
  // })

  selectArr = props.options.filter((item)=>{
   return item.selected === true;
  })
  var selectToolTip = selectArr.map((item)=>{
    return item.options;
  })
  setSelectedValues(selectArr);
  setToolTipText(selectToolTip);
  setClick('unclicked');

},[]);


useEffect(() => {
  window.addEventListener('click', blurMethod);
},[selectedValues]);


let blurMethod=()=>{
  // console.log("16",currentState);
if(currentState === 'notFocus'){
  var elem = document.getElementById(props.id);
  // console.log("elem",elem);
  elem.style.display = 'none';
  elem.classList.add('hide');
  setClick('unclicked');
}
}

let handleClick = () =>{
  setClick('clicked');
}
let handleCheck = (id,event) =>{
  var newArr = selectedValues;
  var tmpTooltipText=tooltipText;
  if(event.target.checked === true){
  var modifiedArray =  props.options.map((item)=>{
      if(item.id === id){
        var obj = {};
        obj = item;
        tmpTooltipText.push(item.options)
        newArr.push(obj);
        item.selected=true;
        return item;
      }
      else {
        return item;
      }
    })
  }
  else {
    var idIndex = newArr.map((o)=>{return o.id}).indexOf(id);
    var toolTipEleIndex=tmpTooltipText.map((item)=>{return item}).indexOf(newArr[idIndex].options);
    if(idIndex > -1){
      newArr.splice(idIndex,1);
    }
    if(toolTipEleIndex > -1){
      tmpTooltipText.splice(toolTipEleIndex,1);
    }
    var modifiedArray =  props.options.map((item)=>{
        if(item.id === id){
          item.selected=false;
          return item;
        }
        else {
          return item;
        }
      })
  }
  setSelectedValues(newArr);
  setPropArray(modifiedArray);
  setToolTipText(tmpTooltipText);
  props.getSelectedValues(selectedValues);
}

let handleBlur=()=>{
  // console.log("61");
//  setClick('unclicked')

  currentState="notFocus"
}

let handleMouse=()=>{
  // console.log("Mouse Down");
  var elem = document.getElementById(props.id);
  // console.log("elemFocus",elem);
  elem.style.display = 'block';
  elem.classList.remove('hide');
  currentState="focus"
}
let handleChange=(e)=>{
  // console.log("change detected",e.target.value);
  var filteredList = propArray.filter((o)=> {
    return o.options.indexOf(e.target.value) > -1
   })
  // console.log("78",filteredList);
  if(filteredList.length > 0 && filteredList.length !== propArray.length){
    // console.log("setState");
    setPropArray(filteredList);
  }
}
// console.log("render",selectedValues);

return(
  <div tabIndex="100" onBlur={handleBlur} className="tooltipForMultiselect">
  <div  className="dropdown valueDisplay" tabIndex="0" onClick={handleClick} onMouseDown={handleMouse}>
    {(click === 'unclicked') &&
    selectedValues.length+ ' values selected'

    }

  </div>
  <span className="tooltiptext">
   {(selectedValues.length > 0)&&
    tooltipText.map((item)=>
    item +" , "
    )

   }
    </span>
  <div id={props.id} className="dropdown-content hide" onClick={handleMouse} >
  {(click === 'clicked') &&
  <>
  <div onClick={handleMouse}>
    <input type="text" placeholder="Search here" onChange={(event)=>handleChange(event)} />
  </div>
  <br/>
</>

  }
  {(click === 'clicked') &&
  propArray.map((item)=>
  <div onClick={handleMouse} key={item.id} className="ddContent" >
  <input type="checkbox" id={item.id} className="cursor" onChange={(event)=>handleCheck(item.id,event)}
         checked={item.selected} />&nbsp;&nbsp;&nbsp;&nbsp;
  <label>{item.options}</label>
  {(item.secondaryValue != undefined && item.secondaryValue != "")&&
    <label>{item.secondaryValue}</label>
  }
  <br/>
  </div>
)

  }
  </div>
  </div>
)

}

export default MultiSelectDropDown;
