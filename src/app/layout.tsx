import '@/global.css'
import '@fontsource/roboto'
import { PropsWithChildren } from 'react'
import { Toaster } from 'sonner'

const layout = (props: PropsWithChildren) => {
  return (
    <html>
      <body className="bg-slate-800 text-white">
        <Toaster richColors closeButton></Toaster>
        {props.children}
      </body>
    </html>
  )
}

export default layout
