# react-multiselect-search-dropdown

react-multiselect-search-dropdown is a react component which provides you the ability to select multiple values from the list along with a search option.

![React Multiselect](src/multi.gif)

## Installation

```bash
npm install --save react-multiselect-search-dropdown

```

## Usage

```python
import MultiSelectDropDown from 'react-multiselect-search-dropdown';

    var valuesArr=[
    {'id':1,'options':'Apple','selected':false},
    {'id':2,'options':'Apple2','selected':false},
    {'id':3,'options':'Apple3','selected':false}
     ]                                     //each element should have a unique id,options that will be displayed and 'selected':false

     <MultiSelectDropDown
      id="dropdown1"                                            // pass a unique id for each multiselectdropdown
      options={valuesArr}                                       //an array with {id,value to be displayed,'selected':'false'}
      getSelectedValues={this.getValues.bind(this)}/>           //function that will give back all the selected values 
```


## License
[MIT](https://choosealicense.com/licenses/mit/)