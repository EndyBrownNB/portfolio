import React, { useState,useRef, useMemo, useEffect } from 'react';
//import ClassCounter from './components/ClassCounter';
//import MySelect from './components/UI/select/MySelect';
//import PostItem from './components/PostItem';
//import MyInput from './components/UI/input/MyInput';
import './styles/App.css';
import PostList from './components/PostList';
import MyButton from './components/UI/button/MyButton';
import PostForm from './components/PostForm';
import {usePosts} from './hooks/usePosts';
import PostFilter from './components/PostFilter';
import MyModal from './components/UI/MyModal/MyModal';
import axios from 'axios';
import PostService from './API/PostService';
import Loader from './components/UI/Loader/Loader';
import { useFetching } from './hooks/useFetching';


function App() {

    const [posts, setPosts] = useState([])
    const [filter,setFilter] = useState({sort:'', query:''})
    const [modal,setModal] = useState(false)
    const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
    const[fetchPosts, isPostLoading, postError] = useFetching( async ()=>{
      const posts = await PostService.getAll();
      setPosts(posts);
    })

    useEffect(()=>{
      fetchPosts()
    }, [])
    
    const createPost = (newPost)=>{
      setPosts([...posts, newPost])
      setModal(false)
    }

    const removePost = (post)=>{
        setPosts(posts.filter(p => p.id !== post.id))
    }


  return (
    <div className="App">
    <MyButton style={{marginTop: '30px'}} onClick={()=> setModal(true)}>
      Create Post
    </MyButton>
      <MyModal visible={modal} setVisible={setModal}>
        <PostForm create={createPost}/>
      </MyModal>
      <hr style={{margin:'15px 0'}}/>
      <PostFilter
        filter={filter}
        setFilter={setFilter}
      />
      {postError &&
        <h1>Error ${postError}</h1>
      }
      {isPostLoading
        ? <div style={{display:'flex', justifyContent:'center', marginTop:'50px'}}><Loader/></div>
        : <PostList remove={removePost} posts={sortedAndSearchedPosts} title='List of JavaScript'/>
      }

    </div>
  );
}

export default App;