import React , { Component } from 'react';
import axios from 'axios';
import styles from './user.module.css'
export default class User extends Component{
    constructor(props){
        super(props);
        this.state={
            utilisateurs:[],
            IdBtnActive:0,
            posts:[],
        };
        
    }

    componentDidMount(){
     const getData=async()=>{
        const res= await axios.get('https://jsonplaceholder.typicode.com/users');
        return await res.data;
     }
     getData().then((users)=>this.setState({utilisateurs:users}));
    }
    render(){
        return <div id={styles.all}>
                    <div id={styles.nbr_users}>Nombre des utilisateurs: {this.state.utilisateurs.length}</div>
                    <div id={styles.users}>
                        {this.state.utilisateurs.map((u)=><div key={u.id} className={styles.user}>
                                                            <h3 className={styles.titles}>Nom: <span className={styles.info}> {u.name} </span> </h3>
                                                            <p className={styles.titles}>Email: <span className={styles.info}> {u.email} </span></p>
                                                            <p className={styles.titles}>Ville: <span className={styles.info}>  {u.address.city}</span></p>
                                                            {this.state.IdBtnActive!==u.id ?
                                                            <button className={styles.btns} onClick={()=>{this.setState({IdBtnActive:u.id})}}>affichaer Posts</button>
                                                            :
                                                            <button className={styles.btns} onClick={()=>{this.setState({IdBtnActive:0})}}>cacher Posts</button>

    }
                                                            {
                                                                this.state.IdBtnActive===u.id &&

                                                                    this.state.posts.map(p=>
                                                                    <div className={styles.posts}>
                                                                        <h3 className={styles.titles}>{p.title}</h3><br/>
                                                                        <p className={styles.bodyP}>{p.body}</p>
                                                                    </div>)
                                                                    
                                                            }
                                                        </div>
                        )}
                  
                  </div>
        </div>
    }
    componentDidUpdate(prevprops,prevstate){
        if(prevstate.IdBtnActive!==this.state.IdBtnActive){
            const getData=async ()=>{
                const res=await axios.get('https://jsonplaceholder.typicode.com/posts?userId='+this.state.IdBtnActive);
                return await res.data;
            }
            getData().then((posts)=>this.setState({posts:posts}));
        }
    }
}