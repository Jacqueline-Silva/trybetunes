import React from 'react';
import { Route, Switch } from 'react-router-dom';
import Album from './pages/Album';
import Favorites from './pages/Favorites';
import Login from './pages/Login';
import Search from './pages/Search';
import Profile from './pages/Profile';
import ProfileEdit from './pages/ProfileEdit';
import NotFound from './pages/NotFound';
import Loading from './pages/Loading';
import { createUser } from './services/userAPI';
import Header from './components/Header';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      nameInput: '',
      loading: false,
      redirect: false,
    };

    this.handleClick = this.handleClick.bind(this);
    this.inputChange = this.inputChange.bind(this);
  }

  async handleClick() {
    const { nameInput } = this.state;
    this.setState({
      loading: true,
    });

    await createUser({ name: nameInput });

    this.setState({
      loading: false,
      redirect: true,
    });
  }

  inputChange({ target }) {
    this.setState({
      [target.name]: target.value,
    });
  }

  render() {
    const { nameInput, loading, redirect } = this.state;

    return (
      <>
        <Header loading={ loading } />
        {
          loading && <Loading />
        }
        <Switch>
          <Route exact path="/">
            <Login
              inputChange={ this.inputChange }
              nameInput={ nameInput }
              handleClick={ this.handleClick }
              redirect={ redirect }
            />
          </Route>

          <Route path="/search" component={ Search } />
          <Route path="/album/:id" component={ Album } />
          <Route path="/favorites" component={ Favorites } />
          <Route path="/profile" component={ Profile } exact />
          <Route path="/profile/edit" component={ ProfileEdit } exact />
          <Route path="*" component={ NotFound } />
        </Switch>
      </>
    );
  }
}

export default App;
