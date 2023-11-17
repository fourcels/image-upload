import { ProForm } from '@ant-design/pro-components'
import { ImageUpload } from '../lib'

function App() {

  return (
    <>
      <ProForm
        onFinish={async (values) => {
          console.log(values)
        }}
      >
        <ImageUpload />
      </ProForm>
    </>
  )
}

export default App
