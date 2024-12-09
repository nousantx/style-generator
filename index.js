import { Window } from 'happy-dom'
import { MakeTenoxUI } from '@tenoxui/core'

const apply = (element) => {
  const window = new Window()
  const document = window.document

  const temp = document.createElement('div')
  temp.innerHTML = element

  temp.querySelectorAll('*').forEach((el) => {
    const styler = new MakeTenoxUI({
      element: el,
      property: {
        bg: 'backgroundColor',
        text: 'color'
      },
      aliases: {
        tx: 'bg-blue text-red'
      }
    })

    el.classList.forEach((className) => {
      styler.applyStyles(className)
    })

    console.log(el.style.cssText)
  })

  return temp.innerHTML
}

const elem = apply('<div class="bg-red text-blue"></div>')

console.log(elem)
