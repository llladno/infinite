import React, {useEffect, useState} from 'react';
import axios from "axios";
import {Simulate} from "react-dom/test-utils";
import resize = Simulate.resize;

const UserList = () => {
    const [users, setUsers] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(true);
    const [fetching, setFetching] = useState(false);
    async function query (){
        if(fetching){
            axios.get(`https://f0cfd85b77b7aa3b.mokky.dev/user?page=${page}&limit=20`).then((result)=>{
                setUsers(result.data.items)
                setLoading(false)
            })
        }
    }
    useEffect(()=>{
        query()
        console.log(users)
        document.addEventListener('scroll', scrollHandler)
        return function (){
            document.removeEventListener('scroll', scrollHandler)
        }
    },[fetching])

    function scrollHandler(e: any) {
        console.log(e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) )
        if (e.target.documentElement.scrollHeight - (e.target.documentElement.scrollTop + window.innerHeight) < 100) {
            setFetching(true)
            console.log('work')
            console.log("page", page)
            setPage(page + 1)
            query()
        }
    }


    return (
        <div>
            {!loading ? users.map((user:any) => {
                return (
                    <div key={user.id}>
                        <h2>{user.id} {user.name}</h2>
                    </div>
                );
            }) : <div>loading</div>}
        </div>
    );
};

export default UserList;