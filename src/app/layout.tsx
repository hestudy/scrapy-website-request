import { PropsWithChildren } from 'react'
import '@/global.css'
import '@fontsource/roboto'

const layout = (props: PropsWithChildren) => {
  return (
    <html>
      <body className="bg-slate-800 text-white">{props.children}</body>
    </html>
  )
}

export default layout
