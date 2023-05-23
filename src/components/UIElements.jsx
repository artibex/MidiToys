import { Color } from 'paper/dist/paper-core';
import { createSignal, createEffect } from 'solid-js';
import { baseUrl } from "../js/path.js"

export function DetailsFillerCenter(summeryName, content) {
    return (
      <details class="marginAuto">
        <summary class="textAlignCenter marginAuto">
          {summeryName}
        </summary>
        <br />
        {content}
      </details>
    );
}

export function SliderInput(props) {
  const [value, setValue] = createSignal(props.value);
  if(props.class == undefined) props.class = "sliderInput marginLeft10";
  var factor = props.factor;
  if(factor == undefined) factor = 1;

  // Synchronize the value prop with changes from the outside
  createEffect(() => {
    setValue(props.value);
  });

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    props.onChange(newValue / factor);
  };
  
  return(
    <input
        class={props.class}
        type="range"
        min={props.minMaxStep[0]}
        max={props.minMaxStep[1]}
        step={props.minMaxStep[2]}
        value={value() * factor}
        onChange={handleChange}
    />
  );
}

export function NumberInput(props) {
  const [value, setValue] = createSignal(props.value);
  if(props.class == undefined) props.class = "numberInput";
  var factor = props.factor;
  if(factor == undefined) factor = 1;

  createEffect(() => {
    setValue(props.value);
  });

  const handleChange = (event) => {
    const newValue = parseInt(event.target.value);
    setValue(newValue);
    props.onChange(newValue / factor); 
  };

  return (
    <input
      class={props.class}
      type="number"
      min={props.minMaxStep[0]}
      max={props.minMaxStep[1]}
      step={props.minMaxStep[2]}
      value={value() * factor}
      onChange={handleChange}
    />
  );
}

export function CheckboxInput(props) {
  const [checked, setChecked] = createSignal(props.checked);

  createEffect(() => {
    setChecked(props.checked);
  });

  const handleChange = () => {
    setChecked(!checked());
    props.onChange(checked());
  };

  return (
    <input
      class="toggleInput"
      type="checkbox"
      checked={checked()}
      onChange={handleChange}
    />
  );
}

export function Button(props) {
  if(props.class == undefined) props.class = "thinButton";
  if(props.label == undefined) props.label = "Please Set Label";
  if(props.id == undefined) props.id = "";

  const handleClick = () => {
    props.onClick();
  };

  return (
    <button
      class={props.class}
      id={props.id}
      onClick={handleClick}
    >
      {props.label}
    </button>
  );
}

export function SVG(props) {
  if(props.alt === undefined) props.alt="SVG Image"
  if(props.class === undefined) props.class="";
  if (props.width === undefined) props.width = "20";
  if (props.height === undefined) props.height = "20";
  if (props.flipX === undefined) props.flipX = false;
  if (props.flipY === undefined) props.flipY = false;

  let transformValue = "";
  if (props.flipX) transformValue += " scaleX(-1) ";
  if (props.flipY) transformValue += " scaleY(-1) ";

  const svgStyles = {
    transform: transformValue,
  };

  var path = baseUrl + props.src;

  return(
    <img
        class={props.class}
        alt={props.alt}
        src={path}
        width={props.width}
        height={props.height}        
        style={svgStyles}
      />
    );
}

export function NumberSliderCombo(props) {
  return(
    <div class="flexContainer">
      <NumberInput
          factor={props.factor}
          minMaxStep={props.minMaxStep}
          value={props.value}
          onChange={props.onChange}
      />
      <SliderInput
          factor={props.factor}
          minMaxStep={props.minMaxStep}
          value={props.value}
          onChange={props.onChange}
      />
    </div>
  )
}

export function CheckboxUIElement(props) {
  return(
    <div class="flexContainer">
      <div>{props.name}</div>
      <CheckboxInput 
        checked={props.checked}
        onChange={props.onChange}
      />
    </div>
  )
}

export function NumberSliderUIElement(props) {
  if(props.name == undefined) props.name = "define props.name pls";
  return(
    <div class="flexContainer">
      <div>{props.name}</div>
      <NumberSliderCombo 
        factor={props.factor}
        minMaxStep={props.minMaxStep}
        value={props.value}
        onChange={props.onChange}
      />
    </div>
  )
}

export function JsonFileUploader(props) {
  const handleFileSelect = (event) => {
    const files = event.target.files;
    // const file = event.target.files[0];
    
    if (files.length > 0) {
      console.log("UPLOADED file count = " + files.length);
      Array.from(files).forEach((file) => {
        const reader = new FileReader();

        //When loaded, call back with data
        reader.onload = () => {
          const json = JSON.parse(reader.result);
          props.onFileUpload(file.name, json);
        }
        //Read plain text in
        reader.readAsText(file);
      });
    }
  };

  return (
    <input type="file" accept=".json" multiple onChange={handleFileSelect} />
  );
}