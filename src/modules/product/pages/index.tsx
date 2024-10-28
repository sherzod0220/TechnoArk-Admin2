import { useEffect, useState } from "react";
import { useGetCategory } from "../hooks/queries"
import { Space, Tooltip, Button,Image } from "antd";
import { EditOutlined,EyeOutlined } from "@ant-design/icons";
import { Search, Table } from "@components";
import { useLocation, useNavigate } from "react-router-dom";
import Category from "./modal";

const Index = () => {

  const [category,setCategory] = useState({})
  const [open,setOpen] = useState(false)
  const location = useLocation()
  const val = new URLSearchParams(location.search)
  const [ params,setParams   ] = useState({
    limit: 10,
    page: 1,
    search: val.get('search') ||'',
  })

  // const [total, setTotal] = useState(0); // To store the total number of items
    const { data } = useGetCategory(params)
    const { all_products,count} = data?.data || {}
    console.log(all_products);
    
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

    const openModal =(item:any)=>{  
      setCategory(item)
      setOpen(true)
    }
    const handleCancel =()=>{
      setCategory({})
      setOpen(false)
    }


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
      { title: 'Color', dataIndex: 'color', key: 'color', align: "center" },
      { title: 'Model', dataIndex: 'model', key: 'model', align: "center" },
      { 
        title: 'Image', 
        dataIndex: 'image_url', 
        key: 'image_url',
        render: (_: string, record: any) => (
          <Image
             src={record.image_url}
             style={{
                width: "50px",
                height: "50px",
                objectFit: "contain",
                borderRadius: "5px",
             }}
          />
       ),
        align: "center" 
      },
      { title: 'Made in', dataIndex: 'made_in', key: 'made_in', align: "center" },
      { 
        title: 'Created day', 
        dataIndex: 'date_of_creation', 
        key: 'date_of_creation', 
        render: (date: string) => new Date(date).toLocaleDateString(),
        align: "center" 
      },
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
                onClick={()=>openModal(record)}
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
                icon={<EyeOutlined />}
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
      <Category open={open} handleCancel={handleCancel} category={category}/>
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
        data={all_products}
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
