export function processStyle(name, value){
  switch (name) {
    case 'brightness': {
      return `brightness(${value}%)`
    }
    case 'contrast': {
      return `contrast(${value}%)`
    }
    default: {
      throw new Error(`prop ${name} does not have a style converter`)
    }
  }
}

export function getId(){
  return Math.round(Math.random() * 1e16).toString(16)
}