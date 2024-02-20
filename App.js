import React,{useState,useEffect} from 'react';

export const App=()=>{

    const URL="https://jsonplaceholder.typicode.com/users";

    const [list,setList]=useState([]);

    const [url_error,seturl_error]=useState({
        sta:false,
        msg:""
    });

    const [loading,setLoading]=useState(true);


    async function fetch_Data(url_fetch){
        setLoading(true);
        seturl_error({
            sta:false,
            msg:""
        })
        try{
            const response=await fetch(url_fetch);
            const data=await response.json();
            setList(data);
            setLoading(false);
            seturl_error({
                sta:false,
                msg:""
            })
            if(response.status===404){
                console.log("users error");
                throw new Error("data not found");
            }
        }
        catch(error){
            setLoading(false);
            seturl_error({
                sta:true,
                msg: error.message || "Something wrong"
            });

        }
    }

    
    useEffect(()=>{
        fetch_Data(URL);
    },[]);


    if(url_error.sta){
        console.log("hii");
        return <h3>{url_error.msg}</h3>
         }
    

    if(loading){
        return <h3>Loading.....</h3>
    }
    

    return (
        <>
           
            {
                list.map(child=>{
                    const {id,name,email}=child;
                    return <li key={id}>
                        <h3>{name}</h3>
                        <h3>{email}</h3>
                        </li>;
                })
            }
        </>
    )
}