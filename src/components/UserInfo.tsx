import React, {useState} from 'react';
import {useSelector} from "react-redux";
import {Simulate} from "react-dom/test-utils";
import submit = Simulate.submit;
import axios from "axios";

const UserInfo = () => {
    const state:any = useSelector(state => state)
    const user = state.user.users
    const [result, setResult] = useState({
        status: false,
        message: ''
    })

    const handleSubmit = (e: any) => {
        e.preventDefault();
        const data = {
            name: e.target.name.value || e.target.name.placeholder,
            sname: e.target.sname.value || e.target.sname.placeholder,
            mail: e.target.mail.value || e.target.mail.placeholder,
            age: e.target.age.value || e.target.age.placeholder,
            job: e.target.job.value || e.target.job.placeholder,
            company: e.target.company.value || e.target.company.placeholder,
        }
        axios.patch(`https://f0cfd85b77b7aa3b.mokky.dev/user/${user.id}`, data).then((result)=>{
            setResult({
                message: 'ok',
                status: true,
            })
        }).catch((e)=>{
            setResult({
                status: true,
                message: 'Произошла ошибка'
            })
        })
    }


    return (
        <div className='container'>
            {user.id ? <div>
                    <h1>{user.id}. {user.name}</h1>
                    <div className='user'>
                        <img src='/assets/user.png' width='100px' height='100px'></img>
                        <form className='formGrid' onSubmit={handleSubmit}>
                            <h4>Имя</h4>
                            <input name='name' placeholder={user.name}/>
                            <h4>Фамилия</h4>
                            <input name='sname' placeholder={user.sname}/>
                            <h4>Почта</h4>
                            <input name='mail' placeholder={user.mail}/>
                            <h4>Возраст</h4>
                            <input name='age' placeholder={user.age}/>
                            <h4>Должность</h4>
                            <input name='job' placeholder={user.job}/>
                            <h4>Компания</h4>
                            <input name='company' placeholder={user.company}/>
                            <button>Сохранить</button>
                            {result.status && result.message === 'ok' ? <p style={{color: 'green'}}>Изменения сохранены!</p> : <p style={{color: 'red'}}>{result.message}</p>}
                        </form>
                    </div>



                </div>
            : null}

        </div>
    );
};

export default UserInfo;