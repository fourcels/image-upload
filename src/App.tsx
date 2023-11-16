import { ProForm } from '@ant-design/pro-components'
import { ImageUpload } from '../lib/ImageUpload'

const { VITE_API_BASE_URL } = import.meta.env

function App() {

  return (
    <>
      <ProForm
        onFinish={async (values) => {
          console.log(values)
        }}
        initialValues={{
          image: 'https://law4d.oss-cn-hangzhou.aliyuncs.com/20231116/33abd58a-2f98-425e-8019-ce2d79c85201.jpg'
        }}
      >
        <ImageUpload action={`${VITE_API_BASE_URL}/upload`} max={2} />
      </ProForm>
    </>
  )
}

export default App
