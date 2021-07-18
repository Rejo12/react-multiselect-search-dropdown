"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./dropdown.css");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function _getRequireWildcardCache() { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return; var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var currentState = "";

function MultiSelectDropDown(props) {
  // console.log("props",props);
  var _useState = (0, _react.useState)(null),
      _useState2 = _slicedToArray(_useState, 2),
      click = _useState2[0],
      setClick = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      selectedValues = _useState4[0],
      setSelectedValues = _useState4[1];

  var _useState5 = (0, _react.useState)(props.options),
      _useState6 = _slicedToArray(_useState5, 2),
      propArray = _useState6[0],
      setPropArray = _useState6[1];

  var _useState7 = (0, _react.useState)([]),
      _useState8 = _slicedToArray(_useState7, 2),
      tooltipText = _useState8[0],
      setToolTipText = _useState8[1];

  (0, _react.useEffect)(function () {
    var selectArr = []; // props.options.map((item)=>{
    //   if(item.selected == true){
    //     console.log("item",item);
    //     let obj = {};
    //       obj = item;
    //       selectArr.push(obj);
    //   }
    // })

    selectArr = props.options.filter(function (item) {
      return item.selected === true;
    });
    var selectToolTip = selectArr.map(function (item) {
      return item.options;
    });
    setSelectedValues(selectArr);
    setToolTipText(selectToolTip);
    setClick('unclicked');
  }, []);
  (0, _react.useEffect)(function () {
    window.addEventListener('click', blurMethod);
  }, [selectedValues]);

  var blurMethod = function blurMethod() {
    // console.log("16",currentState);
    if (currentState === 'notFocus') {
      var elem = document.getElementById(props.id); // console.log("elem",elem);

      elem.style.display = 'none';
      elem.classList.add('hide');
      setClick('unclicked');
    }
  };

  var handleClick = function handleClick() {
    setClick('clicked');
  };

  var handleCheck = function handleCheck(id, event) {
    var newArr = selectedValues;
    var tmpTooltipText = tooltipText;

    if (event.target.checked === true) {
      var modifiedArray = props.options.map(function (item) {
        if (item.id === id) {
          var obj = {};
          obj = item;
          tmpTooltipText.push(item.options);
          newArr.push(obj);
          item.selected = true;
          return item;
        } else {
          return item;
        }
      });
    } else {
      var idIndex = newArr.map(function (o) {
        return o.id;
      }).indexOf(id);
      var toolTipEleIndex = tmpTooltipText.map(function (item) {
        return item;
      }).indexOf(newArr[idIndex].options);

      if (idIndex > -1) {
        newArr.splice(idIndex, 1);
      }

      if (toolTipEleIndex > -1) {
        tmpTooltipText.splice(toolTipEleIndex, 1);
      }

      var modifiedArray = props.options.map(function (item) {
        if (item.id === id) {
          item.selected = false;
          return item;
        } else {
          return item;
        }
      });
    }

    setSelectedValues(newArr);
    setPropArray(modifiedArray);
    setToolTipText(tmpTooltipText);
    props.getSelectedValues(selectedValues);
  };

  var handleBlur = function handleBlur() {
    // console.log("61");
    //  setClick('unclicked')
    currentState = "notFocus";
  };

  var handleMouse = function handleMouse() {
    // console.log("Mouse Down");
    var elem = document.getElementById(props.id); // console.log("elemFocus",elem);

    elem.style.display = 'block';
    elem.classList.remove('hide');
    currentState = "focus";
  };

  var handleChange = function handleChange(e) {
    // console.log("change detected",e.target.value);
    var filteredList = propArray.filter(function (o) {
      return o.options.indexOf(e.target.value) > -1;
    }); // console.log("78",filteredList);

    if (filteredList.length > 0 && filteredList.length !== propArray.length) {
      // console.log("setState");
      setPropArray(filteredList);
    }
  }; // console.log("render",selectedValues);


  return /*#__PURE__*/_react.default.createElement("div", {
    tabIndex: "100",
    onBlur: handleBlur,
    className: "tooltipForMultiselect"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "dropdown valueDisplay",
    tabIndex: "0",
    onClick: handleClick,
    onMouseDown: handleMouse
  }, click === 'unclicked' && selectedValues.length + ' values selected'), /*#__PURE__*/_react.default.createElement("span", {
    className: "tooltiptext"
  }, selectedValues.length > 0 && tooltipText.map(function (item) {
    return item + " , ";
  })), /*#__PURE__*/_react.default.createElement("div", {
    id: props.id,
    className: "dropdown-content hide",
    onClick: handleMouse
  }, click === 'clicked' && /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", {
    onClick: handleMouse
  }, /*#__PURE__*/_react.default.createElement("input", {
    type: "text",
    placeholder: "Search here",
    onChange: function onChange(event) {
      return handleChange(event);
    }
  })), /*#__PURE__*/_react.default.createElement("br", null)), click === 'clicked' && propArray.map(function (item) {
    return /*#__PURE__*/_react.default.createElement("div", {
      onClick: handleMouse,
      key: item.id,
      className: "ddContent"
    }, /*#__PURE__*/_react.default.createElement("input", {
      type: "checkbox",
      id: item.id,
      className: "cursor",
      onChange: function onChange(event) {
        return handleCheck(item.id, event);
      },
      checked: item.selected
    }), "\xA0\xA0\xA0\xA0", /*#__PURE__*/_react.default.createElement("label", null, item.options), item.secondaryValue != undefined && item.secondaryValue != "" && /*#__PURE__*/_react.default.createElement("label", null, item.secondaryValue), /*#__PURE__*/_react.default.createElement("br", null));
  })));
}

var _default = MultiSelectDropDown;
exports.default = _default;
