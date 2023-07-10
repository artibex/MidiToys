import { createSignal, createEffect } from 'solid-js';
import { Icon } from '@iconify-icon/solid';
import { InputManager } from "@inputmanager";
import { CanvasManager} from "@canvasmanager"
import { MIDIInputModule } from "@input/MIDIInputModule";
import {ToyManager} from "@toymanager";
import {FirebaseManager} from "@firebaseManager"

const inputManager = new InputManager();
const frameManager = new CanvasManager();
const midiInputModule = new MIDIInputModule();
const toyManager = new ToyManager();
const firebaseManager = new FirebaseManager();

export function DetailsFillerCenter(props) {
  if(props.summeryName == undefined) props.summeryName = "";
  if(props.content == undefined) props.content = <></>;  
  if(props.detailClass == undefined) props.detailClass = "marginAuto width95";
  if(props.summeryClass == undefined) props.summeryClass = "textAlignCenter marginAuto";

  return (
      <details class={props.detailClass}>
        <summary class={props.summeryClass}>
          {props.summeryName}
        </summary>
        <br />
        {props.content}
      </details>
    );
}

export function SliderInput(props) {
  const [value, setValue] = createSignal(props.value);
  if(props.class == undefined) props.class = "sliderInput ";
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

export function TextInput(props) {
  if(props.placeholder == undefined) props.placeholder = "Cool Placeholder";
  if(props.id == undefined) props.id = "";
  if(props.class == undefined) props.class = "textInput";
  if(props.type == undefined) props.type = "";
  if(props.required == undefined) props.required = false;
  if(props.value == undefined) props.value = "";

  function HandleOnChange(event) {
    if (props.onChange !== undefined) {
      // console.log(event.target.value);
      props.onChange(event.target.value);
    }
  };

  if(props.required) {
    return(
      <input 
      type={props.type}
      class={props.class}
      id={props.id}
      placeholder={props.placeholder}
      value={props.value}
      onChange={HandleOnChange}
      required
      />
    )
  } else {
    return(
      <input 
      type={props.type}
      class={props.class}
      id={props.id}
      placeholder={props.placeholder}
      onChange={HandleOnChange}
      value={props.value}
      />
    )
  }
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
  if(props.divClass == undefined) props.divClass = props.class;
  if(props.label == undefined) props.label = "Please Set Label";
  if(props.id == undefined) props.id = "";

  const handleClick = () => {
    props.onClick();
  };

  return (
    <div class={props.divClass}>
      <button
        class={props.class}
        id={props.id}
        onClick={handleClick}
      >
        {props.label}
      </button>
    </div>
  );
}

export function ButtonIcon(props) {
  if(props.class == undefined) props.class = "iconButton";
  if(props.divClass == undefined) props.divClass = props.class;
  if(props.label == undefined) props.label = "";
  if(props.id == undefined) props.id = "";

  if(props.icon == undefined) props.icon = "mdi-light:alert";
  if(props.iconFirst == undefined) props.iconFirst = false;
  if(props.width == undefined) props.width = "20";
  if(props.hFlip == undefined) props.hFlip = false;
  if(props.vFlip == undefined) props.vFlip = false;

  function HandleClick() {
    if(props.onClick != undefined) {
      props.onClick();
    }
  };

  if(props.label == "") { //no label
    return (
      <div class={props.divClass}>
        <button
          id={props.id}
          onClick={HandleClick}
          class={props.class}
        >
          <div class="">
            <Icon icon={props.icon} class="marginAuto" width={props.width} hFlip={props.hFlip} vFlip={props.vFlip} />
          </div>
        </button>
      </div>
    );
  } else {
    if(props.iconFirst) { //Display icon before text
      return (
        <div class={props.divClass} >
          <button
            id={props.id}
            class={props.class}
            onClick={HandleClick}
          >
            <div class="flex justifyCenter">
              <div class={props.class}>
                <div class="marginRight10">
                  <Icon 
                    icon={props.icon}
                    width={props.width} 
                    hFlip={props.hFlip} 
                    vFlip={props.vFlip} 
                  />
                </div>
                <div>
                  {props.label}
                </div>
              </div>
            </div>
          </button>
        </div>
      );

    } else { //Display Icon after text
        return (
          <div class={props.divClass} >
            <button
              id={props.id}
              class={props.class}
              onClick={HandleClick}
            >
              <div class="flex justifyCenter">
                <div class={props.class}>
                  <div class="marginRight20">{props.label}</div>
                  <Icon icon={props.icon} width={props.width} hFlip={props.hFlip} vFlip={props.vFlip} />
                </div>
              </div>
            </button>
          </div>
        );
    }
  }
}

export function MIDIDeviceReloadButton(props) {
  if(props.label == undefined) props.label = "";
  if(props.class == undefined) props.class = "iconButton";
  if(props.id == undefined) props.id = "";

  if(props.icon == undefined) props.icon = "mdi-light:alert";
  if(props.width == undefined) props.width = "30";
  if(props.hFlip == undefined) props.hFlip = false;
  if(props.vFlip == undefined) props.vFlip = false;

  function handleClick() {
    // console.log("CLICKED on reload button");
    midiInputModule.LoadMIDIDevices();
  }

  return(
    <div class={props.class}>
      <ButtonIcon
        id={props.id}
        icon="material-symbols:wifi-protected-setup"
  
        onClick={() => handleClick}
        label={props.label}
  
        width={props.width}
        hFlip={props.hFlip}
        vFlip={props.vFlip}
      />
    </div>
  )
}

export function AvailableMIDIDevicesUIElement(props) {
  const [midiDevices, setMidiDevices] = createSignal("");

  function UpdateSignal() {
    const devices = inputManager.GetMIDIDevices();
  
    const deviceElements = devices.map((device, index) => (
      // <div key={index}>{device}</div>
      [device] + " "
    ));
      setMidiDevices(deviceElements);
  }
  
  frameManager.SubscribeHalfFramerate(UpdateSignal);
  return(
    <div>
      <h3> MIDI Devices: {midiDevices} </h3>
    </div>
  )
}

export function EmailLoginUIElement(props) {
  const [infoText, setInfoText] = createSignal("");
  
  if(props.class == undefined) props.class = "";
  if(props.id == undefined) props.id = "emailLogin";

  if(props.width == undefined) props.width = "30";
  if(props.hFlip == undefined) props.hFlip = false;
  if(props.vFlip == undefined) props.vFlip = false;

  const [email, setEmail] = createSignal("");
  const [password, setPassword] = createSignal("");

  function HandleLogin() {
    console.log("HANDLE email login")

    firebaseManager.EmailSignIn(email(), password());
    if(props.onLogin != undefined) {
      props.onLogin();
    }
  }

  function HandleRegister() {
    if(props.onRegister != undefined) {
      props.onRegister();
    }
  }

  function HandleForgotPassword() {
    if(props.onPasswordForgot != undefined) {
      props.onPasswordForgot();
    }
  }

  function HandleEmailChange(event) {
    setEmail(event.target.value);
    // email = event.target.value;
  }

  function HandlePasswordChange(event) {
    setPassword(event.target.value);
    // password = event.target.value;
  }

  return(
    <div id={props.id}>
      <h3 class="textAlignCenter">Sign In with Email</h3>
      <div>
          <IconTextInputUIElement 
            icon="fontisto:email"
            required={true} 
            type="email" 
            placeholder="E-Mail"
            onChange={HandleEmailChange(event)}
          />
        <IconTextInputUIElement 
            icon="bi:key"
            required={true} 
            type="password" 
            placeholder="Password"
            onChange={HandlePasswordChange(event)}
          />
      </div>
      <div class="marginTop10 width100 justifyEnd">
        <div class="flex justifyEnd">
          <ClickableText class=" textAlignRight justifyEnd paddingTop10 clickableText" onClick={HandleRegister} label="register" />
          <Button class="width40 thinButton" label="Login" onClick={HandleLogin} />
        </div>
        <ClickableText class=" textAlignRight justifyEnd paddingTop10 clickableText" onClick={HandleForgotPassword} label="Forgot password?" />
      </div>
      <div class="textAlignCenter marginTop10"> {infoText()} </div>
    </div>
  )
}

export function EmailSignUpUIElement(props) {
  const [infoText, setInfoText] = createSignal("");
  const [email, setEmail] = createSignal("");
  const [username, setUsername] = createSignal("");
  const [password, setPassword] = createSignal("");
  const [repeatPassword, setRepeatPassword] = createSignal("");

  function SubmitCredentials() {
    HandleEmailSignUp(email(), password(), repeatPassword(), setInfoText);
  }

  async function HandleEmailSignUp() {
    if(password() == repeatPassword() && email().includes("@")) {
      if(password().length >= 6) {
        if(username().length >= 3) {
          // console.log("email: " + email() + " pw: " + password())
          var result = await firebaseManager.EmailSignUp(email(), password(), username());
          if(result) {
            setInfoText("Created account!");
            if(props.onClick != undefined) {
              props.onClick();
            }        
          }
          
          else setInfoText("Something went wrong...");

        } else {
          setInfoText("Please choose a longer username")
        }

      } else {
        setInfoText("Password must be at least 6 characters long");
      }

    } else {
      setInfoText("Please check your email and password");
    }
  }

  return (
    <div class="">
        <h3 class="textAlignCenter">Create new Account</h3>
        <IconTextInputUIElement 
            icon="fontisto:email"
            placeholder="E-Mail"
            type="email"
            onChange={(value) => setEmail(value)}
        />
        <IconTextInputUIElement 
            icon="mdi:account-outline"
            placeholder="Username"
            type="username"
            onChange={(value) => setUsername(value)}
        />
        <br></br>
        <IconTextInputUIElement 
            icon="bi:key-fill"
            placeholder="Password"
            type="password"
            onChange={(value) => setPassword(value)}
        />
        <IconTextInputUIElement
            icon="bi:key"
            placeholder="Repeat Password"
            type="password"
            onChange={(value) => setRepeatPassword(value)}
        />
        <br></br>
        <div class="textAlignRight">
          {infoText()}
        </div>
        <br></br>
        <div class="justifyEnd flex">
          <Button 
              class="thinButton width50"
              label="Submit"
              onClick={SubmitCredentials}
          />
        </div>
    </div>
  )
}

export function UpdateUsernameUIElement(props) {
  const [username, setUsername] = createSignal("");
  const [infoText, setInfoText] = createSignal("");

  function HandleSubmit() {
    if(username().length > 3) {
      firebaseManager.UpdateUsername(username());
    } else setInfoText("Please choose a longer username");
  }

  return(
    <div>
        <h3 class="textAlignCenter">Change Username</h3>
        <IconTextInputUIElement 
            icon="mdi:account-outline"
            placeholder="Username"
            type="username"
            onChange={(value) => setUsername(value)}
        />
        <div class="justifyEnd flex">
          <div class="textAlignRight width40 marginAuto">
            {infoText()}
          </div>
          <Button 
              class="thinButton width50"
              label="Change"
              onClick={HandleSubmit}
          />
        </div>
    </div>
  )
}

export function EmailForgotPasswordUIElement(props) {
  const [email, setEmail] = createSignal("");
  const [infoText, setInfoText] = createSignal("");

  async function HandleSubmit() {
    if(email().includes("@")) {
      var worked = await firebaseManager.SendPasswordResetEmail(email());
      if(worked == true) {
        setInfoText("Sent Recovery E-Mail");
      } else {
        setInfoText("Error: Please check your E-Mail");
      }
      
    } else {
      setInfoText("Please check your E-Mail");
    }
    if(props.onClick != undefined) {
      props.onClick();
    }
  }

  return(
    <div>
        <h3 class="textAlignCenter">Recover Account</h3>
        <IconTextInputUIElement 
            icon="fontisto:email"
            placeholder="E-Mail"    
            onChange={(event) => setEmail(event)}                
        />
        <br></br>
        <div class="flex justifyEnd">
          <Button 
              class="thinButton width50"
              label="Submit"
              onClick={HandleSubmit}
          />
        </div>
        <div class="textAlignRight">
          {infoText()}
        </div>
    </div>
  )
}

export function IconTextInputUIElement(props) {
  if(props.class == undefined) props.class = "flex justifySpace";
  if(props.id == undefined) props.id = "textInput";
  
  //Icon
  if(props.icon == undefined) props.icon = "ep:warn-triangle-filled";
  if(props.iconFirst == undefined) props.iconFirst = false;
  if(props.width == undefined) props.width = "30";
  if(props.hFlip == undefined) props.hFlip = false;
  if(props.vFlip == undefined) props.vFlip = false;

  //Text input
  if(props.required == undefined) props.required = false;
  if(props.type == undefined) props.type = "";
  if(props.placeholder == undefined) props.placeholder = "My cool Placeholder";
  if(props.label == undefined) props.label = "";

  function HandleValueChange(event) {
    if(props.onChange != undefined) {
      props.onChange(event.target.value);
    }
  }
  
  return(
    <div class={props.class}>
      <div class="marginAuto">
        <Icon
          icon={props.icon}
          width={props.width}
          hFlip={props.hFlip}
          vFlip={props.vFlip}
          />
      </div>
      <div class="marginAuto paddingLeftRight10">
        {props.label}
      </div>

      <TextInput 
        required={props.required} 
        id={props.id}
        type={props.type}
        placeholder={props.placeholder}
        onChange={HandleValueChange}
      />
    </div>
  )
}

export function ClickableText(props) {
  if(props.label == undefined) props.label="Click on me!"
  if(props.href == undefined) props.href = "";
  if(props.class == undefined) props.class = "clickableText textAlignCenter";

  function HandleClick() {
    if(props.onClick != undefined) {
      props.onClick();
    } else console.log("NO ON CLICK FUNCTION DEFINED");
  }

  return(
    <div class={props.class} onClick={HandleClick}>
      <a>{props.label}</a>
    </div>
  )
}

export function ServiceLogin(props) {
  if(props.class == undefined) props.class = "iconButton justifyCenter";
  if(props.label == undefined) props.label = "Sign in with";
  if(props.id == undefined) props.id = "myCoolService";

  if(props.icon == undefined) props.icon = "zondicons:key";
  if(props.width == undefined) props.width = "30";
  if(props.hFlip == undefined) props.hFlip = false;
  if(props.vFlip == undefined) props.vFlip = false;

  function HandleClick() {
    // console.log("SERVICE LOGIN");
    if(props.onClick != undefined) {
      props.onClick();
    } else console.log("NO SERVICE FUNCTION")
  };

  return(
    <div id={props.id}>
      <ButtonIcon 
        class={props.class}
        icon={props.icon}
        width={props.width}
        hFlip={props.hFlip}
        vFlip={props.vFlip}
        label={props.label}
        onClick={HandleClick}
      />
    </div>
  )

}

export function SelectedMIDIDeviceUIElement(props) {
  const [midiDevice, setMidiDevice] = createSignal("");

  function UpdateSignal() {
    setMidiDevice(inputManager.GetSelectedMIDIDevice());
  }
  
  frameManager.SubscribeHalfFramerate(UpdateSignal);
  return(
    <div>
      <h3> MIDI Devices: {midiDevice} </h3>
    </div>
  )
}

export function NumberSliderCombo(props) {
  return(
    <div class="flexContainer justifyEnd widthAuto">
      <NumberInput
          factor={props.factor}
          minMaxStep={props.minMaxStep}
          value={props.value}
          onChange={props.onChange}
      />
      <div class="marginLeft10">
        <SliderInput
            factor={props.factor}
            minMaxStep={props.minMaxStep}
            value={props.value}
            onChange={props.onChange}
        />
      </div>
    </div>
  )
}

export function NumberSliderComboVertical(props) {
  return(
    <div>
      <div class="flexList">
          <div class="sliderContainer">
            <SliderInput
                class="verticalSlider"
                factor={props.factor}
                minMaxStep={props.minMaxStep}
                value={props.value}
                onChange={props.onChange}
            />
        </div>
        <NumberInput
            factor={props.factor}
            minMaxStep={props.minMaxStep}
            value={props.value}
            onChange={props.onChange}
        />
        Cool Text
      </div>
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
  if(props.vertical == undefined) props.vertical = false;
  
  if(props.vertical) {
    return(
      <div class="flexContainer">
        <div class="textAlignRight">{props.name}</div>
          <NumberSliderComboVertical 
            factor={props.factor}
            minMaxStep={props.minMaxStep}
            value={props.value}
            onChange={props.onChange}
          />
      </div>
    )
  } else {
    return(
      <div class="flexContainer">
        <div class="width50">{props.name}</div>
        <NumberSliderCombo 
          factor={props.factor}
          minMaxStep={props.minMaxStep}
          value={props.value}
          onChange={props.onChange}
        />
      </div>
    )
  }
}

export function JsonFileUploader(props) {
  const handleFileSelect = (event) => {
    const files = event.target.files;
    // const file = event.target.files[0];
    
    if (files.length > 0) {
      // console.log("UPLOADED file count = " + files.length);
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
    <div>
        <label htmlFor="file-input" className="file-input-button">
          select file(s) to upload
        </label>
        <input 
        type="file" 
        accept=".json" 
        multiple 
        onChange={handleFileSelect} 
        id="file-input"
        style={{ display: 'none' }}
        />
    </div>
  );
}

export function MIDIDropdownUIElement(props) {
  if(props.class === undefined) props.class = "dropdown"
  if(props.label === undefined) props.label = "MIDI Devices";

  const [selectedOption, setSelectedOption] = createSignal("");
  const [devices, setDevices] = createSignal(["", ""]);
  const [options, setOptions] = createSignal(<option value="">No MIDI devices found</option>);
  if(props.class === undefined) props.class = "";

  const loadDevices = async () => {
    const loadedDevices = await inputManager.GetMIDIDevices();
    if(loadedDevices != undefined && loadedDevices !== devices()) {
      // console.log("Loaded devices:", loadedDevices);
      setDevices(loadedDevices);
      LoadOptions(loadedDevices);
    }
  };

  function UpdateDeviceSelection(device) {
    // console.log("NEW device selected " + device);
    inputManager.SetTargetMIDIDevice(device);
  }

  function LoadOptions(devices) {
    // console.log("SET options");
    // console.log(devices);
    var opt = null;
    if (devices.length > 0) {
      opt = devices.map((device, index) => (
        <option key={index} value={device}>
          {device}
        </option>
      ));
    } else {
      opt = <option value="">No MIDI devices found</option>;
    }
    // console.log(opt);
    setOptions(opt);
  }

  //Display one empty option
  return (
    <div>
      <h2 class="textAlignCenter">
        {props.label}
      </h2>
      <div class="flex">
        <div class="justifyStart marginAuto">
          <select 
            class={props.class}
            value={selectedOption()} 
            onFocus={() => loadDevices()} 
            onChange={(event) => UpdateDeviceSelection(event.target.value)}>
            {options()}
          </select>
        </div>
        <div class="marginAuto justifyEnd">
          <MIDIDeviceReloadButton />
        </div>
      </div>
    </div>
  );
}

export function BPM(props) {
  if(props.class === undefined) props.class = "textAlignCenter";
  const [bpm, setBPM] = createSignal(0);

  function GetBPM() {
    setBPM(inputManager.GetBPM());
  };

  frameManager.SubscribeFullFramerate(GetBPM);
  return(
    <h2
      class={props.class}
    >
      BPM: {bpm}
    </h2>
  )
}

export function OpenSettingsButton(props) {
  var panel;
  if(props.width == undefined) props.width = "35";
  if(props.icon == undefined) props.icon = "ic:baseline-arrow-forward-ios";
  const [settingsOpen, setSettingsOpen] = createSignal(false);

  createEffect(() => {
    if(settingsOpen()) {
      HideButton();
    } else {
      ShowButton();
    }
  })

  function OpenSettings() {
    var panel = document.getElementById("settingsPanel");
    if(panel != undefined) {
        panel.style.display = "block";
        HideButton();
    }
  }

  function HideButton() {
    var button = document.getElementById("openSettingsButton");
    if(button != undefined) {
      button.style.display = "none";
    }
  }

  function ShowButton() {
    var button = document.getElementById("openSettingsButton");
    if(button != undefined) {
      button.style.display = "block";
    }
  }

  function CheckAllEmpty(toys) {
    var toys = toyManager.GetToys();
    var allEmpty = true;
    if(toys != undefined) {
      toys.forEach((element) => {
        if(!element.toyType.includes("Empty")){
          allEmpty = false;
          return;
        }
      })
      
      if(allEmpty) return true;
      else return false;
    }
  }

  if (typeof window !== 'undefined') {
    document.addEventListener("mousemove", (event) => {
      if(panel != undefined) {
        if(panel.style.display != "block") {
          if(CheckAllEmpty()) {
            ShowButton();
          } else {
            if (event.clientY < window.innerHeight / 4) {
              if(event.clientX < window.innerHeight / 4) {
                ShowButton();
              } else HideButton();
            } else HideButton();
          }
        }
      }
    });
  }

  function GetPanel() {
    if (typeof window !== 'undefined') {
      panel = document.getElementById("settingsPanel");
    }
  }

  frameManager.SubscribeOneFPS(GetPanel);
  return(
    <ButtonIcon
      id="openSettingsButton"
      icon={props.icon}
      width={props.width}
      onClick={() => OpenSettings()}
    />
  )
}

export function StartText(props) {
  if(props.label == undefined) props.label = "No MIDI toy loaded, add a toy to start"
  if(props.id == undefined) props.id = "startText";

  const [text, setText] = createSignal(props.label);

  function CheckAllEmpty() {
    var toys = toyManager.GetToys();
    var allEmpty = true;
    if(toys != undefined) {
      toys.forEach((element) => {
        if(!element.toyType.includes("Empty")){
          allEmpty = false;
          return;
        }
      })
      
      if(allEmpty) return true;
      else return false;
    }
  }

  function TextSetter() {
    // console.log("SETTING Text");
    if(CheckAllEmpty()) setText(props.label)
    else setText(""); 
  }

  frameManager.SubscribeOneFPS(TextSetter);
  return(
    <h1 id={props.id} class="noSelect">
      {text()}
    </h1>
  )
}

//Debug tool
export function ChannelObserverUIElement(props) {
  if(props.channel === undefined) props.channel = 1;
  if(props.class === undefined) props.class = "width20";

  const [holdingKeys, setHoldingKeys] = createSignal([]);
  
  function UpdateHoldingKeys() {
    // console.log("GET holding keys");
    setHoldingKeys(inputManager.GetHoldingKeys(props.channel).toString());
  }
  frameManager.SubscribeHalfFramerate(UpdateHoldingKeys);
  
  return(
    <h3
      class={props.class}
    >
      Channel {props.channel}: {holdingKeys}
    </h3>
  )
}