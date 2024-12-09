import { Window } from 'happy-dom'
import { MakeTenoxUI } from '@tenoxui/core'
import config from '../tenoxui.config.js'

const DEFAULT_PRESERVED_ATTRIBUTES = [
  'style',
  'xmlns',
  'width',
  'height',
  'viewBox',
  'd',
  'fill',
  'path',
  'id',
  'x1',
  'x2',
  'y1',
  'y2',
  'gradientUnits',
  'gradientTransform',
  'offset',
  'stop-color',
  'opacity',
  'href'
]

const removeAttributes = element => {
  if (element.tagName.toLowerCase() !== 'style') {
    Array.from(element.attributes).forEach(attr => {
      if (!DEFAULT_PRESERVED_ATTRIBUTES.includes(attr.name)) {
        element.removeAttribute(attr.name)
      }
    })

    Array.from(element.children).forEach(child => {
      if (child.tagName.toLowerCase() !== 'style') {
        removeAttributes(child)
      }
    })
  }
}

export const applyStyles = node => {
  const window = new Window()
  const document = window.document

  const temp = document.createElement('div')
  temp.innerHTML = node

  temp.querySelectorAll('*').forEach(element => {
    const styler = new MakeTenoxUI({
      element,
      ...config
    })

    element.classList.forEach(className => {
      styler.applyStyles(className)
    })
  })

  removeAttributes(temp)

  return temp.innerHTML
}
