import { useState,useCallback, useEffect, useRef } from 'react';
import './App.css' //all the css

export default function App() {
  const[Length,setLength]=useState(8);
  const[HasNum,setHasNum]=useState(false);
  const[HasChar,setHasChar]=useState(false);
  const[password,setpassword]=useState("");
  
const passwordRef=useRef(null);     //use ref hook connected to input box in line 48
const passwordGenerator= useCallback(()=>{
  let pass="";
  let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrtsuvwxyz";


  if(HasNum) str+="0123456789"; //if check box is checked then add numbers to string
  if(HasChar) str+="!@#$%^&*()_+"; //if check box is checked then add special characters to string
 
  //generate password
  for(let i=1;i<=Length;i++){
    let char=Math.floor(Math.random()*str.length);
    pass+=str.charAt(char);
  }
setpassword(pass);    //call setpassword function to set the generated password

},[Length,HasNum,HasChar,setpassword]);


// copy to clipboard function
const copyToClip=useCallback(()=>{
  passwordRef.current.select(); // to select the text inside the input box
  window.navigator.clipboard.writeText(password) // to copy the selected text
  // alert("copied to clipboard");
  setTimeout(() => {
    alert("copied to clipboard");
  }, 100);
},[password]);


// to generate password on page load and when any dependency changes
  useEffect(()=>{
  passwordGenerator();
},[Length,HasNum,HasChar,passwordGenerator])



  return (
    <div id="container">
    {/* //heading */}
     
       <h2  >Password Generator</h2>
       <h4 className="subtitle" >Generate your secure password</h4>

    <div id="box">
        {/* Input Box and copy button */}
            <div className="password-box">
              <input type="text" value={password} placeholder='Password'  ref={passwordRef} readOnly />
              <button id="copy-btn" onClick={copyToClip} >COPY</button>
            </div>

          {/* Range */}
            <div className="range-box"> 
              <input type="range" 
              min={8} 
              max={16} 
              value={Length}
              onChange={e=> setLength(e.target.value)}></input>
              <label  >Length:{Length}</label>
            </div>

        {/* Checkboxes */}
            <div className="checkbox">
              <input type="checkbox" id="num" checked={HasNum} onChange={e=>setHasNum(e.target.checked)}/>
              <label htmlFor='num'>  Include Numbers   </label>

              <input type="checkbox" id="char" checked={HasChar} onChange={e=>setHasChar(e.target.checked)}/>
              <label htmlFor='char'> Include Character</label>
              
            </div>
     </div>
    </div>
  )
}


