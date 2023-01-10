import { Toast } from 'react-vant'
import Clipboard from 'clipboard'

export const toNonExponential = (num: number, pipe = true): string => {
  let str = Number(num)?.toFixed(2)?.replace(/0+$/, '')?.replace(/\.$/, '')
  if (pipe) {
    const float = str?.split('.')[1]
    str = str?.split('.')[0]?.replace(/(?!^)(?=(\d{3})+$)/g, '.')
    if (float !== undefined)
      str += `,${float}`
  }
  return str
}

export const copyText = (str?: string) => {
  return new Promise((resolve, reject) => {
    const fakeElement = document.createElement('button')
    const clipboard = new Clipboard(fakeElement, {
      text: () => str || '',
      action: () => 'copy',
    })
    clipboard.on('success', (e) => {
      clipboard.destroy()
      Toast.success({ message: 'Salin berhasil' })
      resolve(e)
    })
    clipboard.on('error', (e) => {
      clipboard.destroy()
      Toast.success({ message: 'Replikasi gagal' })
      reject(e)
    })
    document.body.appendChild(fakeElement)
    fakeElement.click()
    document.body.removeChild(fakeElement)
  })
}

export const formatDate = (t: number, str: string) => {
  const date = new Date(t)
  var obj = {
      YYYY: date.getFullYear(),
      YY: ('' + date.getFullYear()).slice(-2),
      M: date.getMonth() + 1,
      MM: ('0' + (date.getMonth() + 1)).slice(-2),
      D: date.getDate(),
      DD: ('0' + date.getDate()).slice(-2),
      H: date.getHours(),
      HH: ('0' + date.getHours()).slice(-2),
      h: date.getHours() % 12,
      hh: ('0' + date.getHours() % 12).slice(-2),
      m: date.getMinutes(),
      mm: ('0' + date.getMinutes()).slice(-2),
      s: date.getSeconds(),
      ss: ('0' + date.getSeconds()).slice(-2),
  };
  const reg = /y{2,4}|m{1,2}|d{1,2}|h{1,2}|s{1,2}|w/ig;
  // @ts-ignore
  return str.replace(reg, k => obj[k]);
}