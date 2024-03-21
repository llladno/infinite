import React, { useEffect, useRef, useState} from 'react';
import axios from "axios";
import {useDispatch} from "react-redux";

const UserList = () => {
    const [users, setUsers] = useState<any>([]);
    const [page, setPage] = useState(0);
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(true);
    const dispatch = useDispatch();
    const eleme = useRef<any>(null)

    useEffect(()=>{
        if(fetching){
            axios.get(`https://f0cfd85b77b7aa3b.mokky.dev/user?page=${page+1}&limit=20`).then((result)=>{
                setUsers([...users,...result.data.items])
                setPage(page+1)
            }).catch((e)=>{
              if (e){
                  axios.get('./data/data.json').then((res)=>{
                      setUsers([...users,...res.data.slice(20*(page), (20*(page))+20)])
                      setPage(page +1)

                  })
              }
            }).finally(()=>{
                setFetching(false)
            })
        }
    },[fetching])
    useEffect(()=>{
            eleme.current.addEventListener('scroll', scrollHandler)
        return function (){
            eleme.current.removeEventListener('scroll', scrollHandler)
        }
    },[])

    function scrollHandler(e: any) {
        if (e.target.scrollHeight - (e.target.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
        }
    }


    function inputHandler(event: any) {

        event.target.value ? axios.get(`https://f0cfd85b77b7aa3b.mokky.dev/user?name=*${event.target.value}*`)
            .then(res => setUsers(res.data))
            : axios.get('https://f0cfd85b77b7aa3b.mokky.dev/user').then(res => setUsers(res.data))
    }
    return (
        <div className='userList' ref={eleme}>
            <input className='inputList' onChange={inputHandler}/>
            {!loading ? users.map((user:any) => {
                return (
                    <div key={user.id} className='userPoint' onClick={()=> dispatch({type: 'SUCCESS', payload: user})}>
                        <img src='./assets/user.png' width='25px' height='25px'></img><h2>{user.id}. {user.name}</h2>
                    </div>
                );
            }) : <div>loading</div>}
        </div>
    );
};

export default UserList;