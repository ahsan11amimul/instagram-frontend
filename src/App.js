import React, { useState, useEffect } from 'react'
import './App.css';
import Post from './Post';
import { db, auth } from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

function App() {
  const classes = useStyles();
  const [modalStyle] = useState(getModalStyle);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openLogin, setOpenLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [user, setUser] = useState(null);
  useEffect(() => {
    const unsubScribe = auth.onAuthStateChanged((authUser) => {
      if (authUser) {
        console.log(authUser);
        setUser(authUser);

      } else {
        setUser(null);
      }
    })
    return () => {
      unsubScribe();
    }
  }, [user, username])
  useEffect(() => {
    db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
      setPosts(snapshot.docs.map(doc => ({
        id: doc.id,
        post: doc.data()
      })));
    })
  }, []);
  const signUp = (event) => {
    event.preventDefault();
    auth.createUserWithEmailAndPassword(email, password)
      .then((authUser) => {
        authUser.user.updateProfile({
          displayName: username
        })
      })
      .catch((error) => alert(error.message));
    setOpen(false);
  }
  const signIn = (event) => {
    event.preventDefault();
    auth.signInWithEmailAndPassword(email, password)
      .catch((error) => alert(error.message))
    setOpenLogin(false);

  }
  return (
    <div className="app">

      <Modal
        open={open}
        onClose={() => setOpen(false)}
      >

        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="data:image/jpeg;base64,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" alt="" className="app_headerImage" />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <Input
              placeholder="Username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <button type="submit" onClick={signUp}>Register</button>
          </form>

        </div>
      </Modal>
      <Modal
        open={openLogin}
        onClose={() => setOpenLogin(false)}
      >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup">
            <center>
              <img src="data:image/jpeg;base64,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" alt="" className="app_headerImage" />
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button type="submit" onClick={signIn}>Login</button>
          </form>

        </div>
      </Modal>
      <div className="app__header">
        <div className="app__headerImage">
          <img src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png" alt="" />
        </div>
        {
          user ? (

            <Button onClick={() => auth.signOut()}>Logout</Button>
          ) :
            (
              <div className="login__container">
                <Button onClick={() => setOpen(true)}>Sign Up</Button>
                <Button onClick={() => setOpenLogin(true)}>Sign In</Button>

              </div>)
        }


      </div>
      <p>Instgram clone</p>

      <div className="app__post">
        {
          posts.map(({ id, post }) =>
            <Post key={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl} />
          )
        }
      </div>
      { user.displayName ? (<ImageUpload username={user.displayName} />) :
        <h3>Sorry login please</h3>}

    </div>
  );
}

export default App;
