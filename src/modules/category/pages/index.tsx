import { useEffect, useState } from "react";
import { useGetCategory } from "../hooks/queries"
import { Space, Tooltip, Button } from "antd";
import { EditOutlined,ArrowsAltOutlined } from "@ant-design/icons";
import { Search, Table } from "@components";
import { useLocation, useNavigate } from "react-router-dom";

const Index = () => {

  const location = useLocation()
  const val = new URLSearchParams(location.search)
  const [ params,setParams   ] = useState({
    limit: 10,
    page: 1,
    search: val.get('search') ||'',
  })
  // const [total, setTotal] = useState(0); // To store the total number of items

    const { data } = useGetCategory(params)
    const { categories,count} = data || {}
    console.log(data,"data");
    
    // const datas =  data?.data?.categories;
    // console.log(datas,"das");
    const navigate = useNavigate();
    useEffect(()=>{
      const params = new URLSearchParams(location.search)
      const page = params.get("page")
      const limit = params.get('limit')
      const input_val = params.get("search")
      const find = input_val ? input_val : ""
      const pageNumber = page ? parseInt(page) : 1
      const limitPage = limit ? parseInt(limit) : 10
      setParams(prevParams =>({
        ...prevParams,
        page: pageNumber,
        search: find,
        limit: limitPage
      }))
    },[location.search])
    const handleTableChange = (pagination: any) => {
      const { current = 1, pageSize = 10 } = pagination;
      // Update pagination parameters and set them in the URL query params
      setParams((prev) => ({
        ...prev,
        page: current,
        limit: pageSize,
      }));
      const searchParams = new URLSearchParams(location.search)
         searchParams.set("page", `${current}`)
         searchParams.set("limit", `${pageSize}`)
         navigate(`?${searchParams}`)
    };


    const columns: any = [
      { 
        title: "№",
        dataIndex: "index",
        key: "index",
        align: "center",
        render: (_text: string, _record: any, index: number) =>
          `${(params.page - 1) * params.limit + index + 1}`,  
      },
      { title: 'Name', dataIndex: 'name', key: 'name', align: "center" },
      {
        title: "Actions", 
        key: "actions", 
        align: "center",
        render: (_text: string, record: any) => (
          <Space size={"middle"}>
            <Tooltip title="Edit">
              <Button
                type="default"
                icon={<EditOutlined/>}
                // onClick={()=>openModal(record)}
                style={{width:"45px", color:"green", borderColor:"green"}}
              />
            </Tooltip>
  
            <Tooltip title="Delete">
             
              {/* <GlobalDelete
                id={record.id}
                onConfirm={deleteData}
                onCancel={() => console.log('Cancelled')}
                title={"Delete this Category ?"}
              /> */}
              <h1>delete</h1>
            </Tooltip>
  
            <Tooltip title="View">
              <Button
                type="default"
                icon={<ArrowsAltOutlined />}
                // onClick={() => moveSingle(record.id)}
                style={{width:"45px"}}
              />
            </Tooltip>
          </Space>
        ),
      }
    ];
  return (
    <div>
      <div className="flex justify-between items-center">
        <span className="w-[300px]">
            <Search params={params} setParams={setParams}/>
        </span>
        <div className="flex justify-between my-2">
        <Tooltip title="Add category">
          <Button type="primary" onClick={()=>setOpen(true)}>Add category</Button>
        </Tooltip>
        </div>
      </div>
      <Table
        data={categories}
        columns={columns}
        pagination={{
          current: params.page,
          pageSize: params.limit,
          total: count,
          showSizeChanger: true,
          pageSizeOptions: ['2', '5', '7', '10'],
        }}
        onChange={handleTableChange}
      />
    </div>
  )
}

export default Index
