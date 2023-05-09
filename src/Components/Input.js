
function Input({id,label, length}) {
  return (
    <div>
        <label htmlFor={id} >{label}</label>
        <input id={id} maxLength={length}/>
    </div>
  )
}

export default Input
