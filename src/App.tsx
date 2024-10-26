import { Outlet } from 'react-router-dom'
import { ConfigProvider } from 'antd'


function App() {

  return (
    <>
      <ConfigProvider
      theme={{
        token: {
          colorPrimary: "darkblue",
        },
      }}  
    >
      <>
        <Outlet/>
      </>
    </ConfigProvider>
    </>
  )
}

export default App
