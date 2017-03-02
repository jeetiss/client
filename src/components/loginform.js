import React from 'react'

export default function LoginForm ({ onSub }) {
  let name
  let pass

  return (
    <form>
      <input type='name' ref={nm => { name = nm }} />
      <br />
      <input type='pass' ref={ps => { pass = ps }} />
      <br />
      <button onClick={(e) => {
        e.preventDefault()
        onSub(name.value, pass.value)
      }}>Submit</button>
    </form>
  )
}
