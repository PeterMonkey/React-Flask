import React, {useState, useEffect} from 'react';

const API = process.env.REACT_APP_API;

export const Users = () => {

    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const [users, setUsers] = useState([])

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await fetch(`${API}/users`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name,
                email,
                password
            })
        })
        const data = await res.json();
        await getUsers();
        console.log(data)
    }

    const getUsers = async () => {
        const res = await fetch(`${API}/users`)
        const data = await res.json();
        setUsers(data);
        
    }

    useEffect(() => {
        getUsers();
    }, [])

    const deleteUser = async(id) =>{
        const userResponse = window.confirm('Are you sure you want to delete it?')
        if(userResponse){
            const res = await fetch(`${API}/users/${id}`, {
                method: 'DELETE'
            });
            const data = await res.json();
            await getUsers();
            console.log(data)
        }
    }

    const editUser = (id) => {
        console.log(id)
    }

    return (
        <div className="row">
            <div className="col-md-4">
                <form onSubmit={handleSubmit} className="card card-body">
                    <div className="form-group">
                        <input 
                            type="text" 
                            onChange={e => setName(e.target.value)} 
                            value={name}
                            placeholder="Name"
                            className="form-control"
                            autoFocus
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="email" 
                            onChange={e => setEmail(e.target.value)} 
                            value={email}
                            className="form-control"
                            placeholder="Email"
                            
                        />
                    </div>

                    <div className="form-group">
                        <input 
                            type="password" 
                            onChange={e => setPassword(e.target.value)} 
                            value={password}
                            className="form-control"
                            placeholder="Password"
                            
                        />
                    </div>

                    <button className="btn btn-primary btn-block">
                    Create
                    </button>
                </form>
            </div>
            <div className="col-md-8">
                
                    <table className="table table-striped">
                        <thead>
                            <tr>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Operations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map(user => (
                                <tr key={user.id}>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.password}</td>
                                    <td>
                                    <button 
                                        className="btn btn-secondary btn-sm btn-block"
                                        onClick={() => editUser(user.id)}
                                        >
                                        Edit
                                    </button>
                                    <button 
                                        className="btn btn-danger btn-sm btn-block"
                                        onClick={() => deleteUser(user.id)}
                                        >
                                        Delete
                                    </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
            </div>

        </div>
    
    )
};